import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const uuid = uuidv4();
  res.status(200).json({ uuid });
}
