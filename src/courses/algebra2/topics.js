// ─────────────────────────────────────────────────────────────────────
//  src/courses/algebra2/topics.js
//  Topic vocabulary used by every question in exams.js.
//  Keys are snake_case and stable across all years.
// ─────────────────────────────────────────────────────────────────────

import { EXCLUDED_TOPICS, CHAPTERS } from "./config";
export { EXCLUDED_TOPICS };
export const isExcluded = (topic) => EXCLUDED_TOPICS.has(topic);

export const TOPIC_HE = {
  // ── פרק א: פולינומים, ערכים עצמיים, לכסינות ──────────────────
  eigenvalue_definition:    "ערך עצמי: הגדרה",
  eigenvectors_independent: 'ו"ע לע"ע שונים — בת"ל',
  diagonalization:          "לכסינות (תנאים)",
  diagonalization_compute:  "לכסון: חישוב P, D",
  char_polynomial:          "פולינום אופייני",
  minimal_polynomial:       "פולינום מינימלי של אופרטור",
  minimal_polynomial_vec:   "פולינום מינימלי של וקטור",
  cayley_hamilton:          "קיילי-המילטון",
  primary_decomposition:    "פירוק ראשוני",
  cyclic_subspace:          "תת-מרחב ציקלי",
  invariant_subspace:       "תת-מרחב אינווריאנטי",
  alg_geo_multiplicity:     "ריבוי אלגברי וגאומטרי",
  matrix_similarity:        "דמיון מטריצות",
  triangulation:            "משולשון (מעל C)",
  trace_basics:             "עקבה",
  determinant_basics:       "דטרמיננטה",

  // ── פרק ב: נילפוטנטיים וצורת ז'ורדן ──────────────────────────
  jordan_form:              "צורת ז'ורדן: מציאה ובסיס",
  jordan_existence:         "קיום צורת ז'ורדן",
  jordan_chain:             "שרשראות ז'ורדן",
  nilpotent_basic:          "אופרטור נילפוטנטי: הגדרה",
  nilpotent_classify:       "סיווג נילפוטנטיות",
  generalized_eigenspace:   "מרחב עצמי מוכלל",

  // ── פרק ג: מכפלה פנימית, אורתוגונליות ────────────────────────
  inner_product_axioms:     'מ"פ פנימית: אקסיומות',
  norm_basics:              "נורמה ופיתגורס",
  cauchy_schwarz:           "אי-שוויון קושי-שוורץ",
  triangle_inequality:      "אי-שוויון המשולש",
  gram_schmidt:             "תהליך גרם-שמידט",
  orthonormal_basis:        "בסיס אורתונורמלי",
  orthogonal_complement:    "משלים אורתוגונלי",
  orthogonal_projection:    "היטל אורתוגונלי ומרחק",
  riesz_representation:     "משפט רייס",

  // ── פרק ג: אופרטורים במ"מ פנימית ──────────────────────────
  adjoint_operator:         "אופרטור צמוד T*",
  self_adjoint:             "אופרטור צמוד לעצמו",
  self_adjoint_invariant:   "T צמוד לעצמו, W אינווריאנטי",
  spectral_theorem_real:    "משפט ספקטרלי (ממשי)",
  spectral_theorem_complex: "משפט ספקטרלי (מרוכב)",
  orthogonal_operator:      "אופרטור אורתוגונלי",
  unitary_operator:         "אופרטור אוניטרי",
  unitary_diagonalization:  "לכסון אוניטרי",
  normal_operator:          "אופרטור נורמלי",

  // ── נושאים שאינם בסילבוס הנוכחי (EXCLUDED) ───────────────────
  bilinear_form:            "תבנית בילינארית",
  dual_space:               "מרחב דואלי",
  volume_function:          "פונקציית נפח",
  sylvester_inertia:        "משפט ההתמדה של סילבסטר",
  quadratic_form:           "תבנית ריבועית",
  field_char:               "שדה במציין שונה מ-2",
};

export const COLORS = [
  CHAPTERS[0].chipColor ?? CHAPTERS[0].color,  // #4a7aab (was dark navy)
  CHAPTERS[1].chipColor ?? CHAPTERS[1].color,  // #c1440e
  CHAPTERS[2].chipColor ?? CHAPTERS[2].color,  // #5a8a5a (was dark green)
  "#d4a017",   // gold
  "#8a5aab",   // medium purple  (was #5a3a6b dark)
  "#c05050",   // medium red     (was #9a3232 dark)
  "#a07850",   // medium brown   (was #7a5c3e dark)
  "#3a9696",   // medium teal    (was #2a6b6b dark)
  "#3a7aac",   // medium blue    (was #1a5276 dark)
  "#9a50c0",   // medium violet  (was #6e2f8f dark)
  "#8e44ad",   // bright purple
  "#16a085",   // bright teal
];
