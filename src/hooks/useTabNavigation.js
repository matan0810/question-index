import { useCallback, useRef } from "react";
import { useUrlParam } from "./useUrlParam";

// Active-tab state plus the cross-tab "jump to search with a filter applied"
// helpers. goToSearch sets tab=search and one filter in a single history
// replace — splitting it into two setParams calls would drop the first update,
// since React Router batches both against the original prev.
//
// All returned callbacks have stable identities (setParams is read via a ref),
// so the memoized cards that receive setSearchTopic don't re-render when the
// URL changes for unrelated reasons (sorting, switching tabs, …).
export function useTabNavigation(params, setParams) {
  const [tab, setTab] = useUrlParam(params, setParams, "tab");
  const activeTab = tab || "overview";
  const setActiveTab = useCallback(
    (v) => setTab(v === "overview" ? "" : v),
    [setTab],
  );

  const setParamsRef = useRef(setParams);
  setParamsRef.current = setParams;

  const goToSearch = useCallback((filterKey, filterValue) => {
    setParamsRef.current(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("tab", "search");
        ["q", "topic", "chapter", "type", "year", "moed", "semester", "lecturer", "progress", "hideLatest"]
          .forEach((k) => next.delete(k));
        next.set("showExcl", "1"); // a clicked topic may be out-of-syllabus
        if (filterValue) next.set(filterKey, filterValue);
        return next;
      },
      { replace: true },
    );
  }, []);

  const goToTopic = useCallback((v) => goToSearch("topic", v), [goToSearch]);
  const goToChapter = useCallback((v) => goToSearch("chapter", v), [goToSearch]);
  const goToType = useCallback((v) => goToSearch("type", v), [goToSearch]);

  return { activeTab, setActiveTab, goToTopic, goToChapter, goToType };
}
