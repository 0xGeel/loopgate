import { SIWEProvider } from "connectkit";
import type { IncomingMessage, ServerResponse } from "http";
import { getIronSession, IronSessionOptions } from "iron-session";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { generateNonce, SiweErrorType, SiweMessage } from "siwe";

// Manual patch: See line 113
import { getDefaultProvider } from "ethers";

import {
  NextSIWESession,
  RouteHandlerOptions,
  NextServerSIWEConfig,
  NextClientSIWEConfig,
  ConfigureClientSIWEResult,
  NextSIWEProviderProps,
  ConfigureServerSIWEResult,
} from "./types";

const getSession = async <TSessionData extends Object = {}>(
  req: IncomingMessage,
  res: any, // ServerResponse<IncomingMessage>,
  sessionConfig: IronSessionOptions
) => {
  const session = (await getIronSession(
    req,
    res,
    sessionConfig
  )) as NextSIWESession<TSessionData>;
  return session;
};

const logoutRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<void>,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterLogout"]
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(req, res, sessionConfig);
      session.destroy();
      if (afterCallback) {
        await afterCallback(req, res);
      }
      res.status(200).end();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const nonceRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<string>,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterNonce"]
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(req, res, sessionConfig);
      if (!session.nonce) {
        session.nonce = generateNonce();
        await session.save();
      }
      if (afterCallback) {
        await afterCallback(req, res, session);
      }
      res.send(session.nonce);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const sessionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<{ address?: string; chainId?: number }>,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterSession"]
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(req, res, sessionConfig);
      if (afterCallback) {
        await afterCallback(req, res, session);
      }
      const { address, chainId } = session;
      res.send({ address, chainId });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const verifyRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<void>,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterVerify"]
) => {
  switch (req.method) {
    case "POST":
      try {
        const session = await getSession(req, res, sessionConfig);
        const { message, signature } = req.body;

        const siweMessage = new SiweMessage(message);

        // Manual patch: the SIWE package requires a provider to be able to resolve Smart Contract Wallets (Like Loopring Wallet)
        // See: https://github.com/spruceid/siwe/blob/97531efca33c1770b29d6ca1c2d0057faf734fcc/packages/siwe/lib/client.ts#LL306C1-L307C1
        const ethProvider = getDefaultProvider();

        const { data: fields } = await siweMessage.verify(
          {
            signature: signature,
            nonce: session.nonce,
          },
          { provider: ethProvider }
        );

        if (fields.nonce !== session.nonce) {
          return res.status(422).end("Invalid nonce.");
        }
        session.address = fields.address;
        session.chainId = fields.chainId;
        await session.save();
        if (afterCallback) {
          await afterCallback(req, res, session);
        }
        res.status(200).end();
      } catch (error) {
        switch (error) {
          case SiweErrorType.INVALID_NONCE: {
            res.status(422).end(String(error));
            break;
          }
          case SiweErrorType.INVALID_SIGNATURE: {
            res.status(422).end(String(error));
            break;
          }
          default: {
            res.status(400).end(String(error));
            break;
          }
        }
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const envVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

export const configureServerSideSIWE = <TSessionData extends Object = {}>({
  session: { cookieName, password, cookieOptions, ...otherSessionOptions } = {},
  options: { afterNonce, afterVerify, afterSession, afterLogout } = {},
}: NextServerSIWEConfig): ConfigureServerSIWEResult<TSessionData> => {
  const sessionConfig: IronSessionOptions = {
    cookieName: cookieName ?? "connectkit-next-siwe",
    password: password ?? envVar("SESSION_SECRET"),
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      ...(cookieOptions ?? {}),
    },
    ...otherSessionOptions,
  };

  const apiRouteHandler: NextApiHandler = async (req, res) => {
    if (!(req.query.route instanceof Array)) {
      throw new Error(
        "Catch-all query param `route` not found. SIWE API page should be named `[...route].ts` and within your `pages/api` directory."
      );
    }

    const route = req.query.route.join("/");
    switch (route) {
      case "nonce":
        return await nonceRoute(req, res, sessionConfig, afterNonce);
      case "verify":
        return await verifyRoute(req, res, sessionConfig, afterVerify);
      case "session":
        return await sessionRoute(req, res, sessionConfig, afterSession);
      case "logout":
        return await logoutRoute(req, res, sessionConfig, afterLogout);
      default:
        return res.status(404).end();
    }
  };

  return {
    apiRouteHandler,
    getSession: async (req: IncomingMessage, res: ServerResponse) =>
      await getSession<TSessionData>(req, res, sessionConfig),
  };
};

export const configureClientSIWE = <TSessionData extends Object = {}>({
  apiRoutePrefix,
  statement = "Sign In With Ethereum.",
}: NextClientSIWEConfig): ConfigureClientSIWEResult<TSessionData> => {
  const NextSIWEProvider = (props: NextSIWEProviderProps) => {
    return (
      <SIWEProvider
        getNonce={async () => {
          const res = await fetch(`${apiRoutePrefix}/nonce`);
          if (!res.ok) {
            throw new Error("Failed to fetch SIWE nonce");
          }
          const nonce = await res.text();
          return nonce;
        }}
        createMessage={({ nonce, address, chainId }) =>
          new SiweMessage({
            version: "1",
            domain: window.location.host,
            uri: window.location.origin,
            address,
            chainId,
            nonce,
            statement,
          }).prepareMessage()
        }
        verifyMessage={({ message, signature }) =>
          fetch(`${apiRoutePrefix}/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, signature }),
          }).then((res) => res.ok)
        }
        getSession={async () => {
          const res = await fetch(`${apiRoutePrefix}/session`);
          if (!res.ok) {
            throw new Error("Failed to fetch SIWE session");
          }
          const { address, chainId } = await res.json();
          return address && chainId ? { address, chainId } : null;
        }}
        signOut={() => fetch(`${apiRoutePrefix}/logout`).then((res) => res.ok)}
        {...props}
      />
    );
  };

  return {
    Provider: NextSIWEProvider,
  };
};
