import routes from "./constants/routes.js";
import * as TIC_TAC_TOE from "./api/tic-tac-toe/index.js";
import checkTokeGame from "./api/tic-tac-toe/checkTokenGame.js"

export default (app) => {
  const { main, games, sections } = routes;
  app.post(
    main.API + games.TIC_TAC_TOE + sections.PLAY,
    checkTokeGame,
    TIC_TAC_TOE.PLAY
    );
};
