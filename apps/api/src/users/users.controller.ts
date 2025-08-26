import type { Request, Response } from "express";
import { prisma } from "../db.js"; // your PrismaClient instance
import { z } from "zod";
import { signAppJwt } from "../auth/jwt";

const userSchema = z.object({
  displayName: z.string().min(3).max(100),
});

export async function createUser(req: Request, res: Response) {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }

  const { displayName } = parsed.data;
  try {
    const user = await prisma.user.create({
      data: {
        displayName,
      },
    });
    const token = await signAppJwt(user.id);
    return res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.userId! } });
  if (!user) return res.status(404).json({ error: "Not found" });
  return res.json(user);
}
