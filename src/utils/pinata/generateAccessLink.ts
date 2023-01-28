import sub from "./sub";

// Checks a submarined CID. If valid, generates an access link that by default is accessible for one hour
export const generateAccessLink = async (
  cid: string,
  unlockTimeInSec: number = 3600
) => {
  const foundContent = await sub.getSubmarinedContentByCid(cid);
  const folder = foundContent.items[0];

  if (folder) {
    const accessLink = await sub.generateAccessLink(
      unlockTimeInSec,
      folder.id,
      cid
    );
    return { items: foundContent.items, accessLink };
  }

  return { foundContent, link: null };
};
