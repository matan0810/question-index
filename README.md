# מדד שאלות — Question Index

A Hebrew-language study tool for analyzing university exam questions by topic, year, and format. Supports multiple courses and dark mode.

---

## Running the app

```bash
npm install
npm start        # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run deploy   # build + publish to GitHub Pages
```

---

## App overview

The home page lists all available courses. Clicking a course opens five tabs:

| Tab | What it shows |
|-----|---------------|
| **סקירה** (Overview) | Per-topic question counts, sorted by frequency |
| **מפת חום** (Heatmap) | Topic × exam year grid |
| **מבחנים** (Exams) | Full question list per exam, filterable |
| **חיפוש** (Search) | Cross-exam search by topic, type, year, etc. |
| **תובנות** (Insights) | Trends, recurring traps, and format info |

Dark mode is toggled with the **☽ לילה / ☼ יום** button in the top-right corner on every page. The preference is saved in `localStorage`.

**Study mode** (toggled from the header) adds per-question progress tracking — mark questions as done or tag them ★ קשה / ◎ להמשך. Progress and labels are saved per course in `localStorage`.

In Search, questions whose topics are no longer in the syllabus (**לא בחומר**) are hidden by default; use the **לא בחומר** toggle to show them. Both the Exams and Search lists default to newest-first.

---

## Adding a new course

Each course lives in its own folder under `src/courses/<course-id>/`. Copy an existing course (e.g. `algebra2`) as a starting point.

### 1. Create the folder structure

```
src/courses/<course-id>/
  config.js   ← course metadata, chapters, exam format, traps
  topics.js   ← topic keys → Hebrew labels + per-topic colors
  exams.js    ← array of exam objects with questions
```

### 2. `config.js`

```js
export const COURSE = {
  teacher:    "שם המרצה",
  name:       "שם הקורס המלא",
  shortName:  "שם קצר",
  number:     "12345",           // course number (used as unique ID)
  university: "שם האוניברסיטה",
};

export const CHAPTERS = [
  { key: "א", label: "פרק א — תיאור", color: "#c1440e", chipBg: "#fef1e6" },
  { key: "ב", label: "פרק ב — תיאור", color: "#2b4162", chipBg: "#e8eef6" },
];

export const EXCLUDED_TOPICS = new Set(["topic_key_not_in_syllabus"]);

export const TREND_FROM_YEAR = 2020;   // year from which to calculate trend

export const TRAPS = [
  { t: "נוסחה או טענה", n: "הקשר — מתי/כמה פעמים הופיע" },
];

export const QUESTION_TYPES = {
  "הוכחה":  { label: "הוכחה",  kind: "proof" },
  "חישוב":  { label: "חישוב",  kind: "calc"  },
  "אמת/שקר": { label: "אמת/שקר", kind: "ts"  },
  "מעורב":  { label: "מעורב",  kind: "mixed" },
};

export const EXAM_FORMAT = {
  chapters: [
    { key: "א", points: 50, description: "תיאור החלק" },
    { key: "ב", points: 50, description: "תיאור החלק" },
  ],
  badges: [
    { label: "100 נק׳", variant: "accent" },
    { label: "חומר סגור", variant: "neutral" },
  ],
};
```

### 3. `topics.js`

```js
export const TOPIC_HE = {
  limits:      "גבולות",
  continuity:  "רציפות",
  // ... one entry per topic key used in exams.js
};

// Heatmap intensity color per topic (optional — defaults to course primary color)
export const COLORS = {
  limits:     "#c1440e",
  continuity: "#2b4162",
};

export function isExcluded(topicKey) {
  return EXCLUDED_TOPICS.has(topicKey);
}
```

> Import `EXCLUDED_TOPICS` from `./config` inside `topics.js`.

### 4. `exams.js`

```js
export const EXAMS = [
  {
    code:      "12345_2024_א",  // unique string
    year:      2024,            // calendar year
    moed:      "א",             // "א" | "ב" | "ג"
    semester:  "summer",        // "winter" | "summer" — a calendar year can hold both
    date:      "15.01.24",      // "dd.mm.yy", optional; drives chronological sort
    lecturers: ["שם המרצה"],    // array, optional
    questions: [
      {
        id:      "1",            // stable id within the exam
        number:  1,              // display number; falls back to digits in id
        chapter: "א",
        topic:   "limits",       // primary topic — must match a key in TOPIC_HE
        topics:  ["continuity"], // optional secondary topics (also counted)
        type:    "הוכחה",        // must match a key in QUESTION_TYPES
        points:  20,             // optional
        summary: "תיאור קצר של השאלה",
        subparts: [              // optional; each subpart's topic is counted too
          { id: "1א", topic: "limits", summary: "סעיף א" },
        ],
      },
    ],
  },
];
```

> A question is counted under **every** topic it touches — its primary `topic`,
> any `topics: []`, and each subpart's `topic` — across stats, trends, heatmap,
> and search. Topics declared earlier in `TOPIC_HE` sort earlier (it's read in
> syllabus order), so list topic keys in the order they're taught.

### 5. Register the course in `src/courses/index.js`

```js
import {
  COURSE as myCourse,
  CHAPTERS as myChapters,
  EXCLUDED_TOPICS as myExcluded,
  TREND_FROM_YEAR as myTrendYear,
  TRAPS as myTraps,
  EXAM_FORMAT as myFormat,
  QUESTION_TYPES as myTypes,
} from "./<course-id>/config";
import { TOPIC_HE as myTopicHe, COLORS as myColors, isExcluded as myIsExcluded } from "./<course-id>/topics";
import { EXAMS as myExams } from "./<course-id>/exams";

export const COURSE_REGISTRY = {
  // ... existing courses ...
  "<course-id>": {
    id: "<course-id>",
    COURSE: myCourse,
    CHAPTERS: myChapters,
    EXCLUDED_TOPICS: myExcluded,
    TREND_FROM_YEAR: myTrendYear,
    TRAPS: myTraps,
    EXAM_FORMAT: myFormat,
    QUESTION_TYPES: myTypes,
    TOPIC_HE: myTopicHe,
    COLORS: myColors,
    isExcluded: myIsExcluded,
    EXAMS: myExams,
  },
};

export const COURSE_LIST = [
  // ... existing entries ...
  COURSE_REGISTRY["<course-id>"],
];
```

The course will now appear on the home page automatically.
