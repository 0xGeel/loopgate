import pino from "pino";
import { createPinoBrowserSend, createWriteStream } from "pino-logflare";

const pinoCredentials = {
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_API_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE_TOKEN,
};

const checkCredentials = (credentials: string[]): boolean =>
  credentials.every((x) => typeof x !== "undefined");

const credentialsDefined = checkCredentials([
  pinoCredentials.apiKey,
  pinoCredentials.sourceToken,
]);

// Include a mock logger in case no LogFlare credentials are present
const mockLogger = {
  error: () => {
    console.log("");
  },
};

const logger = credentialsDefined
  ? pino(
      {
        browser: {
          transmit: {
            send: createPinoBrowserSend(pinoCredentials),
          },
        },
      },
      createWriteStream(pinoCredentials)
    )
  : mockLogger;

export default logger;
