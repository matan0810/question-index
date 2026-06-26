// ─────────────────────────────────────────────────────────────────────
//  src/courses/discrete/config.js
//  Course-level metadata: identity, chapters, excluded topics, traps,
//  question types, and the latest exam format.
// ─────────────────────────────────────────────────────────────────────

export const COURSE = {
  teacher:    'ד"ר יובל פלד (תשפ"ה), פרופ\' רות לורנס-נאימרק ופרופ\' מיכה פרלס (מוקדמים)',
  name:       'מתמטיקה דיסקרטית',
  shortName:  'דיסקרטית',
  number:     '80181',
  university: 'האוניברסיטה העברית בירושלים',
};

// Course identity color = CHAPTERS[0].color (green here) — distinct from
// infi2 (orange) and algebra2 (navy). Each new course should get its own hue.
export const CHAPTERS = [
  { key: 'א', label: 'פרק א — לוגיקה, קבוצות, יחסים, פונקציות ועוצמות', color: '#2f7d4f', chipColor: '#3a9d63', chipBg: '#2f7d4f18' },
  { key: 'ב', label: 'פרק ב — קומבינטוריקה, מנייה ונסיגות', color: '#c1440e', chipColor: '#c1440e', chipBg: '#c1440e18' },
  { key: 'ג', label: 'פרק ג — תורת הגרפים', color: '#2b4162', chipColor: '#4a7aab', chipBg: '#2b416218' },
];

// Topics present in old exams but no longer in the current syllabus.
// Recorded in the data but excluded from trend graphs.
export const EXCLUDED_TOPICS = new Set([
  "divisibility",       // תורת המספרים – אינה בסילבוס
  "divisors_count",     // מספר/סכום מחלקים – אינה בסילבוס
  "euler_phi",          // פונקציית אוילר φ – אינה בסילבוס
  "modular_arithmetic", // חשבון מודולרי – אינה בסילבוס
  "generating_functions", // פונקציות יוצרות – אינה בסילבוס
  "ramsey",             // תורת רמזי (מעבר לארדש-סקרש) – אינה בסילבוס
  "graph_coloring",     // צביעת גרפים / מספר כרומטי – אינה בסילבוס
  "stable_matching",    // שידוכים יציבים – אינה בסילבוס
]);

export const TREND_FROM_YEAR = 2016;

export const TRAPS = [
  { t: 'זהויות קבוצות, למשל $(A\\setminus B)\\cup(B\\setminus A)=(A\\cup B)\\setminus(A\\cap B)$', n: 'הופיעה כשאלת חובה בפרק הראשון; מוכיחים דו-כיוונית או דרך פונקציה מציינת' },
  { t: 'זהות פסקל $\\binom{n}{k-1}+\\binom{n}{k}=\\binom{n+1}{k}$', n: 'שאלת הוכחה חוזרת — לדעת גם הוכחה קומבינטורית וגם אלגברית' },
  { t: 'גרף עם מעגל אוילר ובלי מסילת המילטון (ולהפך)', n: 'שאלת ציור/דוגמה נגדית חוזרת בפרק הגרפים' },
];

// kind values: "proof" | "theorem" | "ts" | "calc" | "mixed"
export const QUESTION_TYPES = {
  proof_theorem: { label: 'הוכחת משפט', kind: 'theorem' },
  proof_short: { label: 'הוכחה', kind: 'proof' },
  compute: { label: 'חישוב', kind: 'calc' },
  counterexample: { label: 'הוכח/הפרך', kind: 'ts' },
  true_false: { label: 'אמת/שקר', kind: 'ts' },
  multiple_choice: { label: 'רב-ברירה', kind: 'ts' },
};

// EXAM_FORMAT — the format panel shown for the latest exam.
// latestSession/latestDate/lecturer may be overridden at runtime from the
// actual latest exam; only `chapters` and `badges` are used as written.
export const EXAM_FORMAT = {
  latestSession: 'תשפ"ה מועד ב\'',
  latestDate: '20.08.25',
  chapters: [
    { key: 'א', points: 40, description: 'קבוצות, יחסים, פונקציות, עוצמות' },
    { key: 'ב', points: 47, description: 'קומבינטוריקה, ספירה, בינום, נסיגות, מספרים שלמים' },
    { key: 'ג', points: 13, description: 'תורת הגרפים' },
  ],
  badges: [
    { label: '9 שאלות, ענו על 8', variant: 'accent' },
    { label: "13 נק' לשאלה · מקס' 100", variant: 'accent' },
    { label: 'מחשבון בלבד', variant: 'neutral' },
    { label: '3 שעות', variant: 'neutral' },
  ],
};
