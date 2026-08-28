import { apiFetch } from "./client";
import type {
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
} from "./types";

export function login(body: LoginRequest): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/login", { method: "POST", body });
}

export function register(body: RegisterRequest): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/register", { method: "POST", body });
}

export function me(): Promise<CurrentUserResponse> {
  return apiFetch<CurrentUserResponse>("/auth/me", { cache: "no-store", auth: true });
}
