import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COURSE_LIST } from "../courses/index";
import { COLORS_UI, FONTS, card } from "../styles";
import { DarkToggle, Footer } from "../components";

export default function CoursePicker() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "מדד שאלות";
  }, []);

  return (
    <div className="rtl-page">
      {/* Dark mode toggle */}
      <div className="flex-end" style={{ marginBottom: 12 }}>
        <DarkToggle />
      </div>

      {/* Hero */}
      <div className="page-hero">
        <div className="hero-title">מדד שאלות</div>
        <div className="text-sm text-muted">
          ניתוח מבחנים, נושאים ומגמות — בחר קורס כדי להתחיל
        </div>

        {/* Stats bar */}
        <div className="stats-row">
          {[
            [COURSE_LIST.length, "קורסים"],
            [COURSE_LIST.reduce((s, c) => s + c.EXAMS.length, 0), "מבחנים"],
            [
              COURSE_LIST.reduce(
                (s, c) => s + c.EXAMS.reduce((ss, e) => ss + e.questions.length, 0),
                0,
              ),
              "שאלות",
            ],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="stat-num">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Course grid */}
      <div className="course-grid">
        {COURSE_LIST.map((course) => (
          <button
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            style={{
              ...card,
              textAlign: "right",
              cursor: "pointer",
              borderTop: `4px solid ${course.CHAPTERS[0].color}`,
              fontFamily: FONTS.sans,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `4px 4px 0 ${COLORS_UI.dark}`;
              e.currentTarget.style.transform = "translate(-1px, -1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `2px 2px 0 ${COLORS_UI.dark}`;
              e.currentTarget.style.transform = "translate(0, 0)";
            }}
          >
            <div className="text-sm text-muted" style={{ marginBottom: 4 }}>
              קורס {course.COURSE.number}
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 20,
                color: course.CHAPTERS[0].color,
                marginBottom: 12,
              }}
            >
              {course.COURSE.name}
            </div>
            <div
              className="stats-row"
              style={{ marginTop: 0, paddingTop: 10, gap: 16 }}
            >
              {[
                [course.EXAMS.length, "מבחנים"],
                [
                  course.EXAMS.reduce((s, e) => s + e.questions.length, 0),
                  "שאלות",
                ],
                [
                  `${Math.min(...course.EXAMS.map((e) => e.year))}–${Math.max(...course.EXAMS.map((e) => e.year))}`,
                  "שנים",
                ],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="stat-num" style={{ fontSize: 20 }}>{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Footer — pushed to the bottom of the viewport */}
      <Footer stickToBottom />
    </div>
  );
}
