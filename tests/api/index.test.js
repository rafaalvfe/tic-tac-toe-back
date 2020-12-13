import request from "supertest";
import { app } from "../../src/index";
import routes from "../../src/constants/routes";
import {
  INVALID_TOKEN_FORMAT,
  INVALID_TOKEN,
  INVALID_MATCH_ID,
  INVALID_PAYLOAD_FORMAT,
  INVALID_MOVE,
  MATCH_FINISHED,
} from "../../src/constants/apiErrors";

const cpuGameData = {
  matchId: "f5e46810-c225-4fed-9406-d5b1c4edadec",
  boardState: ["-", "-", "-", "o", "-", "-", "-", "-", "-"],
  cpuMark: "o",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRjaElkIjoiZjVlNDY4MTAtYzIyNS00ZmVkLTk0MDYtZDViMWM0ZWRhZGVjIiwiYm9hcmRTdGF0ZSI6WyItIiwiLSIsIi0iLCJvIiwiLSIsIi0iLCItIiwiLSIsIi0iXSwiY3B1TWFyayI6Im8iLCJpYXQiOjE2MDczNjE2NTd9._-UA690j8ep9itvyJ2tVO3P-Gqeun8fyO0GU-HFawB8",
};

const endpoint = `${routes.main.API}${routes.games.TIC_TAC_TOE}${routes.sections.PLAY}`;

describe("POST /api/tic-tac-toe/play", () => {
  it("Should start a new game", async () => {
    const res = await request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.matchId = "testid";
      })
      .expect(200);
  });

  it("Should return invalid token format Error", async () => {
    const res = await request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .set("Authorization", "faketoken12879124")
      .expect("Content-Type", /json/)
      .expect(403, { error: true, message: INVALID_TOKEN_FORMAT.message });
  });

  it("Should return invalid token Error", async () => {
    const res = await request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer 123456")
      .expect("Content-Type", /json/)
      .expect(403, { error: true, message: INVALID_TOKEN.message });
  });

  it("Should return invalid MatchId", async () => {
    const res = await request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${cpuGameData.token}`)
      .send("invalid json")
      .expect("Content-Type", /json/)
      .expect(400, { error: true, message: INVALID_PAYLOAD_FORMAT.message });
  });

  it("Should return invalid move", async () => {
    const { matchId, boardState, cpuMark, token } = cpuGameData;
    await request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        matchId,
        boardState,
        cpuMark,
        nextMove: { char: "x", position: 3 },
      })
      .expect("Content-Type", /json/)
      .expect(400, { error: true, message: INVALID_MOVE.message });
  });

  it("Should return match finished", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRjaElkIjoiMTMwZTkxNWEtNTcyYS00N2U4LWFiMGYtYTk3NmVhZDc0NWQ4IiwiYm9hcmRTdGF0ZSI6WyJ4IiwiLSIsIi0iLCItIiwieCIsIi0iLCJvIiwibyIsIngiXSwiY3B1TWFyayI6IngiLCJpYXQiOjE2MDcyNjk1ODJ9.ea2BEJldMvwx_m-3MzAPCx74DzZlIsNanjhYgjrBCME";

    const matchId = "130e915a-572a-47e8-ab0f-a976ead745d8";
    const boardState = ["x", "-", "-", "-", "x", "-", "o", "o", "x"];
    const cpuMark = "x";

    await request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        matchId,
        boardState,
        cpuMark,
        nextMove: { char: "o", position: 3 },
      })
      .expect("Content-Type", /json/)
      .expect(400, { error: true, message: MATCH_FINISHED.message });
  });
});
