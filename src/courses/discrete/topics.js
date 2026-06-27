import { EXCLUDED_TOPICS, CHAPTERS } from "./config";
export { EXCLUDED_TOPICS };
export const isExcluded = (topic) => EXCLUDED_TOPICS.has(topic);

// Ordered by the official 80181 syllabus (11 sections). Earlier keys sort
// earlier in stats, trends, and search. Topics that show up in old exams but
// are no longer in the syllabus live in the EXCLUDED block at the end.
export const TOPIC_HE = {
  // ── 1. קבוצות ולוגיקה ─────────────────────────────────────
  propositional_logic: "לוגיקה: קשרים וכמתים",
  sets: "קבוצות ופעולות",
  set_identities: "זהויות קבוצות",
  power_set: "קבוצת החזקה",

  // ── 2. פונקציות ותמורות ───────────────────────────────────
  functions: "פונקציות",
  injection_surjection: 'חח"ע ועל',
  invertible_function: "פונקציות הפיכות",
  function_composition: "הרכבת פונקציות",
  permutations: "תמורות",

  // ── 3. יחסים ──────────────────────────────────────────────
  relations: "יחסים ותכונותיהם",
  equivalence_relation: "יחסי שקילות",
  partial_order: "יחסי סדר",

  // ── 4. בעיות מנייה ────────────────────────────────────────
  counting_basic: "כללי הסכום והמכפלה",
  permutations_combinations: "צירופים ותמורות",
  permutations_with_repetition: "תמורות וצירופים עם חזרות",
  fourth_problem: "הבעיה הרביעית (חלוקות)",

  // ── 5. מקדם בינומי, בינום ומולטינום ───────────────────────
  binomial: "משולש פסקל והמקדם הבינומי",
  combinatorial_proof: "הוכחות קומבינטוריות",
  multinomial: "מולטינום",

  // ── 6. עקרון השיקוף ומספרי קטלן ───────────────────────────
  reflection_principle: "עקרון השיקוף",
  lattice_paths: "מסלולים בסריג ובעיית ההצבעה",
  catalan: "מספרי קטלן",

  // ── 7. הכלה והדחה ─────────────────────────────────────────
  inclusion_exclusion: "עקרון ההכלה וההדחה",
  derangement: "אי-סדרים (derangements)",

  // ── 8. שובך היונים ומשפט ארדש-סקרש ────────────────────────
  pigeonhole: "עקרון שובך היונים",
  erdos_szekeres: "משפט ארדש-סקרש",

  // ── 9. אינדוקציה ורקורסיה ─────────────────────────────────
  induction: "אינדוקציה מלאה",
  recurrence: "רקורסיה ונוסחאות נסיגה",
  hanoi: "מגדלי הנוי",
  fibonacci: "מספרי פיבונאצ'י",

  // ── 10. עוצמות ────────────────────────────────────────────
  cardinality: "עוצמות",
  countable: "קבוצות בנות מנייה",
  cantor_diagonal: "האלכסון של קנטור",

  // ── 11. תורת הגרפים ───────────────────────────────────────
  graph_basic: "גרפים: יסודות",
  degree_sequence: "דרגות וסדרת דרגות",
  connectivity: "רכיבי קשירות",
  trees: "עצים",
  prufer_sequence: "רצף פרופר ומנייה עצים",
  bipartite: "גרפים דו-צדדיים",
  planar_graph: "גרפים מישוריים",
  euler_formula: "נוסחת אוילר ופאונים",
  euler_path: "מעגלי ומסילות אוילר",
  hamilton_path: "מעגלי המילטון",
  matching: "זיווגים בגרפים",
  halls_theorem: "משפט הול",
  ramsey: "תורת רמזי",
  graph_coloring: "צביעת גרפים",

  // ── נושאים שאינם בסילבוס הנוכחי (EXCLUDED) ─────────────────
  divisibility: "חלוקה ומחלק משותף",
  divisors_count: "מספר וסכום מחלקים",
  euler_phi: "פונקציית אוילר φ ומספרים זרים",
  modular_arithmetic: "חשבון מודולרי",
  generating_functions: "פונקציות יוצרות",
  stable_matching: "שידוכים יציבים",
};

// Heatmap palette: per-chapter colors first, then a shared fallback palette.
export const COLORS = [
  CHAPTERS[0].chipColor ?? CHAPTERS[0].color,
  CHAPTERS[1].chipColor ?? CHAPTERS[1].color,
  CHAPTERS[2].chipColor ?? CHAPTERS[2].color,
  "#d4a017",
  "#8a5aab",
  "#c05050",
  "#a07850",
  "#3a9696",
  "#3a7aac",
  "#9a50c0",
  "#8e44ad",
  "#16a085",
];
