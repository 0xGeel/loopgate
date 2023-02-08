import getUserNfts from "./getUserNfts";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetching data on users' NFTs with the Loopring API", () => {
  it("returns NFT IDs for a user that has NFTs", async () => {
    mockedAxios.get.mockResolvedValue({
      data: ["0x1", "0x2", "0x3"],
    });

    const data = await getUserNfts("157137");
    expect(data).toEqual(["0x1", "0x2", "0x3"]);
  });
});
