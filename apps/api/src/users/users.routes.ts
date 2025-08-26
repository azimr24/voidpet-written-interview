import { Router } from "express";
import { createUser, me } from "./users.controller.js";
import { requireAuth } from "../auth/requireAuth";

export const usersRouter = Router();

usersRouter.post("/create-user", createUser);
usersRouter.get("/me", requireAuth, me);
