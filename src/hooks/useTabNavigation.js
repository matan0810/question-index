import { useCallback } from "react";
import { useUrlParam } from "./useUrlParam";

// Active-tab state plus the cross-tab "jump to search with a filter applied"
// helpers. goToSearch sets tab=search and one filter in a single history
// replace — splitting it into two setParams calls would drop the first update,
// since React Router batches both against the original prev.
export function useTabNavigation(params, setParams) {
  const [tab, setTab] = useUrlParam(params, setParams, "tab");
  const activeTab = tab || "overview";
  const setActiveTab = useCallback(
    (v) => setTab(v === "overview" ? "" : v),
    [setTab],
  );

  const goToSearch = useCallback(
    (filterKey, filterValue) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("tab", "search");
          if (filterValue) next.set(filterKey, filterValue);
          else next.delete(filterKey);
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  const goToTopic = useCallback((v) => goToSearch("topic", v), [goToSearch]);
  const goToChapter = useCallback((v) => goToSearch("chapter", v), [goToSearch]);
  const goToType = useCallback((v) => goToSearch("type", v), [goToSearch]);

  return { activeTab, setActiveTab, goToTopic, goToChapter, goToType };
}
