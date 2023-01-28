import type { NextApiRequest, NextApiResponse } from "next";
import { generateAccessLink } from "../../utils/pinata/generateAccessLink";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { cid } = query;

  // @ts-ignore
  const { items, accessLink } = await generateAccessLink(cid);
  if (accessLink) {
    res.status(200).json({ items: items, accessLink: accessLink });
  } else {
    res.status(400).json({
      error:
        "Unable to retrieve submarined content and access link. An invalid CID may be requested.",
    });
  }
};

export default handler;
