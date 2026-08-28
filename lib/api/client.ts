import { cookies } from "next/headers";
import type { ErrorResponse } from "./types";

// Same cookie name as lib/auth/session.ts (kept inline to avoid importing the
// redirect()-pulling session module into every API call site).
const TOKEN_COOKIE = "sf_token";

// On the server (SSR, server components, server actions) prefer an internal
// service URL so container-to-container calls don't rely on host port mapping —
// e.g. API_URL_INTERNAL=http://api:8080 under docker compose. In the browser only
// NEXT_PUBLIC_* vars exist, so this transparently falls back to the public URL.
const API_BASE = process.env.API_URL_INTERNAL || process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not set. Copy .env.example to .env.local and point it at the ecommerce-api.",
  );
}

const API_ROOT = `${API_BASE.replace(/\/$/, "")}/api/v1`;

/** Thrown for any non-2xx API response. `body` is the parsed `ErrorResponse` when available. */
export class ApiError extends Error {
  readonly status: number;
  readonly body?: ErrorResponse;

  constructor(status: number, body?: ErrorResponse) {
    super(body?.message ?? `API request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export interface ApiFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  /** Request body. `FormData` is sent as-is (multipart); anything else is JSON-stringified
   *  with `Content-Type: application/json`. */
  body?: unknown;
  /** Passed through to `fetch`. Use `"no-store"` for per-request data, `"force-cache"` for cached reads. */
  cache?: RequestCache;
  /** Seconds before a cached response is revalidated (pairs with `cache: "force-cache"`). */
  revalidate?: number | false;
  /** Cache tags for on-demand `revalidateTag` invalidation. */
  tags?: string[];
  signal?: AbortSignal;
  /** Attach `Authorization: Bearer <token>` from the session cookie. Use for
   *  endpoints the API protects (orders, review POST, /auth/me). */
  auth?: boolean;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = "GET", body, cache, revalidate, tags, signal, auth } = options;

  let authHeader: Record<string, string> = {};
  if (auth) {
    const token = (await cookies()).get(TOKEN_COOKIE)?.value;
    if (token) authHeader = { Authorization: `Bearer ${token}` };
  }

  const isFormData = body instanceof FormData;

  const res = await fetch(`${API_ROOT}${path}`, {
    method,
    headers: {
      Accept: "application/json",
      // Let fetch set the multipart boundary for FormData; JSON otherwise.
      ...(body !== undefined && !isFormData ? { "Content-Type": "application/json" } : {}),
      ...authHeader,
    },
    body:
      body === undefined ? undefined : isFormData ? (body as FormData) : JSON.stringify(body),
    cache,
    next: revalidate !== undefined || tags ? { revalidate, tags } : undefined,
    signal,
  });

  if (!res.ok) {
    let parsed: ErrorResponse | undefined;
    try {
      parsed = (await res.json()) as ErrorResponse;
    } catch {
      parsed = undefined;
    }
    throw new ApiError(res.status, parsed);
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return undefined as T;
  }

  return (await res.json()) as T;
}
