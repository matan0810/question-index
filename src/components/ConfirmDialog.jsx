import { useEffect, useRef } from "react";
import { COLORS_UI, FONTS } from "../styles";

export default function ConfirmDialog({ title, body, confirmLabel = "אשר", onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
        animation: "overlay-in 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        style={{
          background: COLORS_UI.bg,
          border: `2px solid ${COLORS_UI.dark}`,
          boxShadow: `4px 4px 0 ${COLORS_UI.dark}`,
          padding: "28px 32px",
          minWidth: 320,
          maxWidth: 440,
          fontFamily: FONTS.sans,
          animation: "dialog-in 0.2s ease",
        }}
      >
        {/* Warning stripe */}
        <div
          style={{
            height: 4,
            background: "#c1440e",
            marginBottom: 20,
            marginInline: -32,
            marginTop: -28,
          }}
        />

        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: COLORS_UI.text,
            marginBottom: 10,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>

        {body && (
          <div
            style={{
              fontSize: 13,
              color: COLORS_UI.subdued,
              marginBottom: 24,
              lineHeight: 1.65,
            }}
          >
            {body}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}>
          <button
            onClick={onConfirm}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 700,
              background: "#c1440e",
              color: "#fff",
              border: "2px solid #c1440e",
              padding: "7px 20px",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a83a0b";
              e.currentTarget.style.borderColor = "#a83a0b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#c1440e";
              e.currentTarget.style.borderColor = "#c1440e";
            }}
          >
            {confirmLabel}
          </button>
          <button
            ref={cancelRef}
            onClick={onCancel}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 600,
              background: "transparent",
              color: COLORS_UI.text,
              border: `1px solid ${COLORS_UI.border}`,
              padding: "7px 20px",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS_UI.subdued)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS_UI.border)}
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}
