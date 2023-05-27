import { NextApiRequest, NextApiResponse } from "next";

import { withSessionRoute } from "@/src/middleware/ironSession/withSession";
import { siwe } from "@/src/middleware/siwe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const siweSesh = await siwe.getSession(req, res);

  switch (method) {
    case "GET":
      if (siweSesh.address) {
        req.session.active = true;
        res.json({ siwe: siweSesh, isActive: true });
      } else {
        req.session.destroy();
        res.json({
          isActive: false,
          message: `Please sign in with Ethereum to access this Dapp.`,
        });
      }

      break;
    default:
      req.session.destroy();
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSessionRoute(handler);
