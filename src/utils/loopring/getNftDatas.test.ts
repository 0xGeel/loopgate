import getNftDatas from "./getNftDatas";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("querying TheGraph's API to get the find the NftDatas based on NFT ID", () => {
  it.todo(
    "returns a Loopring NFT Datas when given a valid NFT ID"
    // async () => {
    //   console.log("Mocking some shit");
    //   mockedAxios.post.mockResolvedValue({
    //     nftDatas:
    //       "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738-0-0xc76eca2937b006606ebe717621409e4c2df906f1-0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0-5",
    //   });

    //   console.log("Fake getting NFT Datas");
    //   const data = await getNftDatas(
    //     "0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0"
    //   );

    //   console.log(data);

    //   expect(data).toEqual(
    //     "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738-0-0xc76eca2937b006606ebe717621409e4c2df906f1-0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0-5"
    //   );
    // }
  );

  it("returns false when an invalid 0x address is presented", async () => {
    mockedAxios.get.mockRejectedValue(false);
    const data = await getNftDatas("bruh");
    expect(data).toEqual(false);
  });
});

const mockSuccessResponse = `{
    "data": {
      "nonFungibleTokens": [
        {
          "id": "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738-0-0xc76eca2937b006606ebe717621409e4c2df906f1-0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0-5",
        }
      ]
    }
  }`;

const mockFailureResponse = `{
    "data": {
      "nonFungibleTokens": []
    }
  }`;
