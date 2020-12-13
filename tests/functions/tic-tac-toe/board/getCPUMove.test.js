import getCPUMove from "../../../../src/functions/tic-tac-toe/board/getCPUMove";

describe("Next CPU Move",() => {
  // it("Should get optimal next move",() => {
  //   const board = ["o","-","x","x","-","-","x","o","o"];
  //   const nextMove = getCPUMove(board,"x");
  //   expect(nextMove).toStrictEqual(["o","-","x","x","x","-","x","o","o"]);
  // })

  // it("Should get optimal next move",() => {
  //   const board = [
  //     "x","o","x",
  //     "x","o","o",
  //     "-","x","-"];
  //   const nextMove = getCPUMove(board,"o");
  //   expect(nextMove).toStrictEqual([
  //     "x","o","x",
  //     "x","o","o",
  //     "o","x","-"]);
  // })

  it("Should get optimal next move",() => {
    const board = [
      "o","-","-",
      "-","x","-",
      "x","-","-"];
    const nextMove = getCPUMove(board,"o");
    expect(nextMove).toStrictEqual([
      "o","-","o",
      "-","x","-",
      "x","-","-"]);
  })
})