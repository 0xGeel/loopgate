export type Error = [code: HttpErrorCode, message: string];

type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 500;

export const LoopgateError: { [key: string]: Error } = {
  noPostRequest: [405, "Method not allowed, please use a POST request."],
  unauthorized: [
    401,
    "You are not authorized to access this resource. Sign In With Ethereum, and try again.",
  ],
  unableToUpload: [500, "Unable to upload the file(s)."],
  badRequest: [
    400,
    "Bad request. Check the parameters or body before trying again.",
  ],
  server: [500, "Internal server error"],
};
