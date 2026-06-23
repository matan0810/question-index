export const COURSE = {
  teacher:    "פרופ׳ יורם לסט",
  name:       "חשבון אינפיניטסימלי 2",
  shortName:  "אינפי 2",
  number:     "80132",
  university: "האוניברסיטה העברית בירושלים",
};

export const CHAPTERS = [
  { key: "א", label: "פרק א — הוכחות",       color: "#c1440e", chipColor: "#c1440e", chipBg: "#c1440e18" },
  { key: "ב", label: "פרק ב — חישוב והוכחה", color: "#2b4162", chipColor: "#4a7aab", chipBg: "#2b416218" },
  { key: "ג", label: "פרק ג — אמת/שקר",      color: "#3a5a40", chipColor: "#5a8a5a", chipBg: "#3a5a4018" },
];

export const EXCLUDED_TOPICS = new Set(["multivariable"]);

export const TREND_FROM_YEAR = 2021;

export const TRAPS = [
  {
    t: '$f_n \\to f$ במ"ש $\\Rightarrow$ $f$ רציפה',
    n: "חזר 5 פעמים כולל 2026 — חובה מוחלטת בפרק א׳",
  },
  {
    t: "$\\int x^\\alpha \\sin/\\cos(x^\\beta)\\,dx$",
    n: "$\\alpha > -|\\beta| - 1$ מתכנס — לדעת בעל פה",
  },
  {
    t: "$\\limsup \\leq M \\Rightarrow \\exists N\\,\\forall n>N\\; a_n \\leq M$",
    n: "2018, 2019, 2021, 2026 — אותה שאלה",
  },
  {
    t: "פונקציית רימן $f(p/q)=1/q$",
    n: "2017, 2018, 2022, 2026 — תמיד אינטגרבילית",
  },
  {
    t: "$\\sum(n+1)a_{n+1}x^n$, $\\sum a_n R^n$ עם $R>0$",
    n: "2018, 2021, 2022, 2023, 2026 — כמעט זהה",
  },
];

// Maps question type keys → { label: Hebrew display string, kind: style variant }
// kind values: "proof" | "theorem" | "ts" | "calc" | "mixed"
export const QUESTION_TYPES = {
  "הוכחה":        { label: "הוכחה",        kind: "proof" },
  "חישוב":        { label: "חישוב",         kind: "calc"  },
  "אמת/שקר":     { label: "אמת/שקר",       kind: "ts"    },
  "חישוב+הוכחה": { label: "חישוב+הוכחה",   kind: "calc"  },
};

export const EXAM_FORMAT = {
  latestSession: "מועד א׳ תשפ״ו",
  latestDate:    "02.02.26",
  chapters: [
    { key: "א", points: 26, description: "2 שאלות הוכחה, בחר 1" },
    { key: "ב", points: 26, description: "2 שאלות חישוב+הוכחה, בחר 1" },
    { key: "ג", points: 50, description: "10 שאלות × 5 נק׳", warning: "פסוק שקרי = 0 על כל השאלה!" },
  ],
  badges: [
    { label: "102 נק׳ אפשריות", variant: "accent" },
    { label: "מקסימום 100",     variant: "accent" },
    { label: "חומר סגור",       variant: "neutral" },
    { label: "3 שעות",          variant: "neutral" },
  ],
};
