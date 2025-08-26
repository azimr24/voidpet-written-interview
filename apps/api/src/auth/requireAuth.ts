// src/auth/requireAuth.ts
import type { Request, Response, NextFunction } from "express";
import { verifyAppJwt } from "./jwt";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    jwt?: any;
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith("Bearer "))
    return res.status(401).json({ error: "Missing token" });
  try {
    const payload = await verifyAppJwt(hdr.slice(7));
    req.userId = payload.sub;
    req.jwt = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
