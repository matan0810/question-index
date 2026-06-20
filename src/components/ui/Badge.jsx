export default function Badge({ children, bg = "var(--dark)", color = "var(--bg)" }) {
  return (
    <span
      style={{
        background: bg,
        color,
        fontWeight: 800,
        fontSize: 13,
        padding: "3px 9px",
        display: "inline-block",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
