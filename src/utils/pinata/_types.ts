export interface PinataFolderRes {
  childContent: PinataFolderItem[];
  hasIndexHtml: boolean;
}

export interface PinataFolderItem {
  id: string;
  createdAt: string;
  cid: string; // starting with `baf...`
  name: string;
  originalName: string;
  size: string;
  metadata: any;
  type: string;
  pinToIpfs: boolean;
  uri: string; // starting with `/ipfs/baf...`
}
