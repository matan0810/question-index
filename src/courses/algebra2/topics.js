import { EXCLUDED_TOPICS, CHAPTERS } from "./config";
export { EXCLUDED_TOPICS };
export const isExcluded = (topic) => EXCLUDED_TOPICS.has(topic);

export const TOPIC_HE = {
  // ── מבוא ויסודות (פולינומים, דטרמיננטות ודמיון מטריצות) ──
  determinant_basics: "דטרמיננטה",
  trace_basics: "עקבה",
  matrix_similarity: "דמיון מטריצות",

  // ── פרק 2: אופרטורים, ערכים עצמיים ולכסינות ──────────────
  invariant_subspace: "תת-מרחב אינווריאנטי",
  cyclic_subspace: "תת-מרחב ציקלי",
  minimal_polynomial_vec: "פולינום מינימלי של וקטור",
  eigenvalue_definition: "ערך עצמי: הגדרה",
  eigenvectors_independent: 'ו"ע לע"ע שונים — בת"ל',
  char_polynomial: "פולינום אופייני",
  cayley_hamilton: "קיילי-המילטון",
  minimal_polynomial: "פולינום מינימלי של אופרטור",
  alg_geo_multiplicity: "ריבוי אלגברי וגאומטרי",
  diagonalization: "לכסינות (תנאים)",
  diagonalization_compute: "לכסון: חישוב P, D",
  triangulation: "משולשון (מעל C)",
  primary_decomposition: "פירוק ראשוני",

  // ── פרק 3: אופרטורים נילפוטנטיים וצורת ז'ורדן ─────────────
  nilpotent_basic: "אופרטור נילפוטנטי: הגדרה",
  nilpotent_classify: "סיווג נילפוטנטיות",
  jordan_chain: "שרשראות ז'ורדן",
  generalized_eigenspace: "מרחב עצמי מוכלל",
  jordan_existence: "קיום צורת ז'ורדן",
  jordan_form: "צורת ז'ורדן: מציאה ובסיס",

  // ── פרק 4: מרחבי מכפלה פנימית ואורתוגונליות ──────────────
  inner_product_axioms: 'מ"פ פנימית: אקסיומות',
  norm_basics: "נורמה ופיתגורס",
  triangle_inequality: "אי-שוויון המשולש",
  cauchy_schwarz: "אי-שוויון קושי-שוורץ",
  orthogonal_complement: "משלים אורתוגונלי",
  orthonormal_basis: "בסיס אורתונורמלי",
  orthogonal_projection: "היטל אורתוגונלי ומרחק",
  gram_schmidt: "תהליך גרם-שמידט",

  // ── פרק 5: אופרטורים במרחבי מכפלה פנימית ──────────────────
  riesz_representation: "משפט רייס",
  adjoint_operator: "אופרטור צמוד T*",
  self_adjoint: "אופרטור צמוד לעצמו",
  self_adjoint_invariant: "T צמוד לעצמו, W אינווריאנטי",
  orthogonal_operator: "אופרטור אורתוגונלי",
  spectral_theorem_real: "משפט ספקטרלי (ממשי)",
  unitary_operator: "אופרטור אוניטרי",
  normal_operator: "אופרטור נורמלי",
  unitary_diagonalization: "לכסון אוניטרי",
  spectral_theorem_complex: "משפט ספקטרלי (מרוכב)",

  // ── נושאים שאינם בסילבוס הנוכחי (EXCLUDED) ────────────────
  bilinear_form: "תבנית בילינארית",
  quadratic_form: "תבנית ריבועית",
  dual_space: "מרחב דואלי",
  sylvester_inertia: "משפט ההתמדה של סילבסטר",
  volume_function: "פונקציית נפח",
  field_char: "שדה במציין שונה מ-2",
};

export const COLORS = [
  CHAPTERS[0].chipColor ?? CHAPTERS[0].color,
  CHAPTERS[1].chipColor ?? CHAPTERS[1].color,
  CHAPTERS[2].chipColor ?? CHAPTERS[2].color,
  "#d4a017", // gold
  "#8a5aab", // purple
  "#c05050", // red
  "#a07850", // brown
  "#3a9696", // teal
  "#3a7aac", // blue
  "#9a50c0", // violet
  "#8e44ad", // bright purple
  "#16a085", // bright teal
];
