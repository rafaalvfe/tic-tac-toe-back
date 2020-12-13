import { v4 as uuidV4 } from "uuid";
import { CIRCLE_MARK, CROSS_MARK, EMPTY_MARK } from "../board/const";
import { setBoardMove } from "../board";
import { getMatchToken } from "../token";

const CPU = "cpu";
const HUMAN = "human";

export default () => {
  const matchId = uuidV4();
  const starter = getRandomStarter();
  const cpuMark = starter === CPU ? getRandomMark() : undefined;
  let boardState = Array(9).fill(EMPTY_MARK);

  if (starter === CPU) {
    const bestMoves = [0,2,6,8];
    bestMoves.sort(_ => (Math.random()) - 0.5);
    const randomPosition = bestMoves[0];
    boardState = setBoardMove(boardState, cpuMark, randomPosition);
  }

  return {
    matchId,
    boardState,
    cpuMark,
    token: getMatchToken({ matchId, boardState, cpuMark }),
  };
};

const getRandomStarter = () => (Math.random() < 0.5 ? CPU : HUMAN);
const getRandomMark = () => (Math.random() < 0.5 ? CROSS_MARK : CIRCLE_MARK);
