// ─────────────────────────────────────────────────────────────────────
//  src/courses/discrete/config.js
//  Course-level metadata: identity, chapters, excluded topics, traps,
//  question types, and the latest exam format.
// ─────────────────────────────────────────────────────────────────────

export const COURSE = {
  name: "מתמטיקה דיסקרטית",
  shortName: "דיסקרטית",
  number: "80181",
  university: "האוניברסיטה העברית בירושלים",
};

// Course identity color = CHAPTERS[0].color (green here) — distinct from
// infi2 (orange) and algebra2 (navy). Each new course should get its own hue.
export const CHAPTERS = [
  {
    key: "א",
    label: "פרק א — לוגיקה, קבוצות, יחסים, פונקציות ועוצמות",
    color: "#2f7d4f",
    chipColor: "#3a9d63",
    chipBg: "#2f7d4f18",
  },
  {
    key: "ב",
    label: "פרק ב — קומבינטוריקה, מנייה ונסיגות",
    color: "#c1440e",
    chipColor: "#c1440e",
    chipBg: "#c1440e18",
  },
  {
    key: "ג",
    label: "פרק ג — תורת הגרפים",
    color: "#2b4162",
    chipColor: "#4a7aab",
    chipBg: "#2b416218",
  },
];

// Topics present in old exams but no longer in the current syllabus.
// Recorded in the data but excluded from trend graphs.
export const EXCLUDED_TOPICS = new Set([
  "divisibility", // תורת המספרים – אינה בסילבוס
  "divisors_count", // מספר/סכום מחלקים – אינה בסילבוס
  "euler_phi", // פונקציית אוילר φ – אינה בסילבוס
  "modular_arithmetic", // חשבון מודולרי – אינה בסילבוס
  "generating_functions", // פונקציות יוצרות – אינה בסילבוס
  "stable_matching", // שידוכים יציבים – אינה בסילבוס
]);

export const TREND_FROM_YEAR = 2020;

export const TRAPS = [
  {
    t: "זהויות קבוצות, למשל $(A\\setminus B)\\cup(B\\setminus A)=(A\\cup B)\\setminus(A\\cap B)$",
    n: "הופיעה כשאלת חובה בפרק הראשון; מוכיחים דו-כיוונית או דרך פונקציה מציינת",
  },
  {
    t: "זהות פסקל $\\binom{n}{k-1}+\\binom{n}{k}=\\binom{n+1}{k}$",
    n: "שאלת הוכחה חוזרת — לדעת גם הוכחה קומבינטורית וגם אלגברית",
  },
  {
    t: "גרף עם מעגל אוילר ובלי מסילת המילטון (ולהפך)",
    n: "שאלת ציור/דוגמה נגדית חוזרת בפרק הגרפים",
  },
  {
    t: "מספר העצים על $\\{1,\\ldots,n\\}$ שבהם $\\{1,2\\}$ היא צלע, או עם דרגות נתונות",
    n: "חזר ב-2008 ב' (q9), 2008 ג' (q5,q6); נוסחת פרופר — עץ עם רצף דרגות $(d_i)$: $\\binom{n-2}{d_1-1,\\ldots,d_n-1}$",
  },
  {
    t: "הושבת גברים ונשים בשורה/סביב שולחן כך שאין שני בני אותו מין סמוכים",
    n: "חזר ב-2007 א' (q6), 2007 ב' (q3), 2008 ג' (q8,q9), 2009 א' (q8); להיזהר בין שורה למעגל (סיבובים)",
  },
  {
    t: "מספרי קטלן בתחפושת: טריאנגולציות, מסלולי Dyck / בעיית ההצבעה, נוסחת נסיגה",
    n: "חזר ב-2006 א' (q13), 2007 א' (q11), 2007 ב' (q11), 2008 ב' (q14), 2008 ג' (q11) ובכמעט כל מועד מ-2013 עד 2025; $C_n=\\frac{1}{n+1}\\binom{2n}{n}$, עקרון השיקוף",
  },
  {
    t: "סכום על $S_n$ של $\\binom{\\mathrm{fix}(\\sigma)}{k}$ (ספירת קבוצות נקודות שבת)",
    n: "חזר ב-2007 ב' (q8, $k=2$), 2008 ג' (q10, $k=4$); ספירה כפולה: $\\sum_\\sigma\\binom{\\mathrm{fix}(\\sigma)}{k}=\\binom{n}{k}(n-k)!$",
  },
  {
    t: "קיום תת-סדרה מונוטונית (ארדש-סקרש): סדרה באורך $>n^2$ או בנייה באורך $n^2$",
    n: "חזר ב-2006 א' (q15), 2007 ב' (q10), 2009 א' (q5) ובבחינות 2013–2025; סדרה באורך $n^2{+}1$ מכריחה תת-סדרה מונוטונית באורך $n{+}1$",
  },
  {
    t: "תורת רמזי — $R(3,3)=6$ וצביעת צלעות $K_n$",
    n: "לא מספיק להוכיח ש-$K_6$ מכיל משולש מונוכרומטי; חייבים גם להוכיח צמידות — שב-$K_5$ קיימת צביעה ב-2 צבעים ללא משולש ($C_5$ אדום, משלימו כחול). הנפוץ ביותר בגרפים — חזר כמעט בכל בחינה מ-2006 עד 2025",
  },
  {
    t: "משפט הול: $|N(S)|\\ge|S|$ לכל $S\\subseteq A$, לא רק לאיברים בודדים",
    n: "הוכחת היעדר שידוך: מצאו $S$ עם $|N(S)|<|S|$ (לרוב $|S|=2$ מספיק). הוכחת קיום שידוך: אינדוקציה על $|A|$ עם הבחנה בין המקרה שבו $|N(S)|>|S|$ לכל $S\\subsetneq A$ לבין המקרה הפוך",
  },
];

// kind values: "proof" | "theorem" | "ts" | "calc" | "mixed"
export const QUESTION_TYPES = {
  proof_theorem: { label: "הוכחת משפט", kind: "theorem" },
  proof_short: { label: "הוכחה", kind: "proof" },
  compute: { label: "חישוב", kind: "calc" },
  recurrence: { label: "נסיגה", kind: "calc" },
  counterexample: { label: "הוכח/הפרך", kind: "ts" },
  true_false: { label: "אמת/שקר", kind: "ts" },
  multiple_choice: { label: "רב-ברירה", kind: "ts" },
};

// EXAM_FORMAT — the format panel shown for the latest exam.
// latestSession/latestDate/lecturer may be overridden at runtime from the
// actual latest exam; only `chapters` and `badges` are used as written.
export const EXAM_FORMAT = {
  latestSession: "תשפ\"ה מועד ב'",
  latestDate: "20.08.25",
  chapters: [
    { key: "א", points: 40, description: "קבוצות, יחסים, פונקציות, עוצמות" },
    {
      key: "ב",
      points: 47,
      description: "קומבינטוריקה, ספירה, בינום, נסיגות, מספרים שלמים",
    },
    { key: "ג", points: 13, description: "תורת הגרפים" },
  ],
  badges: [
    { label: "9 שאלות, ענו על 8", variant: "accent" },
    { label: "13 נק' לשאלה · מקס' 100", variant: "accent" },
    { label: "מחשבון בלבד", variant: "neutral" },
    { label: "3 שעות", variant: "neutral" },
  ],
};
