import express from "express";
import initRoutes from "./routes.js";
import cors from "cors"

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

initRoutes(app);

app.listen(port, (_) => console.log(`Listening on port ${port}`));
