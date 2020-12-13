import {CIRCLE_MARK, CROSS_MARK, EMPTY_MARK, WIN_COMBOS} from "./const"

export default (boardState) => {
  let scoreX = 0;
  let scoreO = 0;
  let finished = false;

  WIN_COMBOS.forEach((combo) => {
    if (combo.every((i) => boardState[i] === CROSS_MARK)) {
      scoreX = 1;
      scoreO = -1;
    }
    if (combo.every((i) => boardState[i] === CIRCLE_MARK)) {
      scoreO = 1;
      scoreX = -1;
    }
  });

  if (scoreO || scoreX) {
    finished = true;
  }

  // SI SE LLENA EL TABLERO Y NO HAY GANADOR
  if (boardState.every((mark) => mark !== EMPTY_MARK)) {
    finished = true;
  }

  return {
    [CROSS_MARK]: scoreX,
    [CIRCLE_MARK]: scoreO,
    finished,
  };
};