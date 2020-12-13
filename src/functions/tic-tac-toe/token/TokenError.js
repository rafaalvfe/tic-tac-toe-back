const MALFORMED_MESSAGE = "Malformed game token";
const INVALID_DATA = "Invalid token data";

export class TokenErrorMalformed extends Error {
  constructor(args) {
    super(args);
    this.message = MALFORMED_MESSAGE;
  }
}

export class TokenErrorInvalidData extends Error {
  constructor(args) {
    super(args);
    this.message = INVALID_DATA;
  }
}
