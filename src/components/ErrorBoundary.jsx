import { Component } from "react";
import { COLORS_UI, FONTS } from "../styles";

// Catches render-time errors anywhere below it and shows a friendly fallback
// instead of a blank screen. Class component because React only exposes error
// boundaries through the class lifecycle (getDerivedStateFromError).
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Unexpected render error:", error, info);
  }

  goHome = () => {
    window.location.hash = "#/";
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        className="rtl-page"
        style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
      >
        <div style={{ fontFamily: FONTS.sans, maxWidth: 420 }}>
          <div style={{ fontSize: 38, fontWeight: 800, marginBottom: 8 }}>משהו השתבש</div>
          <div style={{ fontSize: 14, color: COLORS_UI.muted, marginBottom: 20 }}>
            אירעה תקלה בלתי צפויה בעת הצגת העמוד.
          </div>
          <button
            onClick={this.goHome}
            style={{
              background: `${COLORS_UI.primary}18`,
              border: `1px solid ${COLORS_UI.primary}55`,
              borderRadius: 3,
              cursor: "pointer",
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 600,
              color: COLORS_UI.primary,
              padding: "6px 16px",
            }}
          >
            חזרה לכל הקורסים
          </button>
        </div>
      </div>
    );
  }
}
