"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and the first client render, `true` afterwards.
 * Canonical replacement for a `useState(false)` + `useEffect(() => setState(true))` flag.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
