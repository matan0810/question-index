import { EXCLUDED_TOPICS, CHAPTERS } from "./config";
export { EXCLUDED_TOPICS };
export const isExcluded = (topic) => EXCLUDED_TOPICS.has(topic);

export const TOPIC_HE = {
  countable_sums: "קבוצות בנות מנייה / סכומים לא מסודרים",
  limsup: "lim sup / lim inf",
  series_basic: "טורים — בסיסי / קושי / זנב",
  series_pos: "טורים חיוביים — מבחנים",
  series_alt: "לייבניץ / התכנסות בתנאי ובהחלט",
  series_rearr: "משפט רימן / שינוי סדר סכימה",
  series_product: "מכפלות טורים / מרטנס / קושי",
  improper_int: "אינטגרלים לא אמיתיים",
  int_series_link: "מבחן האינטגרל / קשר טורים-אינטגרלים",
  func_sequences: 'סדרות פונקציות / התכנסות במ"ש',
  func_series: "טורי פונקציות / ויירשטראס",
  taylor: "פולינומי / טורי טיילור / שאריות",
  power_series: "טורי חזקות / רדיוס התכנסות",
  riemann_int: "אינטגרביליות רימן",
  ftoc: "המשפט היסודי של החשבון האינטגרלי",
  bv: "השתנות חסומה",
  multivariable: 'חדו"א רב-משתני',
  lhopital: "כלל לופיטל / גבולות",
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
];
