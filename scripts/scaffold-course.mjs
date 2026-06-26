#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────
//  scripts/scaffold-course.mjs
//
//  Generates the three per-course files from a small JSON spec and
//  registers the course in src/courses/index.js:
//
//      src/courses/<id>/config.js   course identity, chapters, traps, format
//      src/courses/<id>/topics.js   topic-key → Hebrew map + heatmap colors
//      src/courses/<id>/exams.js    the EXAMS array (scaffolded empty)
//
//  Usage:
//      npm run scaffold:course -- scripts/course-specs/<id>.json
//      node scripts/scaffold-course.mjs scripts/course-specs/<id>.json [--force]
//
//  The exam content itself is NOT generated — exams.js starts empty and is
//  filled by reading the source PDF. Everything else is boilerplate this
//  script writes once. Re-running is safe: existing files are skipped unless
//  --force is given, and index.js registration is idempotent.
// ─────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const COURSES_DIR = join(ROOT, "src", "courses");
const INDEX_FILE = join(COURSES_DIR, "index.js");

// Extra heatmap colors appended after the per-chapter colors (mirrors algebra2).
const PALETTE = [
  "#d4a017", "#8a5aab", "#c05050", "#a07850", "#3a9696",
  "#3a7aac", "#9a50c0", "#8e44ad", "#16a085",
];

// ── arg parsing ──────────────────────────────────────────────────────
const args = process.argv.slice(2);
const force = args.includes("--force");
const specPath = args.find((a) => !a.startsWith("--"));
if (!specPath) {
  console.error("usage: node scripts/scaffold-course.mjs <spec.json> [--force]");
  process.exit(1);
}

const spec = JSON.parse(readFileSync(resolve(specPath), "utf8"));
validate(spec);

const dir = join(COURSES_DIR, spec.id);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

warnOnColorCollision(spec);
writeFile(join(dir, "config.js"), genConfig(spec));
writeFile(join(dir, "topics.js"), genTopics(spec));
writeFile(join(dir, "exams.js"), genExams(spec));
registerInIndex(spec);

console.log(`\n✓ course "${spec.id}" scaffolded.`);
console.log(`  next: fill src/courses/${spec.id}/exams.js from the source PDF,`);
console.log(`        then refine TOPIC_HE / CHAPTERS / EXAM_FORMAT as needed.`);

// ── validation ───────────────────────────────────────────────────────
function validate(s) {
  const fail = (m) => {
    console.error(`spec error: ${m}`);
    process.exit(1);
  };
  if (!s.id || !/^[a-z][a-z0-9]*$/.test(s.id))
    fail('"id" is required and must be lowercase alnum (e.g. "discrete").');
  if (!s.course?.name || !s.course?.number)
    fail('"course.name" and "course.number" are required.');
  if (!Array.isArray(s.chapters) || s.chapters.length === 0)
    fail('"chapters" must be a non-empty array.');
}

