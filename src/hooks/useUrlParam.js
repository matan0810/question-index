import { useCallback } from "react";

// Two-way binding between a single URL search param and component state.
// Returns [value, setValue]; setting a falsy value removes the param. Uses
// history replace so filter changes don't pile up in the back button.
export function useUrlParam(params, setParams, key) {
  const value = params.get(key) ?? "";
  const setValue = useCallback(
    (v) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v) next.set(key, v);
          else next.delete(key);
          return next;
        },
        { replace: true },
      ),
    [setParams, key],
  );
  return [value, setValue];
}
