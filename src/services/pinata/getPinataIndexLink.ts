import {
  generateAccessLink,
  formatAccessLink,
  checkPinataFolderForHtml,
  listFolderContent,
} from "./index";

const getPinataIndexLink = async (cid: string) => {
  const { items, accessLink } = await generateAccessLink(cid);

  if (!accessLink) {
    return false;
  } else {
    // Call Piñata API to find folder contents
    const folderContent = await listFolderContent(items[0].id);
    // Check if the folder contains a '.index.html' file
    const htmlIndex = checkPinataFolderForHtml(folderContent);
    // Format access link based on contents
    const formattedAccessLink = formatAccessLink(accessLink, htmlIndex);

    return {
      item: items[0],
      accessLink: formattedAccessLink,
    };
  }
};

export default getPinataIndexLink;
