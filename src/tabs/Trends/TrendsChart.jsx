import { COLORS_UI } from "../../styles";

const W = 560, H = 240, PL = 28, PR = 12, PT = 14, PB = 32;
const IW = W - PL - PR;
const IH = H - PT - PB;

function xOf(i, yearCount) {
  return PL + (yearCount > 1 ? (i / (yearCount - 1)) * IW : IW / 2);
}

function yOf(v, maxVal) {
  return PT + IH - (Math.min(v, maxVal) / maxVal) * IH;
}

export default function TrendsChart({
  years,
  yTicks,
  selected,
  topTopics,
  topicColors,
  byYear,
  pri,
  maxVal,
  topicHe,
}) {
  return (
    <div
      style={{
        overflowX: "auto",
        border: `1px solid ${COLORS_UI.border}`,
        borderRadius: 2,
      }}
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", minWidth: 320 }}>
        <rect x={PL} y={PT} width={IW} height={IH} fill={COLORS_UI.barBg} opacity={0.5} />

        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={PL} y1={yOf(v, maxVal)}
              x2={W - PR} y2={yOf(v, maxVal)}
              stroke={COLORS_UI.border}
              strokeWidth={v === 0 ? 1 : 0.5}
              strokeDasharray={v > 0 ? "3,3" : ""}
            />
            <text x={PL - 5} y={yOf(v, maxVal) + 4} fontSize={8} fill={COLORS_UI.muted} textAnchor="end">
              {v}
            </text>
          </g>
        ))}

        {years.map((yr, i) => {
          if (years.length > 12 && i % 2 !== 0) return null;
          return (
            <text key={yr} x={xOf(i, years.length)} y={H - 8} fontSize={9} fill={COLORS_UI.subdued} textAnchor="middle">
              {yr}
            </text>
          );
        })}

        <line
          x1={xOf(years.length - 1, years.length)} y1={PT}
          x2={xOf(years.length - 1, years.length)} y2={PT + IH}
          stroke={pri}
          strokeWidth={0.5}
          opacity={0.35}
        />

        {[...selected].map((topic) => {
          const ti = topTopics.indexOf(topic);
          const color = ti >= 0 ? topicColors[ti] : pri;
          const pts = years.map((yr, i) => ({
            x: xOf(i, years.length),
            y: yOf(byYear[yr]?.[topic] || 0, maxVal),
            v: byYear[yr]?.[topic] || 0,
          }));
          const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
          return (
            <g key={topic}>
              <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" opacity={0.85} />
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
  );
}
