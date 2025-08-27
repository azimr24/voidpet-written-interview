import { Router } from "express";
import { createUser } from "./users.controller.js";
import { requireAuth } from "../auth/requireAuth";

export const usersRouter = Router();

usersRouter.post("/create-user", createUser);
