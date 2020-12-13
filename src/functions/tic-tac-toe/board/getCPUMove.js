import { getBoardScore, setBoardMove } from "./";
import { EMPTY_MARK, CIRCLE_MARK, CROSS_MARK, WIN_COMBOS } from "./const";

export default (board, cpuMark) => {
  const cpuMove = searchBestMove(board, cpuMark, true);
  return setBoardMove(board, cpuMark, cpuMove.position);
};

const searchBestMove = (board, cpuMark, isCpuTurn, depth = 1) => {
  const oppenentMark = cpuMark === CIRCLE_MARK ? CROSS_MARK : CIRCLE_MARK;
  const mark = isCpuTurn ? cpuMark : oppenentMark;

  let validMoves = board.reduce((moves, currentMark, i) => {
    let tmpBoard = [...board];
    let score = getBoardScore(tmpBoard);
    let totalVal = 0;

    if (currentMark === EMPTY_MARK && !score.finished) {
      tmpBoard = setBoardMove(tmpBoard, mark, i);
      score = getBoardScore(tmpBoard);

      if (score.finished) {
        return [...moves, { position: i, depth: depth, score: score[cpuMark] }];
      } else {
        const innerRes = searchBestMove(
          tmpBoard,
          cpuMark,
          !isCpuTurn,
          depth + 1
        );
        if (innerRes) {
          totalVal = totalVal + innerRes.score
          return [
            ...moves,
            { position: i, depth: innerRes.depth, score: totalVal },
          ];
        }
      }
    }
    return moves;
  }, []);

  validMoves = validMoves.sort((a, b) => {
 
    if (a.score > b.score) return isCpuTurn? -1:1;
    if (a.score < b.score) return isCpuTurn? 1:-1;

    if (a.depth > b.depth) return 1;
    if (a.depth < b.depth) return -1;

    return Math.random() * 2 - 1;
  });

  return validMoves[0] || undefined;
};
