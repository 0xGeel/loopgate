import { withSessionRoute } from "@/src/utils/iron-session/withSession";
import { NextApiRequest, NextApiResponse } from "next";

// Session management: Destroys the active iron session
const destroySessionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  req.session.destroy();
  res.send("DEBUG: Session is no longer active.");
};

export default withSessionRoute(destroySessionRoute);
