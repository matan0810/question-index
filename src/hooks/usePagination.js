import { useState, useEffect } from "react";

// Caps how many list items render at once, with a "show more" stepper, so large
// lists don't mount hundreds of cards in one go. Resets to the first page
// whenever `resetKey` changes (e.g. the filters or sort changed) — but NOT on
// unrelated re-renders like toggling a question's progress.
export function usePagination(total, { pageSize = 50, resetKey = "" } = {}) {
  const [count, setCount] = useState(pageSize);

  useEffect(() => {
    setCount(pageSize);
  }, [resetKey, pageSize]);

  const visible = Math.min(count, total);
  return {
    visible,
    hasMore: visible < total,
    remaining: total - visible,
    showMore: () => setCount((c) => c + pageSize),
    showAll: () => setCount(total),
  };
}
