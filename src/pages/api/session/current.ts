import { withSessionRoute } from "@/src/utils/iron-session/withSession";
import { NextApiRequest, NextApiResponse } from "next";

// Check if there is a session active and return it
const currentSessionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.session.address) {
    return res.json({ ...req.session.address, isSessionActive: true });
  }
  return res.json({ isSessionActive: false });
};

export default withSessionRoute(currentSessionRoute);
