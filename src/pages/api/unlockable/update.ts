import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  checkAuthentication,
  handleError,
  LoopgateError,
} from "@/src/middleware";
import { withSessionRoute } from "@/src/middleware/ironSession/withSession";
import { Database } from "@/src/services/supabase/types";

type UUID = string;

interface UnlockCriterion {
  unlockable_id: UUID;
  nft_id: string;
}

export interface UnlockableUpdateProps {
  body: {
    unlockable: {
      uuid: UUID;
      criteria_unlock_amount?: number;
      description?: string;
      name?: string;
    };
    unlock_criteria: UnlockCriterion[];
  };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return handleError(res, LoopgateError.noPostRequest);
  }

  const auth = await checkAuthentication(req, res);
  if (!auth) {
    return handleError(res, LoopgateError.unauthorized);
  }

  if (!req.body.unlockable.uuid || req.body.unlockable.unlock_criteria) {
    return handleError(res, LoopgateError.badRequest);
  }

  // Create server Supabase client
  const Supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const { error: updateUnlockableError } = await Supabase.from("unlockables")
    .update({
      // Changing the ContentType and URL are not implemented, for now.
      // content_type_id: req.body?.content_type_id,
      // content_url: req.body?.cid,
      criteria_unlock_amount: req.body.unlockable?.criteria_unlock_amount,
      description: req.body.unlockable?.description,
      name: req.body.unlockable?.name,
      unlisted: req.body.unlockable?.unlisted,
    })
    .eq("id", req.body.unlockable.uuid);

  if (updateUnlockableError) {
    return handleError(res, [500, updateUnlockableError.message]);
  }

  const { error: deleteCriteriaError } = await Supabase.from("unlock_criteria")
    .delete()
    .eq("unlockable_id", req.body.uuid);

  if (deleteCriteriaError) {
    return handleError(res, [500, deleteCriteriaError.message]);
  }

  const { error: insertCriteriaError } = await Supabase.from(
    "unlock_criteria"
  ).insert(
    req.body.unlockCriteria.map((x: UnlockCriterion) => ({
      ...x,
      owner: auth.address,
    }))
  );

  if (insertCriteriaError) {
    return handleError(res, [500, insertCriteriaError.message]);
  }

  return res.status(200).json({
    message: `Successfully updated Unlockable and Unlock Criteria with UUID of ${req.body.uuid}.`,
  });
};

export default withSessionRoute(handler);
