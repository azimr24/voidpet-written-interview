import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const enc = new TextEncoder();
const SECRET = enc.encode(process.env.JWT_SECRET || "dev_secret_change_me");
const ISSUER = process.env.JWT_ISSUER || "voidpet-written-interview-api";
const AUDIENCE = process.env.JWT_AUDIENCE || "voidpet-written-interview-mobile";

export type AppJwtPayload = JWTPayload & {
  sub: string; // user id (subject)
};

/**
 * Sign an app JWT for a given user id.
 * @param userId subject claim
 * @param opts expiresIn like '7d', and extra claims to embed
 */
export async function signAppJwt(
  userId: string,
  opts?: { expiresIn?: string; extra?: Record<string, unknown> },
): Promise<string> {
  const jwt = await new SignJWT({ ...(opts?.extra ?? {}) })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(opts?.expiresIn ?? "7d")
    .sign(SECRET);
  return jwt;
}

/**
 * Verify an incoming app JWT and return the payload.
 * Throws on invalid/expired tokens.
 */
export async function verifyAppJwt(token: string): Promise<AppJwtPayload> {
  const { payload } = await jwtVerify(token, SECRET, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  if (!payload.sub) throw new Error("Missing sub claim");
  return payload as AppJwtPayload;
}
