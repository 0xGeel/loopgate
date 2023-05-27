import formatAccessLink from "./formatAccessLink";
const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL;

const mockFolderAccessLink = `${PINATA_GATEWAY_URL}bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m/index.html?accessToken=foo.bar.-baz`;
const mockDirectAccessLink = `${PINATA_GATEWAY_URL}/ipfs/bafybeihx5eacyxeydcpvudwxa242rnjhn67femy46gzas5d2djb24ti5mi?accessToken=foo.bar.baz-qux`;
const mockFolderItem = {
  id: "string",
  createdAt: "2022-04-20T16:20:00.000Z",
  cid: "bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m",
  name: "string",
  originalName: "string",
  size: "string",
  metadata: {},
  type: "string",
  pinToIpfs: true,
  uri: `/ipfs/bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m/index.html`,
};

describe("format an access link for a submarined Pinata file", () => {
  it("should return a https link to an index.html file if it is present in the folder", () => {
    expect(formatAccessLink(mockFolderAccessLink, mockFolderItem)).toEqual(
      `https://${PINATA_GATEWAY_URL}${mockFolderItem.uri}?accessToken=foo.bar.-baz`
    );
  });

  it("should return a https direct access link to the submarined file", () => {
    expect(formatAccessLink(mockDirectAccessLink, false)).toEqual(
      `https://${mockDirectAccessLink}`
    );
  });
});
