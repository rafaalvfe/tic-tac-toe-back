import {EMPTY_MARK, MARK_ARRAY} from "./const"
import {validateBoard} from "./";
import { BoardErrorMove } from "./BoardError";

export default (boardState, mark, position) => {
  const tmpBoard = [...boardState];

  // Valida que el símbolo sea válido
  if (!mark || !MARK_ARRAY.includes(mark)) throw new BoardErrorMove();

  // Valida que la posición exista
  if (isNaN(position) || position < 0 || position > 8)
    throw new BoardErrorMove();

  // Valida que la posición en el tablero este libre
  if (tmpBoard[position] !== EMPTY_MARK) throw new BoardErrorMove();

  tmpBoard[position] = mark;
  validateBoard(tmpBoard);

  return tmpBoard;
};
