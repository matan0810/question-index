import { useCallback, useRef } from "react";

// Two-way binding between a single URL search param and component state.
// Returns [value, setValue]; setting a falsy value removes the param. Uses
// history replace so filter changes don't pile up in the back button.
//
// setValue has a STABLE identity (deps: just `key`) even though React Router's
// setSearchParams is recreated on every URL change — we read it through a ref.
// This is what lets memoized rows/cards that receive these setters skip
// re-rendering when an unrelated param (sort, tab, …) changes.
export function useUrlParam(params, setParams, key) {
  const value = params.get(key) ?? "";

  const setParamsRef = useRef(setParams);
  setParamsRef.current = setParams;

  const setValue = useCallback(
    (v) =>
      setParamsRef.current(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (v) next.set(key, v);
          else next.delete(key);
          return next;
        },
        { replace: true },
      ),
    [key],
  );

  return [value, setValue];
}
