import Submarine from "./submarine";

// Checks a submarined CID. If valid, generates an access link that is accessible for a set amount of time
const generateAccessLink = async (
  cid: string,
  unlockTimeInSec: number = 60 * 3
) => {
  const foundContent = await Submarine.getSubmarinedContentByCid(cid);
  const folder = foundContent.items[0];

  if (folder) {
    const accessLink = await Submarine.generateAccessLink(
      unlockTimeInSec,
      folder.id,
      cid
    );
    return { items: foundContent.items, accessLink };
  }

  return { foundContent, link: null };
};

export default generateAccessLink;
