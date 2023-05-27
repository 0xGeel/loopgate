import { getUserAddress } from "./getUserAddress";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("querying the Loopring API to get the user's address", () => {
  it("returns a Loopring Account ID for a valid 0x address", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        accountId: 157137,
        owner: "0x1337CC354AeAf15B0E98A609cd348DF171174e14",
        frozen: false,
        publicKey: {
          x: "0x258acb23d4a10dad63fdc7782e38e8767802b0e93317fc35e272329c79b6f10b",
          y: "0x21d07e0629c2024d2dfc5b25478974c28fe56ad087aa3eca07694b88d42803ba",
        },
        tags: "",
        nonce: 1,
        keyNonce: 1,
        keySeed: "",
      },
    });

    const data = await getUserAddress(
      "0x1337CC354AeAf15B0E98A609cd348DF171174e14"
    );

    expect(data).toEqual(157137);
  });

  it("returns false when an invalid 0x address is presented", async () => {
    mockedAxios.get.mockRejectedValue(false);
    const data = await getUserAddress("bruh");
    expect(data).toEqual(false);
  });
});
