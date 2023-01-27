import type { NextApiRequest, NextApiResponse } from "next";

import { sub } from "../../utils/pinata";

const generateAccessLink = async (cid: string) => {
  const foundContent = await sub.getSubmarinedContentByCid(cid);
  const folder = foundContent.items[0];
  if (folder) {
    const unlockTimeInSec = 3600; // one hour
    const accessLink = await sub.generateAccessLink(
      unlockTimeInSec,
      folder.id,
      cid
    );

    return { items: foundContent.items, accessLink };
  }
  return { foundContent, link: null };
};

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
