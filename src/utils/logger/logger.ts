import pino from "pino";
import { createPinoBrowserSend, createWriteStream } from "pino-logflare";

const pinoCredentials = {
  apiKey: process.env.LOGFLARE_API_KEY,
  sourceToken: process.env.LOGFLARE_SOURCE_TOKEN,
};

// Create pino-logflare (browser) stream
const stream = createWriteStream(pinoCredentials);
const send = createPinoBrowserSend(pinoCredentials);

const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
  },
  stream
);

export default logger;
