import { card, COLORS_UI, FONTS, primaryColor } from "../styles";

export default function FormatBanner({ chapters, examFormat, colorsUI }) {
  const accent = primaryColor(colorsUI);
  const chapterByKey = Object.fromEntries(chapters.map((ch) => [ch.key, ch]));

  const badgeStyles = {
    accent: { background: `${accent}15`, color: accent },
    neutral: { background: COLORS_UI.bg, color: COLORS_UI.text },
  };

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
    warning: { color: accent, fontSize: 11 },
    badgesRow: {
      marginTop: 12,
      borderTop: `1px dashed ${COLORS_UI.border}`,
      paddingTop: 10,
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
    },
  };

  function ChapterCell({ ch }) {
    const color = chapterByKey[ch.key]?.chipColor ?? chapterByKey[ch.key]?.color ?? accent;
    return (
      <div>
        <b style={{ color }}>
          פרק {ch.key}׳ — {ch.points} נק׳
        </b>
        <br />
        {ch.description}
        {ch.warning && (
          <>
            <br />
            <span style={s.warning}>⚠️ {ch.warning}</span>
          </>
        )}
      </div>
    );
  }

  function BadgePill({ label, variant }) {
    const { background, color } = badgeStyles[variant] ?? badgeStyles.neutral;
    return (
      <span
        style={{
          fontFamily: FONTS.sans,
          fontSize: 13,
          fontWeight: 600,
          background,
          color,
          border: `1px solid ${color}33`,
          padding: "4px 12px",
        }}
      >
        {label}
      </span>
    );
  }

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
        {examFormat.chapters.map((ch) => (
          <ChapterCell key={ch.key} ch={ch} />
        ))}
      </div>
      <div style={s.badgesRow}>
        {examFormat.badges.map((b) => (
          <BadgePill key={b.label} {...b} />
        ))}
      </div>
    </div>
  );
}
