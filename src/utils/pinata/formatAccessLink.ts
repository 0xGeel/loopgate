import { PINATA_GATEWAY_URL } from "../../config/config";

// Formats a Pinata access link by checking whether there is an index file in the submarined content, and adding https
const formatAccessLink = (accessLink: string, htmlIndex: any) => {
  if (htmlIndex) {
    // Retrieve the access token from the link to use with the HTML index file instead.
    const accessToken = accessLink.split("?accessToken=")[1];
    const htmlIndexAccessLink = `https://${PINATA_GATEWAY_URL}${htmlIndex.uri}?accessToken=${accessToken}`;

    // Return an access link to the index.html file instead of the folder CID
    return htmlIndexAccessLink;
  } else {
    // Otherwise: share a direct https access link to the content. (Image, Audio, Video, etc).
    return `https://${accessLink}`;
  }
};

export default formatAccessLink;
