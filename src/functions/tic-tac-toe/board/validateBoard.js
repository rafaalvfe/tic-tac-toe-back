import { MatchErrorPayload } from "../match/MatchError";
import {MARK_ARRAY, CIRCLE_MARK, CROSS_MARK} from "./const"

export default (boardState) => {
  let validMarks = false;
  let countX = 0;
  let countO = 0;
  let diffXO = 0;

  // Valida que se reciba un Array
  if (!boardState || !Array.isArray(boardState))
    throw new MatchErrorPayload();

  // Valida que tenga 9 posiciones
  if (boardState.length !== 9) throw new MatchErrorPayload("Invalid board");

  // Valida que todas las posiciones tengan caracteres válidos
  validMarks = boardState.every((pos) => MARK_ARRAY.includes(pos));

  if (!validMarks) throw new MatchErrorPayload("Invalid mark");

  // Valida que el tablero sea consistente no puede haber una diferencia de 'x' vs 'o' mayor a 2

  boardState.forEach((mark) => {
    mark === CROSS_MARK && countX++;
    mark === CIRCLE_MARK && countO++;
  });

  diffXO = countO - countX;

  if (diffXO < -1 || diffXO > 1) throw new Error("Inconsistent marks");
};
