import * as ApiErr from "../../constants/apiErrors.js";
import { createNewMatch } from "../../functions/tic-tac-toe/match";
import { MatchErrorID, MatchErrorPayload } from "../../functions/tic-tac-toe/match/MatchError.js";
import validateMatchData from "../../functions/tic-tac-toe/match/validateMatchData.js";
import { validateToken } from "../../functions/tic-tac-toe/token";
import {
  TokenErrorInvalidData,
  TokenErrorMalformed,
} from "../../functions/tic-tac-toe/token/TokenError.js";

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let { body } = req;

  if (!authHeader) {
    const match = createNewMatch();
    return res.json(match);
  }

  const tokenData = authHeader.split(" ");
  try {
    const decodedToken = validateToken(tokenData);

    validateMatchData(body);

    if(decodedToken.matchId !== body.matchId){
      throw new MatchErrorID();
    }

    if(decodedToken.boardState.join("") !== body.boardState.join("")){
      throw new MatchErrorPayload();
    }

    if(decodedToken.cpuMark && decodedToken.cpuMark !== body.cpuMark){
      throw new MatchErrorPayload();
    }
    
    next();
  } catch (error) {
    let errResponse = { error: true, message: "" };
    let errCode = 500;

    if (error instanceof TokenErrorMalformed) {
      let { message, code } = ApiErr.INVALID_TOKEN_FORMAT;
      errResponse.message = message;
      errCode = code;
    }

    if (error instanceof TokenErrorInvalidData) {
      let { message, code } = ApiErr.INVALID_TOKEN;
      errResponse.message = message;
      errCode = code;
    }

    if (error instanceof MatchErrorID) {
      let { message, code } = ApiErr.INVALID_MATCH_ID;
      errResponse.message = message;
      errCode = code;
    }

    if (error instanceof MatchErrorPayload) {
      let { message, code } = ApiErr.INVALID_PAYLOAD_FORMAT;
      errResponse.message = message;
      errCode = code;
    }

    return res.status(errCode).json(errResponse);
  }
};
