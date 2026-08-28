import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { Role } from "@/lib/api/types";

/** httpOnly cookie holding the API-issued JWT. */
export const TOKEN_COOKIE = "sf_token";

export interface Session {
  token: string;
  email: string;
  role: Role;
  /** null for admin accounts */
  customerId: number | null;
  /** epoch seconds */
  exp: number;
}

interface JwtClaims {
  sub?: string;
  roles?: string[];
  customerId?: number;
  exp?: number;
}

/** Decode (not verify) the JWT payload. The token is trusted because the API issued
 *  it and it lives in our httpOnly cookie; this only reads claims for display/routing. */
function decodeClaims(token: string): JwtClaims | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const json = Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    return JSON.parse(json) as JwtClaims;
  } catch {
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value ?? null;
}

export async function getSession(): Promise<Session | null> {
  const token = await getToken();
  if (!token) return null;

  const claims = decodeClaims(token);
  if (!claims?.sub || !claims.exp) return null;
  if (claims.exp * 1000 <= Date.now()) return null;

  const role: Role = claims.roles?.[0] === "ROLE_ADMIN" ? "ROLE_ADMIN" : "ROLE_CUSTOMER";
  return {
    token,
    email: claims.sub,
    role,
    customerId: typeof claims.customerId === "number" ? claims.customerId : null,
    exp: claims.exp,
  };
}

/** For protected server components / layouts: returns the session or redirects to /login. */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** For admin-only areas: like requireSession, but a non-admin gets a 404 (area stays hidden). */
export async function requireAdmin(): Promise<Session> {
  const session = await requireSession();
  if (session.role !== "ROLE_ADMIN") notFound();
  return session;
}
