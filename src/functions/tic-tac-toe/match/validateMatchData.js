import { validate as validateUUID } from "uuid";
import { validateBoard } from "../board";
import { CIRCLE_MARK, CROSS_MARK } from "../board/const";
import { MatchErrorID, MatchErrorPayload } from "./MatchError";

export default ({ matchId, boardState, nextMove, cpuMark }) => {
  
  // VALIDAR MATCH ID
  if (!matchId || !validateUUID(matchId)) throw new MatchErrorPayload();
  
  // VALIDAR BOARD STATE
  try {
    validateBoard(boardState);
  } catch (error) {
    throw new MatchErrorPayload();
  }

  // VALIDAR NEXT MOVE
  if(!nextMove || !nextMove.char || nextMove.position === undefined) throw new MatchErrorPayload();
  
  // VALIDAR CPU MARK
  if(!cpuMark || (cpuMark !== CROSS_MARK && cpuMark !== CIRCLE_MARK)) throw new MatchErrorPayload();

};
