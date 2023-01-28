import generateAccessLink from "./generateAccessLink";
import listFolderContent from "./listFolderContent";
import checkPinataFolderForHtml from "./checkPinataFolderForHtml";
import { PINATA_GATEWAY_URL } from "../../config/config";

const getPinataIndexLink = async (cid: string) => {
  const { items, accessLink } = await generateAccessLink(cid);

  if (!accessLink) {
    return false;
  } else {
    const folderContent = await listFolderContent(items[0].id);
    const htmlIndex = checkPinataFolderForHtml(folderContent);

    if (htmlIndex) {
      // Retrieve access token from the link to use with HTML Index instead
      const accessToken = accessLink.split("?accessToken=")[1];
      const htmlIndexAccessLink = `${PINATA_GATEWAY_URL}${htmlIndex.uri}${accessToken}`;
      // Return an access link to the HTML index of the unlocked content
      return { item: items[0], accessLink: htmlIndexAccessLink };
    } else {
      // Otherwise: share a direct access link to the content. (Image, Audio, Video, etc)
      return { item: items[0], accessLink: accessLink };
    }
  }
};

export default getPinataIndexLink;