// The course identity color (picker border, title, primary accent) is
// CHAPTERS[0].color. Each course should own a distinct hue — warn if it
// matches an already-registered course's first-chapter color.
function warnOnColorCollision(s) {
  const mine = s.chapters[0]?.color?.toLowerCase();
  if (!mine) return;
  for (const entry of readdirSync(COURSES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === s.id) continue;
    const cfg = join(COURSES_DIR, entry.name, "config.js");
    if (!existsSync(cfg)) continue;
    const m = readFileSync(cfg, "utf8").match(/color:\s*['"](#[0-9a-fA-F]{6})['"]/);
    if (m && m[1].toLowerCase() === mine) {
      console.warn(`⚠ identity color ${mine} already used by course "${entry.name}" — consider a distinct hue for CHAPTERS[0].color.`);
    }
  }
}

// ── string helpers ───────────────────────────────────────────────────
// Quote a JS string literal, preferring single quotes (codebase style) and
// switching to double quotes when the text contains a geresh (') so Hebrew
// gershayim/geresh need no escaping. Backslashes (LaTeX) are always doubled.
function q(str) {
  const s = String(str).replace(/\\/g, "\\\\");
  if (!s.includes("'")) return `'${s}'`;
  if (!s.includes('"')) return `"${s}"`;
  return `'${s.replace(/'/g, "\\'")}'`;
}

// Object key: bare when a valid identifier, quoted otherwise (Hebrew keys).
function key(k) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : q(k);
}

// ── file generators ──────────────────────────────────────────────────
function genConfig(s) {
  const c = s.course;
  const chapters = s.chapters
    .map(
      (ch) =>
        `  { key: ${q(ch.key)}, label: ${q(ch.label ?? "")}, color: ${q(
          ch.color ?? "#2b4162"
        )}, chipColor: ${q(ch.chipColor ?? ch.color ?? "#4a7aab")}, chipBg: ${q(
          ch.chipBg ?? (ch.color ?? "#2b4162") + "18"
        )} },`
    )
    .join("\n");

  const excluded = (s.excludedTopics ?? []).map(q).join(", ");

  const traps = (s.traps ?? [])
    .map((t) => `  { t: ${q(t.t)}, n: ${q(t.n)} },`)
    .join("\n");

  const qtypes = Object.entries(s.questionTypes ?? defaultQuestionTypes())
    .map(([k, v]) => `  ${key(k)}: { label: ${q(v.label)}, kind: ${q(v.kind)} },`)
    .join("\n");

  const fmt = s.examFormat ?? {};
  const fmtChapters = (fmt.chapters ?? s.chapters.map((ch) => ({ key: ch.key, points: 0, description: "" })))
    .map((fc) => `    { key: ${q(fc.key)}, points: ${fc.points ?? 0}, description: ${q(fc.description ?? "")} },`)
    .join("\n");
  const badges = (fmt.badges ?? [])
    .map((b) => `    { label: ${q(b.label)}, variant: ${q(b.variant ?? "neutral")} },`)
    .join("\n");

  return `// ─────────────────────────────────────────────────────────────────────
//  src/courses/${s.id}/config.js
//  Course-level metadata: identity, chapters, excluded topics, traps,
//  question types, and the latest exam format.
// ─────────────────────────────────────────────────────────────────────

export const COURSE = {
  teacher:    ${q(c.teacher ?? "")},
  name:       ${q(c.name)},
  shortName:  ${q(c.shortName ?? c.name)},
  number:     ${q(c.number)},
  university: ${q(c.university ?? "האוניברסיטה העברית בירושלים")},
};

export const CHAPTERS = [
${chapters}
];

// Topics present in old exams but no longer in the current syllabus.
// Recorded in the data but excluded from trend graphs.
export const EXCLUDED_TOPICS = new Set([${excluded}]);

export const TREND_FROM_YEAR = ${s.trendFromYear ?? new Date().getFullYear() - 10};

export const TRAPS = [
${traps}
];

// kind values: "proof" | "theorem" | "ts" | "calc" | "mixed"
export const QUESTION_TYPES = {
${qtypes}
};

// EXAM_FORMAT — the format panel shown for the latest exam.
// latestSession/latestDate/lecturer may be overridden at runtime from the
// actual latest exam; only \`chapters\` and \`badges\` are used as written.
export const EXAM_FORMAT = {
  latestSession: ${q(fmt.latestSession ?? "")},
  latestDate: ${q(fmt.latestDate ?? "")},
  chapters: [
${fmtChapters}
  ],
  badges: [
${badges}
  ],
};
`;
}

function genTopics(s) {
  const topics = Object.entries(s.topics ?? {})
    .map(([k, v]) => `  ${key(k)}: ${q(v)},`)
    .join("\n");

  const chapterColors = s.chapters
    .map((_, i) => `  CHAPTERS[${i}].chipColor ?? CHAPTERS[${i}].color,`)
    .join("\n");
  const palette = PALETTE.map((c) => `  ${q(c)},`).join("\n");

  return `import { EXCLUDED_TOPICS, CHAPTERS } from "./config";
export { EXCLUDED_TOPICS };
export const isExcluded = (topic) => EXCLUDED_TOPICS.has(topic);

// One entry per topic key used in exams.js, listed in syllabus order
// (earlier keys sort earlier in stats, trends, and search).
export const TOPIC_HE = {
${topics}
};

// Heatmap palette: per-chapter colors first, then a shared fallback palette.
export const COLORS = [
${chapterColors}
${palette}
];
`;
}

function genExams(s) {
  return `// ─────────────────────────────────────────────────────────────────────
//  src/courses/${s.id}/exams.js
//
//  Schema:
//    {
//      code: "<year>_<moed>_I",          // unique identifier
//      year: 2024,
//      moed: "א" | "ב" | "ג",            // exam session
//      semester: "spring" | "winter",     // when course was taught
//      date: "dd.mm.yy",
//      lecturers: ["…", "…"],
//      duration_hours: 3 | 2.5,
//      total_points: 100,
//      verified: true,                    // checked page-by-page against the PDF
//      parts: [                           // ordered parts of the exam
//        {
//          name: "חלק א'",
//          points: 30,                    // total points available in this part
//          choose: 2,                     // student answers this many questions
//          from: ["א1", "א2", "א3"],      // out of these (refs question.id)
//          mandatory: ["א1"]              // optional: question(s) that must be answered
//        }
//      ],
//      questions: [
//        {
//          id: "א1",                      // "<chapter><number>" or "Q<number>"
//          number: 1,                     // sequential number on the exam
//          chapter: "א" | "ב" | "ג",      // primary chapter
//          chapters: ["א","ג"],           // optional: if it spans chapters
//          type: "proof_theorem"          // one of QUESTION_TYPES keys; a
//                | "...",                 // multi-part question carries extra
//                                         // types on its subparts instead of "mixed".
//          topic: "topic_key",            // primary topic from TOPIC_HE
//          topics: ["k1","k2"],           // optional: secondary topics
//          points: 25,                    // points for this question
//          summary: "Short description with $LaTeX$.",
//          subparts: [                    // optional; for multi-part questions.
//            { id: "א", points: 10, type: "compute", topic: "...", summary: "…" },
//            { id: "ב", points: 15, type: "proof_short", topic: "...", summary: "…" },
//          ]
//        }
//      ]
//    }
//
//  A question is counted under every topic it touches — primary topic,
//  any topics:[], and each subpart's topic — across stats, trends, and search.
// ─────────────────────────────────────────────────────────────────────

export const EXAMS = [
  // Fill from the source PDF, oldest first. See the schema above.
];
`;
}

function defaultQuestionTypes() {
  return {
    proof_theorem: { label: "הוכחת משפט", kind: "theorem" },
    proof_short: { label: "הוכחה", kind: "proof" },
    compute: { label: "חישוב", kind: "calc" },
    true_false: { label: "אמת/שקר", kind: "ts" },
    counterexample: { label: "הוכח/הפרך", kind: "ts" },
  };
}

// ── index.js registration ────────────────────────────────────────────
function registerInIndex(s) {
  let src = readFileSync(INDEX_FILE, "utf8");
  if (src.includes(`from "./${s.id}/config"`)) {
    console.log(`• index.js already registers "${s.id}" — leaving it as is.`);
    return;
  }

  const A = (name) => `${s.id}${name}`; // alias prefix
  const importBlock = `import {
  COURSE as ${A("Course")},
  CHAPTERS as ${A("Chapters")},
  EXCLUDED_TOPICS as ${A("ExcludedTopics")},
  TREND_FROM_YEAR as ${A("TrendFromYear")},
  TRAPS as ${A("Traps")},
  EXAM_FORMAT as ${A("ExamFormat")},
  QUESTION_TYPES as ${A("QuestionTypes")},
} from "./${s.id}/config";
import {
  TOPIC_HE as ${A("TopicHe")},
  COLORS as ${A("Colors")},
  isExcluded as ${A("IsExcluded")},
} from "./${s.id}/topics";
import { EXAMS as ${A("Exams")} } from "./${s.id}/exams";

`;

  const registryEntry = `  ${s.id}: {
    id: ${q(s.id)},
    COURSE: ${A("Course")},
    CHAPTERS: ${A("Chapters")},
    EXCLUDED_TOPICS: ${A("ExcludedTopics")},
    TREND_FROM_YEAR: ${A("TrendFromYear")},
    TRAPS: ${A("Traps")},
    EXAM_FORMAT: ${A("ExamFormat")},
    QUESTION_TYPES: ${A("QuestionTypes")},
    TOPIC_HE: ${A("TopicHe")},
    COLORS: ${A("Colors")},
    isExcluded: ${A("IsExcluded")},
    EXAMS: ${A("Exams")},
  },
`;

  const importMarker = "// @scaffold:imports";
  const registryMarker = "  // @scaffold:registry";
  if (!src.includes(importMarker) || !src.includes(registryMarker)) {
    console.error(
      "index.js is missing @scaffold markers — add them or register the course by hand."
    );
    process.exit(1);
  }

  src = src.replace(importMarker, importBlock + importMarker);
  src = src.replace(registryMarker, registryEntry + registryMarker);
  writeFileSync(INDEX_FILE, src);
  console.log(`• registered "${s.id}" in src/courses/index.js`);
}

// ── fs helper ────────────────────────────────────────────────────────
function writeFile(path, contents) {
  if (existsSync(path) && !force) {
    console.log(`• skip (exists): ${path.replace(ROOT, ".")}  — use --force to overwrite`);
    return;
  }
  writeFileSync(path, contents);
  console.log(`• wrote ${path.replace(ROOT, ".")}`);
}
