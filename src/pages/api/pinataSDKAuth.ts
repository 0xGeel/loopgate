import type { NextApiRequest, NextApiResponse } from "next";

import pinataSDK from "@pinata/sdk";
// See: https://www.npmjs.com/package/@pinata/sdk

// Use the api keys by specifying your api key and api secret

const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_API_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;

  pinata
    .testAuthentication()
    .then((response) => {
      res.status(200).json(response);
      //handle successful authentication here
    })
    .catch((err) => {
      //handle error here
      res.status(400).json(err);
    });
};

export default handler;
