import {getBoardScore} from "../../../../src/functions/tic-tac-toe/board";

describe("Test Board score", () => {
  it("Should get active match score", () => {
    const expectedRes = {"x": 0, "o": 0, finished: false};
    const unfinishedMatches = [
      ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "x", "-", "-", "-", "-", "-", "-"],
      ["-", "-", "x", "-", "-", "x", "o", "-", "-"],
    ];
    unfinishedMatches.forEach(board => {
      const score = getBoardScore(board);
      expect(score).toStrictEqual(expectedRes);
    });
  });

  it("Should get finished match score with winner", () => {
    const expectedRes = {"x": 1, "o": -1, finished: true};
    const finishedMatches = [
      ["x", "x", "x", "o", "o", "-", "-", "-", "-"],
      ["o", "-", "x", "-", "x", "o", "x", "-", "o"],
      ["-", "-", "x", "-", "o", "x", "o", "-", "x"],
    ];
    finishedMatches.forEach(board => {
      const score = getBoardScore(board);
      expect(score).toStrictEqual(expectedRes);
    });
  });

  it("Should get finished drawed match score", () => {
    const expectedRes = {"x": 0, "o": 0, finished: true};
    const finishedMatches = [
      ["x", "x", "o",
       "o", "o", "x",
       "x", "x", "o"],

      ["x", "o", "x",
       "o", "o", "x",
       "x", "x", "o"]
    ];
    finishedMatches.forEach(board => {
      const score = getBoardScore(board);
      expect(score).toStrictEqual(expectedRes);
    });
  });
});
