import { getBoardScore, getCPUMove, setBoardMove } from "../../functions/tic-tac-toe/board";
import { BoardErrorMove } from "../../functions/tic-tac-toe/board/BoardError";
import { getMatchToken } from "../../functions/tic-tac-toe/token";
import {INVALID_MOVE, MATCH_FINISHED} from "../../constants/apiErrors";
import { MatchErrorFinished } from "../../functions/tic-tac-toe/match/MatchError";
import { CROSS_MARK, CIRCLE_MARK } from "../../functions/tic-tac-toe/board/const";

export default (req, res) => {
  const { decodedToken, body } = req;
  const { matchId, boardState, nextMove, cpuMark } = body;

  try {
    let newBoard;
    let newToken;
    let currentScore = getBoardScore(boardState);
    
    if(currentScore.finished){
      throw new MatchErrorFinished()
    }

    if(cpuMark){
      const userMark = cpuMark === CROSS_MARK? CIRCLE_MARK : CROSS_MARK;
      if (userMark !== nextMove.char) throw new BoardErrorMove()
    }    

    newBoard = setBoardMove(boardState, nextMove.char, nextMove.position);
    currentScore = getBoardScore(newBoard);

    if(!currentScore.finished){
      newBoard = getCPUMove(newBoard, cpuMark);
    }
    currentScore = getBoardScore(newBoard);
    newToken = getMatchToken({matchId, boardState: newBoard, cpuMark});

    return res.json({
      matchId,
      boardState: newBoard,
      cpuMark,
      token: newToken,
      score: currentScore
    });
  } catch (error) {
    let errCode = 500;
    let errMsg = "Internal Error";

    if(error instanceof BoardErrorMove){
      errCode = INVALID_MOVE.code
      errMsg = INVALID_MOVE.message
    }

    if(error instanceof MatchErrorFinished){
      errCode = MATCH_FINISHED.code
      errMsg = MATCH_FINISHED.message
    }

    res.status(errCode).send({ error: true, message: errMsg });
  }
};
