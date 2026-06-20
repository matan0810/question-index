import { COLORS_UI, FONTS } from "../../../styles";

export default function BadgePill({ label, variant, accent }) {
  const styles = {
    accent: { background: `${accent}15`, color: accent },
    neutral: { background: COLORS_UI.bg, color: COLORS_UI.text },
  };
  const { background, color } = styles[variant] ?? styles.neutral;
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
