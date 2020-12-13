import jwt from "jsonwebtoken";

export default ({ matchId, boardState, cpuMark }) => {
  const secret = process.env.JWT_TTT_KEY;
  const payload = {
    matchId,
    boardState,
    cpuMark,
  };
  const token = jwt.sign(payload, secret);

  return token;
};
