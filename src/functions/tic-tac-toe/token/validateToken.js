import jwt from "jsonwebtoken";
import { TokenErrorInvalidData, TokenErrorMalformed } from "./TokenError";

export default (tokenData) => {
  const gameSecret = process.env.JWT_TTT_KEY;
  let token;
  let decodedToken;

  if (tokenData.length !== 2 || tokenData[0] !== "Bearer") {
    throw new TokenErrorMalformed();
  }

  token = tokenData[1];

  try {
    decodedToken = jwt.verify(token, gameSecret);
    return decodedToken
  } catch (e){
    throw new TokenErrorInvalidData();
  }

}