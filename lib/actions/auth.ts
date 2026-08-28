"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { login as apiLogin, register as apiRegister } from "@/lib/api/auth";
import { TOKEN_COOKIE } from "@/lib/auth/session";
import type { LoginRequest, RegisterRequest } from "@/lib/api/types";

export type AuthResult = { ok: true } | { ok: false; error: string };

async function storeToken(accessToken: string, expiresIn: number): Promise<void> {
  const store = await cookies();
  store.set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: expiresIn,
  });
}

export async function loginAction(input: LoginRequest): Promise<AuthResult> {
  try {
    const res = await apiLogin(input);
    await storeToken(res.accessToken, res.expiresIn);
    return { ok: true };
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        error:
          err.status === 401
            ? "Invalid email or password."
            : err.body?.message ?? `Sign in failed (${err.status}).`,
      };
    }
    return { ok: false, error: "Something went wrong signing in." };
  }
}

export async function registerAction(input: RegisterRequest): Promise<AuthResult> {
  try {
    const res = await apiRegister(input);
    await storeToken(res.accessToken, res.expiresIn);
    return { ok: true };
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        ok: false,
        error:
          err.status === 409
            ? "That email is already registered."
            : err.body?.message ?? `Registration failed (${err.status}).`,
      };
    }
    return { ok: false, error: "Something went wrong creating your account." };
  }
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
  redirect("/login");
}
