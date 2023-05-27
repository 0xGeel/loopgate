export interface PinataFolderRes {
  childContent: PinataFolderItem[];
  hasIndexHtml: boolean;
}

export interface PinataFolderItem {
  id: string;
  createdAt: string;
  cid: string;
  name: string;
  originalName: string;
  size: string;
  // TODO: Add Pinata Metadata instead of 'any'.
  // eslint-disable-next-line
  metadata: any;
  type: string;
  pinToIpfs: boolean;
  uri: string;
}
