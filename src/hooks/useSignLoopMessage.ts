import { useSignMessage } from "wagmi";
import { CONTRACTS } from "../utils/loopring/_constants";

// WIP: custom hook that asks a user to sign a message, used to get an EDDSA sig to retrieve user API key
// https://api3.loopring.io/api/v3/apiKey?accountId=126534
// https://docs.loopring.io/en/dex_apis/getApiKey.html
// Further reading: https://docs.loopring.io/en/basics/signing.html

const useSignLoopMessage = (address: `0x${string}` | undefined) => {
  const keyNonce = 0; // Todo: get key nonce from Loopring API res

  const example_1 =
    "0xb19ef37032883e7cd15025c190959a768596cf9b036d8f658bc3a8a2ee75ac5071fb865e26491d25261a672c8d54c5fbc530fd6d53e24098e1846525e9e3467045x0";
  const example_2 =
    "0xae6a07b26723ff3b5239ef12ad790bfabc64cb760c5c3c08bccb1858906bfbe1dc2ec89ab2d1e518fae56b3b0d099fd8ef4293e58fb9cf6ee19acd78d84b2992ad2d1af78345670e17f10aedd583433ad15d7f1e5f60c51c2f075530dae0b881";

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: `Sign this message to access Loopring Exchange: ${CONTRACTS.LOOPRING_EXCHANGE_V3} with key nonce: ${keyNonce}`,
    onError(error) {
      console.log("Error: ", error);
    },
  });

  signMessage();

  console.log(data);
  console.log(isError);
  console.log(isSuccess);

  console.log(`test1: ${example_1}`);
  console.log(`test2: ${example_2}`);

  return { signatureData: data, signatureError: isError };
};

export default useSignLoopMessage;
