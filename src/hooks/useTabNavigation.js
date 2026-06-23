import { useCallback, useRef } from "react";
import { useUrlParam } from "./useUrlParam";

export function useTabNavigation(params, setParams, isExcluded) {
  const [tab, setTab] = useUrlParam(params, setParams, "tab");
  const activeTab = tab || "overview";
  const setActiveTab = useCallback(
    (v) => setTab(v === "overview" ? "" : v),
    [setTab],
  );

  const setParamsRef = useRef(setParams);
  setParamsRef.current = setParams;
  const isExcludedRef = useRef(isExcluded);
  isExcludedRef.current = isExcluded;

  // One setParams call so the tab + filter land atomically; two calls would race against the same prev.
  const goToSearch = useCallback((filterKey, filterValue, { revealExcluded = false } = {}) => {
    setParamsRef.current(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("tab", "search");
        ["q", "topic", "chapter", "type", "year", "moed", "semester", "lecturer", "progress"]
          .forEach((k) => next.delete(k));
        if (filterValue) next.set(filterKey, filterValue);
        if (revealExcluded) next.set("showExcl", "1");
        return next;
      },
      { replace: true },
    );
  }, []);

  const goToTopic = useCallback(
    (v) => goToSearch("topic", v, { revealExcluded: isExcludedRef.current?.(v) }),
    [goToSearch],
  );
  const goToChapter = useCallback((v) => goToSearch("chapter", v), [goToSearch]);
  const goToType = useCallback((v) => goToSearch("type", v), [goToSearch]);

  return { activeTab, setActiveTab, goToTopic, goToChapter, goToType };
}
