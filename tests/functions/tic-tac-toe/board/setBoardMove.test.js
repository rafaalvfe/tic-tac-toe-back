import setBoardMove from "../../../../src/functions/tic-tac-toe/board/setBoardMove";

describe("Insert moves in Board", () => {
  it("Should succesfully insert moves to board", () => {
    let testBoard = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

    testBoard = setBoardMove(testBoard, "x", 0);
    expect(testBoard).toStrictEqual([
      "x","-","-",
      "-","-","-",
      "-","-","-"
    ]);
    testBoard = setBoardMove(testBoard, "o", 2);
    expect(testBoard).toStrictEqual([
      "x","-","o",
      "-","-","-",
      "-","-","-"
    ]);
    testBoard = setBoardMove(testBoard, "x", 8);
    expect(testBoard).toStrictEqual([
      "x","-","o",
      "-","-","-",
      "-","-","x"
    ]);
  });

  it("Should fail insert move", () => {
    const testBoard = ["-", "-", "x", "-", "-", "-", "-", "-", "-"];
    const invalidMoves = [
      ["", 0],
      [null, 1],
      [4, 2],
      [true, 4],
      ["e", 5],
      ["x", -2],
      ["x", 9],
      ["x", 2],
      ["x", 3],
    ];

    invalidMoves.forEach((move) => {
      expect(() => setBoardMove(testBoard, move[0], move[1])).toThrow();
    });
  });
});