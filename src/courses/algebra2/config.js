// ─────────────────────────────────────────────────────────────────────
//  src/courses/algebra2/config.js
//  Course-level metadata: course identity, chapter mapping,
//  excluded topics, traps, latest exam format.
// ─────────────────────────────────────────────────────────────────────

export const COURSE = {
  teacher: 'ד"ר שי אברה (תשפ"ה–תשפ"ו), אלכס גורביץ\' (קיץ תשפ"ד)',
  name: "אלגברה לינארית 2",
  shortName: "אלגברה 2",
  number: "80135",
  university: "האוניברסיטה העברית בירושלים",
};

// Three chapters mirror the four chapters of the syllabus in the project files:
// chapters 1–2 (פולינומים + ערכים עצמיים) are taught and tested together,
// chapter 3 (ז'ורדן) is its own block,
// chapters 4–5 (מ\"מ פנימית + אופרטורים) are tested together.
export const CHAPTERS = [
  {
    key: "א",
    label: 'פרק א — פולינומים, ע"ע, לכסינות (פרקים 1+2)',
    color: "#2b4162",
    chipColor: "#4a7aab",
    chipBg: "#2b416218",
  },
  {
    key: "ב",
    label: "פרק ב — אופרטורים נילפוטנטיים וצורת ז'ורדן (פרק 3)",
    color: "#c1440e",
    chipColor: "#c1440e",
    chipBg: "#c1440e18",
  },
  {
    key: "ג",
    label: "פרק ג — מכפלה פנימית ואופרטורים (פרקים 4+5)",
    color: "#3a5a40",
    chipColor: "#5a8a5a",
    chipBg: "#3a5a4018",
  },
];

// Topics that appear in old exams but are no longer in the current syllabus.
// Excluded from trend graphs but still recorded in the data.
export const EXCLUDED_TOPICS = new Set([
  "bilinear_form", // תבנית בילינארית – הוסר מהסילבוס
  "dual_space", // מרחב דואלי / פונקציונלים – הוסר
  "volume_function", // פונקציית נפח – הוסר
  "sylvester_inertia", // משפט ההתמדה של סילבסטר / סיגנטורה – הוסר
  "quadratic_form", // תבנית ריבועית – הוסר/הוקטן
  "field_char", // שדה במציין שונה מ-2 – שולי
]);

export const TREND_FROM_YEAR = 2016;

export const TRAPS = [
  {
    t: "שאלת חובה: $\\min_{e_1}(A)$, בסיס ז'ורדן, ותת-מרחב מקסימלי שצמצום $A$ אליו לכסין",
    n: "שאלת חובה (16 נק') בכל מבחני סמסטר א' מ-2022 ואילך (תשפ\"ב חורף, תשפ\"ג חורף); הסעיף השלישי בעיקר טריקי",
  },
  {
    t: "פירוק $V=\\ker P(f)\\oplus\\ker Q(f)$ כאשר $\\gcd(P,Q)=1$ ו-$P(f)Q(f)=0$",
    n: "הופיעה ב-2019 קיץ, 2022 חורף, 2023, 2023 חורף ב'; הוכחה דרך זהות בזו ($up+vq=1$); אדפטציה של משפט הפירוק הראשוני",
  },
  {
    t: '$\\lambda$ ע"ע של $T$ ↔ $\\ker(\\lambda I-T)\\neq\\{0\\}$',
    n: "וריאציות הופיעו ב-2014 ב' (q7), 2019 ב', 2011, 2010; הוכחה דו-כיוונית",
  },
  {
    t: "$T$ צמוד לעצמו, $W$ $T$-אינווריאנטי ⟹ $W^\\perp$ אינווריאנטי",
    n: 'תשפ"ה, חורף 2018; ב-תשע"ה זו הייתה Q1 חובה (16 נק\'); ההוכחה דרך $T^*=T$',
  },
  {
    t: "אי-שוויונות אלגבריים שמוכחים דרך קושי-שוורץ / גרם",
    n: "קיץ 2024 (3.9.24, q5: $x^2+xy+y^2\\leq\\sqrt{(2x^2+y^2)(x^2+2y^2)}$), חורף 2025 א' ($16/(a+b+c+d)\\leq 1/a+1/b+1/c+1/d$), קיץ 2024 (26.5.24, q3: $(a^2b+\\ldots)(ab^2+\\ldots)\\geq 9a^2b^2c^2$), חורף 2025 ב' (19.3.25) ו-2026 ב' ($f(x)=(\\sum\\sqrt{k}x_k)^2/\\sum x_k^2\\leq 15$); הכלי: $|\\langle u,v\\rangle|\\leq\\|u\\|\\cdot\\|v\\|$",
  },
  {
    t: "$T$ אופרטור אורתוגונלי ⟺ $\\|Tv\\|=\\|v\\|$ לכל $v$",
    n: 'קיץ 2024 (3.9.24, q4: ממפה ו"י לו"י ⟹ אורתוגונלי); תשפ"ד מועד א\' (9.4.24, q1); תשפ"ה ב\' (19.3.25) ו-תשפ"ו ב\' (גרסת ממד אי-זוגי + $\\det=1$ ⟹ $\\exists v$: $Tv=v$); קיץ 2018, חורף 2020',
  },
  {
    t: "$T$ נורמלי ⟺ קיים בסיס אורתונורמלי שמלכסן את $T$ (מעל $\\mathbb{C}$)",
    n: "הופיעה כשאלת הוכחה ב-2010 א', 2010 ב', 2011 א', 2011 ב'; כיום מתועדפת כ-spectral_theorem ולא מבוקשת ישירות",
  },
];

// Maps question type keys → { label: Hebrew display string, kind: style variant }
// kind values: "proof" | "ts" | "calc" | "mixed"
export const QUESTION_TYPES = {
  proof_theorem:    { label: "הוכחת משפט",   kind: "proof" },
  proof_short:      { label: "הוכחה",         kind: "proof" },
  compute:          { label: "חישוב",          kind: "calc"  },
  true_false:       { label: "אמת/שקר",       kind: "ts"    },
  counterexample:   { label: "הוכח/הפרך",     kind: "ts"    },
  definition_apply: { label: "הגדרה ויישום",  kind: "calc"  },
};

// EXAM_FORMAT — the format panel shown for the latest exam.
// latestSession/latestDate/lecturer are overridden at runtime in CourseApp from
// the actual latest exam; only `chapters` and `badges` below are used as written.
export const EXAM_FORMAT = {
  latestSession: "תשפ\"ו מועד ב'",
  latestDate: "19.03.26",
  chapters: [
    {
      key: "א",
      points: 40,
      description: "פולינום אופייני, קיילי-המילטון, לכסינות, ע\"ע ומ\"ע",
    },
    { key: "ב", points: 15, description: "צורת ז'ורדן, אופרטורים נילפוטנטיים" },
    {
      key: "ג",
      points: 45,
      description: "מכפלה פנימית, אורתוגונליות, קושי-שוורץ, היטל, צמוד לעצמו, אורתוגונלי",
    },
  ],
  badges: [
    { label: "10 שאלות, ענו על 7", variant: "accent" },
    { label: "מקסימום 100 נקודות", variant: "accent" },
    { label: "ללא חומר עזר", variant: "neutral" },
    { label: "3 שעות", variant: "neutral" },
  ],
};
