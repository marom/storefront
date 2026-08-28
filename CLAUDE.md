@AGENTS.md

# Storefront

## Stack
- Next.js 16 (App Router) — `app/` directory, React Server Components by default
- TypeScript (strict)
- Tailwind CSS v4
- Native `fetch` for API calls — no axios, no data-fetching libraries

## API client
- All API access goes through a typed client in `lib/api/`.
- One module per resource (e.g. `lib/api/products.ts`, `lib/api/orders.ts`).
- Each module exports typed functions returning typed responses; request/response types live alongside the module.
- Base URL comes from `process.env.NEXT_PUBLIC_API_URL`. Never hardcode URLs.
- Use `fetch` directly with appropriate Next.js cache options (`cache`, `next.revalidate`).

## Components
- Fetch data in server components. Client components (`"use client"`) only for interactivity.
- Keep components thin: rendering and layout only.
- No business logic in components — put it in `lib/`.
- Pass data down as props; avoid client-side fetching unless genuinely needed.

## Money
- Format all monetary values with `Intl.NumberFormat`.
- Never concatenate currency symbols manually.

## Conventions
- Prefer async/await over promise chains.
- Colocate route-specific code under the route folder in `app/`.
