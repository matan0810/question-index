# CLAUDE.md — Project Standards

## Project Overview

**question-index** — אפליקציית React לסטודנטים לחיפוש, מיון וניתוח שאלות ממבחנים.
Stack: React 18, Vite 5, React Router v7, KaTeX. ממשק RTL בעברית, פריסה ל-GitHub Pages.

---

## Tech Stack

| כלי | גרסה | שימוש |
|-----|------|--------|
| React | 18 | UI components |
| Vite | 5 | Dev server + bundler |
| React Router | 7 (HashRouter) | Routing + URL state |
| KaTeX | 0.16 | Math rendering |
| gh-pages | 6 | Deploy to GitHub Pages |

**אין:** TypeScript, CSS-in-JS library, test framework, linter/formatter config.

---

## Architecture

```
src/
  App.jsx              — Router root, course loader
  main.jsx             — ReactDOM entry
  index.css            — Theme variables, utility classes, responsive styles
  context/
    CourseContext.jsx   — כל נתוני הקורס הנוכחי (EXAMS, COLORS, config…)
  courses/
    index.js           — COURSE_REGISTRY: { [courseId]: courseData }
  pages/
    CoursePicker.jsx   — דף בחירת קורס
    CourseApp.jsx      — הדף הראשי — state management, routing tabs
  tabs/                — כל טאב הוא קובץ נפרד (Overview, Heatmap, ExamsTab, SearchTab, Insights, Trends)
  components/          — קומפוננטות משותפות (Header, TabBar, FormatBanner, Badge, Bar…)
  hooks/               — useStats, useProgress, useLabels, useSearchData
  styles/
    theme.js           — FONTS, COLORS_UI, shared style objects (card, inp, clearBtn…)
    colorUtils.js      — Color manipulation helpers
    index.js           — Re-export
  utils/
    exam.js            — Pure utility functions (examMatchesLecturer, buildLecturersList…)
```

### State Management

- **CourseContext** — נתוני הקורס הנוכחי (read-only config). ניגש דרך `useCourse()`.
- **URL params** — כל הפילטרים וה-tab הפעיל. שימוש ב-`useSearchParams` + helper `useParam` ב-CourseApp.
- **localStorage** — progress (done/undone) ו-labels דרך `useProgress` ו-`useLabels`.
- **useState** — state מקומי בלבד שלא צריך להישמר.

**כלל:** לעולם לא לשים state בקומפוננט ילד שמשפיע על הורה — מעלים state ל-CourseApp ומורידים כ-props.

---

## Coding Conventions

### כללי
- **JavaScript בלבד** — אין TypeScript בפרויקט זה.
- **Named exports** מקומפוננטות — `export default function MyComp()`.
- **Barrel files** ב-`components/index.js`, `hooks/index.js`, `tabs/index.js` — מייבאים דרכם.
- **אין הערות** — שמות משמעותיים מסבירים את עצמם. הערה רק כשה-WHY לא ברור.
- **אין console.log** בקוד שנשלח.

### קומפוננטות
- קומפוננט אחד לכל קובץ, שם הקובץ = שם הקומפוננט.
- Props שמורידים ל-tabs: `exams`, `topicHe`, `colorsUI`, `isExcluded`, `studyMode` + handlers.
- `studyProps` (`isDone`, `toggleDone`, `hasLabel`, `toggleLabel`) מורדים רק כש-`studyMode === true` דרך spread: `{...studyProps}`.

### Hooks
- Hook מתחיל ב-`use`, מוגדר בתיקיית `hooks/`, מיוצא מ-`hooks/index.js`.
- Side effects ב-`useEffect` עם cleanup תמיד.
- `useMemo` ו-`useCallback` — רק כשיש חישוב כבד או dependency array שתלויה בהם; לא בכל מקום.

### Utilities
- פונקציות pure בלבד ב-`utils/` — ללא state, ללא side effects.
- מייצאים named exports, לא default.

---

## Styling System

### CSS Custom Properties (theme variables)
מוגדרות ב-`index.css`. **לעולם לא להשתמש בצבעים hardcoded** — רק דרך variables:

```css
/* Light theme (:root) + Dark theme (:root[data-dark]) */
--bg, --card-bg, --border, --dark, --text, --muted, --subdued,
--bar-bg, --row-divider, --hover-bg, --latest-bg,
--done-bg, --done-border, --done-text
```

### theme.js — Shared Style Objects
```js
import { COLORS_UI, FONTS, card, inp, clearBtn, countBadge } from "../styles";
```
- **COLORS_UI** — ניגש ל-CSS variables דרך `var(--name)` (מלבד `primary` ו-`secondary` שהם hardcoded).
- **FONTS** — `FONTS.sans` (Heebo), `FONTS.serif` (Frank Ruhl Libre).
- **card** — base style לכרטיסיות. כשצריך overrides: `{ ...card, padding: 12 }`.
- **inp / clearBtn / countBadge** — base לאלמנטי form.

### Inline Styles vs Classes
- **Inline styles** — לפרמטרים דינמיים (צבע קורס, width %, transitions).
- **CSS classes** (`index.css`) — layout utilities (`flex-center`, `flex-between`), page structure (`.rtl-page`, `.course-page`), responsive.
- **`className="ui-card"`** — כשמשתמשים ב-card בלי overrides.

