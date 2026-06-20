import { useState, useCallback, useRef } from "react";

export const LABEL_DEFS = [
  { key: "hard",  label: "קשה",   color: "#c1440e", bg: "#c1440e18", icon: "★" },
  { key: "later", label: "להמשך", color: "#4a7aab", bg: "#2b416218", icon: "◎" },
];

const storageKey = (courseId) => `labels_${courseId}`;

function loadLabels(courseId) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(courseId)) || "{}");
  } catch {
    return {};
  }
}

export function useLabels(courseId) {
  const [labels, setLabels] = useState(() => loadLabels(courseId));
  const [version, setVersion] = useState(0);

  // Stable references via ref — same pattern as useProgress.isDone
  const labelsRef = useRef(labels);
  labelsRef.current = labels;

  const hasLabel = useCallback(
    (questionKey, labelKey) =>
      (labelsRef.current[questionKey] || []).includes(labelKey),
    [],
  );

  const getLabels = useCallback(
    (questionKey) => labelsRef.current[questionKey] || [],
    [],
  );

  const toggleLabel = useCallback(
    (questionKey, labelKey) => {
      setLabels((prev) => {
        const current = prev[questionKey] || [];
        const next = current.includes(labelKey)
          ? current.filter((l) => l !== labelKey)
          : [...current, labelKey];
        const updated = { ...prev };
        if (next.length) updated[questionKey] = next;
        else delete updated[questionKey];
        localStorage.setItem(storageKey(courseId), JSON.stringify(updated));
        return updated;
      });
      setVersion((v) => v + 1);
    },
    [courseId],
  );

  const resetLabels = useCallback(() => {
    setLabels({});
    setVersion((v) => v + 1);
    localStorage.removeItem(storageKey(courseId));
  }, [courseId]);

  return {
    hasLabel,
    getLabels,
    toggleLabel,
    resetLabels,
    labelsVersion: version,
    labelCount: Object.keys(labels).length,
  };
}
