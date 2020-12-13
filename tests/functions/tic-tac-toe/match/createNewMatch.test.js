import { createNewMatch } from "../../../../src/functions/tic-tac-toe/match";

jest.mock("uuid", () => ({
  v4: () => "12345",
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => "token1234",
}));

describe("Create a new match", () => {
  it("Should create a new match object (CPU-x)", () => {
    const newMatch = {
      matchId: "12345",
      boardState: ["-", "-", "-", "-", "-", "-", "-", "-", "x"],
      cpuMark: "x",
      token: "token1234"
    };
    const randomSpy = jest.spyOn(Math, "random");
    randomSpy.mockImplementation(() => 0.4);
    expect(createNewMatch()).toStrictEqual(newMatch);
  });

  it("Should create a new match object (HUMAN)", () => {
    const newMatch = {
      matchId: "12345",
      boardState: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
      token: "token1234"
    };
    const randomSpy = jest.spyOn(Math, "random");
    randomSpy.mockImplementation(() => 0.8);
    expect(createNewMatch()).toEqual(newMatch);
  });
});
