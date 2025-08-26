import "dotenv/config";
import express from "express";
import cors from "cors";
import { usersRouter } from "./users/users.routes";
import { ensureDatabase } from "./db"; // note .js in ESM after TS compile

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.get("/health", (_req, res) => res.json({ ok: true }));
const PORT = process.env.PORT || 4000;
ensureDatabase().then(() => {
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
});
