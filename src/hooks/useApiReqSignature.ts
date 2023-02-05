// Algorithm
// Initialize signatureBase to an empty string.
// Append the API's HTTP method to signatureBase.
// Append '＆' to signatureBase.
// Append percent-encoded full URL path (without ? or any query parameters) to signatureBase.
// Append '&' to signatureBase.
// Initialize parameterString to an empty string.
// For GET / DELETE requests:
// Sort query parameters in ascending order lexicographically;
// Append percent-encoded key name to parameterString;
// Append an '=' to parameterString;
// Append percent-encoded value to parameterString;
// Append a '&' if there are more key value pairs.
// For POST / PUT requests:
// Append request body as a string to parameterString.
// Append percent-encoded parameterString to signatureBase
// Calculate the SHA-256 hash of signatureBase as hash.
// Signhash with the private EdDSA key and get Rx, Ry, and S.
// Concatenate Rx,Ry, andS using ',' as: ${Rx},${Ry},${S}.

// Example: https://docs.loopring.io/en/dex_apis/getApiKey.html
// https://api3.loopring.io/api/v3/apiKey

const sampleUrl = `https://api3.loopring.io/api/v3/account?owner=0x1337CC354AeAf15B0E98A609cd348DF171174e14&otherParam=foo&lastParam=bar`;
const test = `https://api3.loopring.io/api/v3/account?owner=0x1337CC354AeAf15B0E98A609cd348DF171174e14`;

const sha256Hash = async (input: string) => {
  const utf8 = new TextEncoder().encode(input);

  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  });
};

const computeSignatureBase = (
  apiUrl: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  requestBody?: any
): string => {
  // Get a new URL object for the full api request
  const url = new URL(apiUrl);
  const encodedBaseUrl = encodeURIComponent(`${url.origin}${url.pathname}`);

  if (method === "GET" || method === "DELETE") {
    // Get the search parameters, sort them lexicographically
    const params = new URLSearchParams(url.search);
    params.sort();
    const encodedParams = encodeURIComponent(params.toString());

    return `${method}&${encodedBaseUrl}&${encodedParams}`;
  } else if (method === "POST" || "PUT") {
    const reqBody = JSON.stringify(requestBody);

    return `${method}&${encodedBaseUrl}&${reqBody}`;
  }

  return "";
};

export const huts = async () => {
  const foo = await sha256Hash(computeSignatureBase(test, "GET"));
  return foo;
};

// Calculate the SHA-256 hash of the signatureBase as hash
// Sign hash with the private EdDSA key and get Rx, Ry, and S
// Concatenate Rx, Ry, and S using ',' as : `${Rx},${Ry},${S}`.

// Fudgey's comment:
// Read this on request signing https://docs.loopring.io/en/basics/signing.html there are some mistakes in the doco tho it says you need to calculate the sha256 hash
// which is correct but then after you calculate the hash you need to calculate the modulous against this number: 21888242871839275222246405745257275088548364400416034343698204186575808495617
// the final eddsa output is also actually ${Rx}+${Ry}+${S}  no commas just concatenate them values
