interface PinataFolderRes {
  childContent: PinataFolderItem[];
  hasIndexHtml: boolean;
}

interface PinataFolderItem {
  id: string;
  createdAt: string;
  cid: `baf${string}`;
  name: string;
  originalName: string;
  size: string;
  metadata: any;
  type: string;
  pinToIpfs: boolean;
  uri: `/ipfs/baf${string}`;
}

const checkPinataFolderForHtml = (pinataFolder: PinataFolderRes) => {
  if (pinataFolder.hasIndexHtml) {
    // Content has a file named 'index.html'. It's fairly safe to assume that we want to use this file.
    console.log("Todo.");
  } else {
    // Iterate through all potential candidates, and add them to the array.
    const htmlCandidates = pinataFolder.childContent.filter(
      (item: PinataFolderItem) => item.uri.endsWith(".html")
    );

    if (htmlCandidates) {
      return htmlCandidates[0];
    } else {
      return false;
    }
  }
};

export default checkPinataFolderForHtml;