### Dark Mode
- Toggle דרך `data-dark` attribute על `document.documentElement`.
- לעולם לא `prefers-color-scheme` — רק toggle ידני.
- שמירה ב-localStorage key `"dark"`.

### RTL
- כל הדפים: `direction: rtl`.
- כפתור "חזרה": `←` (ולא `→`) כי RTL הופך את הכיוון הסמנטי.

### Responsive
- Breakpoint יחיד: `640px` — קלאסים ב-`index.css`, לא media queries inline.
- Mobile: עמודה, Desktop: שורה.

---

## URL State

כל פילטר שהמשתמש יכול לשתף = URL param.

```js
// Pattern מ-CourseApp.jsx:
function useParam(params, setParams, key) {
  const value = params.get(key) ?? "";
  const setValue = useCallback(
    (v) => setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (v) next.set(key, v); else next.delete(key);
      return next;
    }, { replace: true }),
    [setParams, key],
  );
  return [value, setValue];
}
```

**חשוב:** כשצריך לעדכן כמה params יחד (כמו tab + filter), לעשות זאת בקריאה אחת ל-`setSearchParams` — שתי קריאות נפרדות מאבדות את הראשונה.

---

## Data Model

```js
// Course
{
  number: "20474",
  name: "אלגברה לינארית",
  shortName: "אלגברה",
}

// Exam
{
  year: 2023,
  moed: "א",          // "א" | "ב" | "ג"
  date: "2023-01-15", // optional
  lecturers: ["שם מרצה"],
  questions: [Question],
}

// Question
{
  topic: "eigenvalues",     // key מ-TOPIC_HE
  chapter: "א",             // "א" | "ב" | "ג"
  type: "proof",            // "proof" | "calc" | "theory"
  text: "...",              // טקסט השאלה (LaTeX OK)
  points: 20,               // optional
}
```

---

## LocalStorage Keys

| Key | ערך | שימוש |
|-----|-----|--------|
| `done-{courseId}` | `{ [questionId]: true }` | סימון שאלות כ"בוצע" |
| `labels-{courseId}` | `{ [questionId]: string }` | תיוג שאלות |
| `"dark"` | `"1"` | מצב כהה |

---

## Performance Patterns

- **`useMemo`** לחישובים יקרים: `displayExams` אחרי פילטר מרצה, `latestExam`, `derivedExamFormat`.
- **`useCallback`** ל-handlers שיורדים ל-tabs: `goToSearch`, `goToTopic`, `clearSearchFilters`.
- **Passive event listeners** לאירועי scroll: `{ passive: true }`.
- **Derived state** — לא לשמור ב-state מה שניתן לחשב מ-state קיים.

---

## Git Workflow

```bash
git checkout -b feature/short-description
# ... פיתוח ...
git add src/specific/file.jsx  # תמיד קבצים ספציפיים, לא git add .
git commit -m "feat: תיאור קצר בעברית או אנגלית"
git push -u origin feature/short-description
```

### Commit Message Format
```
feat:  תכונה חדשה
fix:   תיקון באג
refactor: שינוי מבנה ללא שינוי פונקציונלי
style: שינויי עיצוב בלבד
chore: תחזוקה (deps, config)
```

---

## Commands

```bash
npm run dev      # dev server on http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build locally
npm run deploy   # build + push to gh-pages branch
```

---

## Adding a New Course

1. צור תיקיית קורס ב-`src/courses/[courseId]/`:
   - `index.js` — export `courseData` object עם `COURSE`, `EXAMS`, `TOPIC_HE`, `COLORS`, `CHAPTERS`, `EXCLUDED_TOPICS`, `EXAM_FORMAT`, `TRAPS`, `TREND_FROM_YEAR`.
2. הוסף לרישום ב-`src/courses/index.js`: `COURSE_REGISTRY[courseId] = courseData`.
3. הפרויקט יטפל בשאר אוטומטית (routing, CourseContext, כפתור ב-CoursePicker).

---

## Adding a New Tab

1. צור `src/tabs/MyTab.jsx` — קומפוננט שמקבל props מ-CourseApp.
2. Export מ-`src/tabs/index.js`.
3. הוסף entry ל-`TabBar.jsx`.
4. הוסף `{activeTab === "mytab" && <MyTab ... />}` ב-CourseApp.

---

## Do / Don't

| Do | Don't |
|----|-------|
| השתמש ב-CSS variables לצבעים | צבע hardcoded `#hex` בתוך קומפוננט |
| שים פילטרים ב-URL params | שים פילטרים ב-useState בלבד |
| חשב derived values ב-`useMemo` | שמור derived values ב-`useState` |
| הוצא פונקציות pure ל-`utils/` | לוגיקה עסקית בתוך JSX |
| קומפוננט אחד לקובץ | כמה קומפוננטות exported מאותו קובץ |
| Cleanup ב-`useEffect` (removeEventListener) | `useEffect` ללא cleanup כשיש subscription |
| `useCallback` לhandlers שיורדים ל-tabs | יצירת function חדש בכל render שיורד כ-prop |
| ספציפי `git add src/file.jsx` | `git add .` או `git add -A` |
