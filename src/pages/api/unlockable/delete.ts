import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  checkAuthentication,
  handleError,
  LoopgateError,
} from "@/src/middleware";
import { withSessionRoute } from "@/src/middleware/ironSession/withSession";
import { Submarine } from "@/src/services/pinata";
import { Database } from "@/src/services/supabase/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return handleError(res, LoopgateError.noPostRequest);
  }

  const auth = await checkAuthentication(req, res);
  if (!auth) {
    return handleError(res, LoopgateError.unauthorized);
  }

  if (!req.body.uuid || !req.body.cid || Array.isArray(req.body.cid)) {
    return handleError(res, LoopgateError.badRequest);
  }

  // Create server Supabase client
  const Supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { error: deleteUnlockableError } = await Supabase.from("unlockables")
    .delete()
    .eq("id", req.body.uuid);

  if (deleteUnlockableError) {
    return handleError(res, [500, deleteUnlockableError.message]);
  }

  const { error: deleteCriteriaError } = await Supabase.from("unlock_criteria")
    .delete()
    .eq("unlockable_id", req.body.uuid);

  if (deleteCriteriaError) {
    return handleError(res, [500, deleteCriteriaError.message]);
  }

  const { items: submarinedItems } = await Submarine.getSubmarinedContentByCid(
    req.body.cid
  );

  if (!submarinedItems || submarinedItems.length == 0) {
    return handleError(res, [
      500,
      `Unable to retrieve the file with CID '${req.query.cid}'.`,
    ]);
  }

  const submarineDeleteRes = await Submarine.deleteContent(
    submarinedItems[0].id
  );

  if (!submarineDeleteRes) {
    return handleError(res, [
      500,
      `Unable to delete the file with CID '${req.query.cid}'`,
    ]);
  }

  return res.status(200).json({
    message: `Successfully deleted the Unlockable with UUID of ${req.body.uuid} and CID of ${req.body.cid}.`,
  });
};

export default withSessionRoute(handler);
