import { withSessionRoute } from "@/src/utils/iron-session/withSession";
import { NextApiRequest, NextApiResponse } from "next";

// Create a new session for a connected 0x address
const createSessionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    req.session.destroy();
    return res.status(405).send({ message: "What are ye doin' in my swamp?!" });
  }

  req.session.address = {
    id: req.body.address,
  };
  await req.session.save();
  return res.send(`Session created for ${req.body.address}.`);
};

export default withSessionRoute(createSessionRoute);
