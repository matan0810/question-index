import { useState, useMemo } from "react";
import { COLORS_UI, primaryColor } from "../styles";
import { CardTitle } from "../components";

function computeYearTopics(exams, fromYear, isExcluded) {
  const byYear = {};
  for (const e of exams) {
    if (e.year < fromYear) continue;
    if (!byYear[e.year]) byYear[e.year] = {};
    for (const q of e.questions) {
      if (!isExcluded(q.topic)) {
        byYear[e.year][q.topic] = (byYear[e.year][q.topic] || 0) + 1;
      }
    }
  }
  return byYear;
}

function getTopTopics(exams, fromYear, isExcluded, limit = 15) {
  const counts = {};
  exams.forEach((e) => {
    if (e.year < fromYear) return;
    e.questions.forEach((q) => {
      if (!isExcluded(q.topic)) counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([t]) => t);
}

export default function Trends({ exams, topicHe, isExcluded, trendFromYear, colorsUI, colors }) {
  const pri = primaryColor(colorsUI);

  const topTopics = useMemo(
    () => getTopTopics(exams, trendFromYear, isExcluded),
    [exams, trendFromYear, isExcluded],
  );

  const [selected, setSelected] = useState(
    () => new Set(getTopTopics(exams, trendFromYear, isExcluded, 5)),
  );

  const byYear = useMemo(
    () => computeYearTopics(exams, trendFromYear, isExcluded),
    [exams, trendFromYear, isExcluded],
  );

  const years = Object.keys(byYear).map(Number).sort();

  function toggleTopic(t) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size > 1) next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  }

  const topicColors = topTopics.map((_, i) => colors[i % colors.length]);

  const maxVal = useMemo(() => {
    let m = 0;
    [...selected].forEach((topic) => {
      years.forEach((yr) => {
        m = Math.max(m, byYear[yr]?.[topic] || 0);
      });
    });
    return Math.max(m, 4);
  }, [selected, byYear, years]);

  const yTicks = useMemo(() => {
    const step = maxVal <= 6 ? 1 : maxVal <= 12 ? 2 : maxVal <= 20 ? 4 : 5;
    const ticks = [];
    for (let v = 0; v <= maxVal; v += step) ticks.push(v);
    if (ticks[ticks.length - 1] < maxVal) ticks.push(maxVal);
    return ticks;
  }, [maxVal]);

  const W = 560, H = 240, PL = 28, PR = 12, PT = 14, PB = 32;
  const IW = W - PL - PR;
  const IH = H - PT - PB;

  function xOf(i) {
    return PL + (years.length > 1 ? (i / (years.length - 1)) * IW : IW / 2);
  }
  function yOf(v) {
    return PT + IH - (Math.min(v, maxVal) / maxVal) * IH;
  }

  if (years.length < 2) {
    return (
      <div className="ui-card">
        <CardTitle emoji="📈" title={`מגמות ${trendFromYear}+`} sub="אין מספיק נתונים להצגת גרף" />
        <div style={{ color: COLORS_UI.muted, fontSize: 12 }}>דרוש לפחות שנתיים של מבחנים</div>
      </div>
    );
  }

  return (
    <div className="ui-card">
      <CardTitle
        emoji="📈"
        title={`מגמות לפי שנה (${trendFromYear}–${years[years.length - 1]})`}
        sub="בחרו נושאים לצפייה — לחצו שוב להסרה"
      />

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {topTopics.map((t, i) => {
          const isActive = selected.has(t);
          const color = topicColors[i];
          return (
            <button
              key={t}
              onClick={() => toggleTopic(t)}
              style={{
                padding: "4px 11px",
                fontSize: 11,
                fontWeight: isActive ? 700 : 400,
                cursor: "pointer",
                background: isActive ? color + "1a" : "transparent",
                color: isActive ? color : COLORS_UI.muted,
                border: `1px solid ${isActive ? color + "88" : COLORS_UI.border}`,
                borderRadius: 2,
                fontFamily: "inherit",
                transition: "color 0.12s, background 0.12s, border-color 0.12s",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: color,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              )}
              {topicHe[t] || t}
            </button>
          );
        })}
      </div>

      <div
        style={{
          overflowX: "auto",
          border: `1px solid ${COLORS_UI.border}`,
          borderRadius: 2,
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: "block", minWidth: 320 }}
        >
          <rect x={PL} y={PT} width={IW} height={IH} fill={COLORS_UI.barBg} opacity={0.5} />

          {yTicks.map((v) => (
            <g key={v}>
              <line
                x1={PL} y1={yOf(v)}
                x2={W - PR} y2={yOf(v)}
                stroke={COLORS_UI.border}
                strokeWidth={v === 0 ? 1 : 0.5}
                strokeDasharray={v > 0 ? "3,3" : ""}
              />
              <text
                x={PL - 5} y={yOf(v) + 4}
                fontSize={8}
                fill={COLORS_UI.muted}
                textAnchor="end"
              >
                {v}
              </text>
            </g>
          ))}

          {years.map((yr, i) => {
            if (years.length > 12 && i % 2 !== 0) return null;
            return (
              <text
                key={yr}
                x={xOf(i)} y={H - 8}
                fontSize={9}
                fill={COLORS_UI.subdued}
                textAnchor="middle"
              >
                {yr}
              </text>
            );
          })}

          <line
            x1={xOf(years.length - 1)} y1={PT}
            x2={xOf(years.length - 1)} y2={PT + IH}
            stroke={pri}
            strokeWidth={0.5}
            opacity={0.35}
          />

          {[...selected].map((topic) => {
            const ti = topTopics.indexOf(topic);
            const color = ti >= 0 ? topicColors[ti] : pri;
            const pts = years.map((yr, i) => ({
              x: xOf(i),
              y: yOf(byYear[yr]?.[topic] || 0),
              v: byYear[yr]?.[topic] || 0,
            }));
            const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
            return (
              <g key={topic}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  opacity={0.85}
                />
                {pts.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x} cy={p.y}
                    r={p.v > 0 ? 3.5 : 2}
                    fill={p.v > 0 ? color : COLORS_UI.border}
                    opacity={p.v > 0 ? 0.95 : 0.4}
                  >
                    <title>{`${topicHe[topic] || topic} · ${years[i]} · ${p.v} שאלות`}</title>
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {selected.size > 0 && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: `1px solid ${COLORS_UI.rowDivider}`,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {[...selected].map((topic) => {
            const ti = topTopics.indexOf(topic);
            const color = ti >= 0 ? topicColors[ti] : pri;
            return (
              <span
                key={topic}
                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: COLORS_UI.text }}
              >
                <span
                  style={{
                    width: 18,
                    height: 3,
                    background: color,
                    display: "inline-block",
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                {topicHe[topic] || topic}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
