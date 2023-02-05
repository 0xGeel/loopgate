import { FunctionComponent, ComponentProps } from "react";
import { SIWEProvider } from "connectkit";
import type { IncomingMessage, ServerResponse } from "http";
import { getIronSession, IronSession, IronSessionOptions } from "iron-session";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { generateNonce, SiweMessage } from "siwe";

type NextSIWEConfig = {
  apiRoutePrefix: string;
  statement?: string;
  session?: Partial<IronSessionOptions>;
};

type NextSIWESession<TSessionData extends Object = {}> = IronSession &
  TSessionData & {
    nonce?: string;
    address?: string;
    chainId?: number;
  };

type NextSIWEProviderProps = Omit<
  ComponentProps<typeof SIWEProvider>,
  "getNonce" | "createMessage" | "verifyMessage" | "getSession" | "signOut"
>;

type ConfigureSIWEResult<TSessionData extends Object = {}> = {
  apiRouteHandler: NextApiHandler;
  Provider: FunctionComponent<NextSIWEProviderProps>;
  getSession: (
    req: IncomingMessage,
    res: ServerResponse
  ) => Promise<NextSIWESession<TSessionData>>;
};

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
  sessionConfig: IronSessionOptions
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(req, res, sessionConfig);
      session.destroy();
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
  sessionConfig: IronSessionOptions
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(req, res, sessionConfig);
      if (!session.nonce) {
        session.nonce = generateNonce();
        await session.save();
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
  sessionConfig: IronSessionOptions
) => {
  switch (req.method) {
    case "GET":
      const { address, chainId } = await getSession(req, res, sessionConfig);
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
  sessionConfig: IronSessionOptions
) => {
  switch (req.method) {
    case "POST":
      try {
        const session = await getSession(req, res, sessionConfig);
        const { message, signature } = req.body;
        console.log("Signature: " + signature);
        const siweMessage = new SiweMessage(message);
        console.log("siweMessage: ");
        console.log(siweMessage.validate);

        // Note to self: siweMessage.validate() is deprecated.
        // The docs mention to use verify() instead.
        // See: https://github.com/spruceid/siwe/blob/main/packages/siwe/lib/client.ts
        // const fields = await siweMessage.verify(signature);
        const fields = await siweMessage.validate(signature);
        console.log("👀 Fields:");
        console.log(fields);
        if (fields.nonce !== session.nonce) {
          return res.status(422).end("Invalid nonce.");
        }
        session.address = fields.address;
        session.chainId = fields.chainId;
        console.log("Session successful. Saving...");
        await session.save();
        res.status(200).end();
      } catch (error) {
        console.log("💥 Session not successful...");
        console.log(error);
        res.status(400).end(String(error));
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

export const configureSIWE = <TSessionData extends Object = {}>({
  apiRoutePrefix,
  statement = "Sign In With Ethereum.",
  session: { cookieName, password, cookieOptions, ...otherSessionOptions } = {},
}: NextSIWEConfig): ConfigureSIWEResult<TSessionData> => {
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
    console.log("ROUTE: Resolving " + route);
    switch (route) {
      case "nonce":
        return await nonceRoute(req, res, sessionConfig);
      case "verify":
        return await verifyRoute(req, res, sessionConfig);
      case "session":
        return await sessionRoute(req, res, sessionConfig);
      case "logout":
        return await logoutRoute(req, res, sessionConfig);
      default:
        return res.status(404).end();
    }
  };

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
    apiRouteHandler,
    Provider: NextSIWEProvider,
    getSession: async (req: IncomingMessage, res: ServerResponse) =>
      await getSession<TSessionData>(req, res, sessionConfig),
  };
};
