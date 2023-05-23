import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/src/utils/iron-session/withSession";
import {
  checkAuthentication,
  handleError,
  LoopgateError,
} from "@/src/middleware";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/src/utils/supabase/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return handleError(res, LoopgateError.noPostRequest);
  }

  const auth = await checkAuthentication(req, res);
  if (!auth) {
    return handleError(res, LoopgateError.unauthorized);
  }

  if (!req.body.uuid || !req.body.cid) {
    return handleError(res, LoopgateError.badRequest);
  }

  // Create server Supabase client
  const Supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { error } = await Supabase.from("unlockables").insert({
    id: req.body.uuid,
    owner: auth.address,
    content_type_id: 1, // IPFS Unlockable
    content_url: req.body.cid,
    criteria_unlock_amount: 1,
  });

  console.log(error);

  if (error) {
    return handleError(res, [500, error.message]);
  }

  return res.status(200).json({
    message: `Successfully created Unlockable with UUID of ${req.body.uuid}.`,
  });
};

export default withSessionRoute(handler);
