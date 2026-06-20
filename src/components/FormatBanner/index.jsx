import { card, COLORS_UI, FONTS, primaryColor } from "../../styles";
import ChapterCell from "./ChapterCell";
import BadgePill from "./BadgePill";

export default function FormatBanner({ chapters, examFormat, colorsUI }) {
  const accent = primaryColor(colorsUI);
  const chapterByKey = Object.fromEntries(chapters.map((ch) => [ch.key, ch]));

  const s = {
    banner: {
      ...card,
      borderColor: accent,
      borderWidth: 2,
      background: `${accent}15`,
      marginBottom: 20,
    },
    header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
    label: {
      background: accent,
      color: "white",
      fontFamily: FONTS.sans,
      fontWeight: 800,
      fontSize: 13,
      padding: "5px 14px",
      letterSpacing: "0.06em",
      whiteSpace: "nowrap",
    },
    session: {
      fontFamily: FONTS.sans,
      fontWeight: 600,
      fontSize: 15,
      color: COLORS_UI.dark,
    },
    date: {
      fontWeight: 400,
      color: COLORS_UI.muted,
      marginRight: 6,
      fontSize: 13,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
      gap: 14,
      fontSize: 13,
      lineHeight: 1.6,
    },
    badgesRow: {
      marginTop: 12,
      borderTop: `1px dashed ${COLORS_UI.border}`,
      paddingTop: 10,
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
    },
  };

  return (
    <div style={s.banner}>
      <div style={s.header}>
        <div style={s.label}>תבנית רשמית</div>
        <div style={s.session}>
          {examFormat.latestSession}
          {examFormat.latestDate && <span style={s.date}>{examFormat.latestDate}</span>}
          {examFormat.lecturer && (
            <span style={{ ...s.date, marginRight: 10, fontWeight: 600 }}>
              {examFormat.lecturer}
            </span>
          )}
        </div>
      </div>
      <div style={s.grid}>
        {examFormat.chapters.map((ch) => {
          const color = chapterByKey[ch.key]?.chipColor ?? chapterByKey[ch.key]?.color ?? accent;
          return <ChapterCell key={ch.key} ch={ch} color={color} accent={accent} />;
        })}
      </div>
      <div style={s.badgesRow}>
        {examFormat.badges.map((b) => (
          <BadgePill key={b.label} {...b} accent={accent} />
        ))}
      </div>
    </div>
  );
}
