import getMinterAndToken from "./getMinterAndToken";

import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("querying Loopring TheGraph to get minter and token address information", () => {
  it.todo("returns a minter and token address for a valid NFT ID");
  // it("returns a minter and token address for a valid NFT ID", async () => {
  //   mockedAxios.get.mockResolvedValue({
  //     minter: "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738",
  //     tokenAddress: "0xc76eca2937b006606ebe717621409e4c2df906f1",
  //   });
  //   const data = await getMinterAndToken(
  //     "0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0"
  //   );
  //   expect(data).toEqual({
  //     minter: "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738",
  //     tokenAddress: "0xc76eca2937b006606ebe717621409e4c2df906f1",
  //   });
  // });

  it("returns false for an invalid NFT ID", async () => {
    mockedAxios.get.mockRejectedValue(false);
    const data = await getMinterAndToken("0xbruh");
    expect(data).toEqual(false);
  });
});
