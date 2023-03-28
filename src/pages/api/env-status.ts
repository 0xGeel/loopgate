import type { NextApiRequest, NextApiResponse } from "next";

// Checks the .env file to spot undefined values. Helps prevent issues.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const envsToCheck = [
    "NEXT_PUBLIC_PINATA_GATEWAY_URL",
    "PINATA_SUBMARINE_KEY",
    "LOOPRING_API_KEY",
    "SESSION_SECRET",
  ];

  let undefinedEnvs: string[] = [];

  envsToCheck.forEach((item) => {
    if (process.env[item] === undefined) {
      undefinedEnvs.push(item);
    }
  });

  return undefinedEnvs.length === 0
    ? res.status(200).json({
        message: "All required secrets in the .env file are defined. Noice! 🚀",
        note: "Are you still encountering issues? Check whether there are any typing errors present in your .env file in either your local environments as well as your host (i.e. Netlify).",
      })
    : res.status(500).json({
        error:
          "It seems your .env file is not configured correctly. Please check the following values in the `.env` file in both your local environment as well as your host (i.e. Netlify).",
        envsToCheck: undefinedEnvs,
      });
};

export default handler;
