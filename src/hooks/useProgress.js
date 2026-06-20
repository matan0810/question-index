import { useState, useCallback, useRef } from "react";

const storageKey = (courseId) => `progress_${courseId}`;
const modeKey = (courseId) => `studyMode_${courseId}`;

function loadDone(courseId) {
  try {
    return new Set(
      JSON.parse(localStorage.getItem(storageKey(courseId)) || "[]"),
    );
  } catch {
    return new Set();
  }
}

export function useProgress(courseId) {
  const [done, setDone] = useState(() => loadDone(courseId));
  const [studyMode, setStudyMode] = useState(
    () => localStorage.getItem(modeKey(courseId)) === "1",
  );
  const [doneVersion, setDoneVersion] = useState(0);

  // Stable function reference — reads current set via ref so toggling one
  // question does NOT cause useSearchData to recompute the entire results list.
  const doneRef = useRef(done);
  doneRef.current = done;
  const isDone = useCallback((key) => doneRef.current.has(key), []);

  const toggleDone = useCallback(
    (key) => {
      setDone((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        localStorage.setItem(storageKey(courseId), JSON.stringify([...next]));
        return next;
      });
      setDoneVersion((v) => v + 1);
    },
    [courseId],
  );

  const resetProgress = useCallback(() => {
    setDone(new Set());
    setDoneVersion((v) => v + 1);
    localStorage.removeItem(storageKey(courseId));
  }, [courseId]);

  const toggleStudyMode = useCallback(() => {
    setStudyMode((prev) => {
      const next = !prev;
      if (next) localStorage.setItem(modeKey(courseId), "1");
      else localStorage.removeItem(modeKey(courseId));
      return next;
    });
  }, [courseId]);

  return {
    isDone,
    toggleDone,
    resetProgress,
    doneCount: done.size,
    doneVersion,
    studyMode,
    toggleStudyMode,
  };
}
