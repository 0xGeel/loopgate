import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { IncomingMessage, ServerResponse } from "http";
import { IronSession, IronSessionOptions } from "iron-session";
import { SIWEProvider } from "connectkit";
import { FunctionComponent, ComponentProps } from "react";

export type RouteHandlerOptions = {
  afterNonce?: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: NextSIWESession<{}>
  ) => Promise<void>;
  afterVerify?: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: NextSIWESession<{}>
  ) => Promise<void>;
  afterSession?: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: NextSIWESession<{}>
  ) => Promise<void>;
  afterLogout?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};
export type NextServerSIWEConfig = {
  session?: Partial<IronSessionOptions>;
  options?: RouteHandlerOptions;
};
export type NextClientSIWEConfig = {
  apiRoutePrefix: string;
  statement?: string;
};

export type NextSIWESession<TSessionData extends Object = {}> = IronSession &
  TSessionData & {
    nonce?: string;
    address?: string;
    chainId?: number;
  };

export type NextSIWEProviderProps = Omit<
  ComponentProps<typeof SIWEProvider>,
  | "getNonce"
  | "createMessage"
  | "verifyMessage"
  | "getSession"
  | "signOut"
  | "data"
  | "signIn"
  | "status"
  | "resetStatus"
>;

export type ConfigureServerSIWEResult<TSessionData extends Object = {}> = {
  apiRouteHandler: NextApiHandler;
  getSession: (
    req: IncomingMessage,
    res: ServerResponse
  ) => Promise<NextSIWESession<TSessionData>>;
};

export type ConfigureClientSIWEResult<TSessionData extends Object = {}> = {
  Provider: FunctionComponent<NextSIWEProviderProps>;
};
