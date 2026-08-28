// Product picture URLs from the API are relative (e.g. /api/v1/products/1/pictures/1/content).
// The browser loads them directly (an <img> GET, not subject to CORS), so they must be
// absolute against the browser-facing API URL — never the internal container host.
const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export function publicAssetUrl(relativePath: string): string {
  return `${PUBLIC_API_URL}${relativePath}`;
}
