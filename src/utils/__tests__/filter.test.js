import { describe, it, expect } from "vitest";
import { filterAndSortExams } from "../filter";

const q = (summary = "", topics = []) => ({ summary, topics });

const exams = [
  {
    code: "2021a",
    year: 2021,
    moed: "א",
    semester: "winter",
    lecturers: ["דנה"],
    questions: [q("דטרמיננטה", ["det"]), q("ערכים עצמיים", ["eig"])],
  },
  {
    code: "2021b",
    year: 2021,
    moed: "ב",
    semester: "spring",
    lecturers: ["יוסי"],
    questions: [q("אינטגרל", ["integral"])],
  },
  {
    code: "2019a",
    year: 2019,
    moed: "א",
    semester: "winter",
    lecturers: ["דנה"],
    questions: [q("רציפות", ["cont"])],
  },
];

const base = {
  yearFilter: "",
  moedFilter: "",
  semesterFilter: "",
  lecturerFilter: "",
  query: "",
  hideLatest: false,
  latestYear: null,
  sortBy: "date",
  sortDir: "desc",
};

const codes = (result) => result.map((e) => e.code);

describe("filterAndSortExams", () => {
  it("returns all exams sorted newest-first when no filter is active", () => {
    expect(codes(filterAndSortExams(exams, base))).toEqual(["2021b", "2021a", "2019a"]);
  });

  it("filters by year (compared as a string)", () => {
    expect(codes(filterAndSortExams(exams, { ...base, yearFilter: "2021" }))).toEqual([
      "2021b",
      "2021a",
    ]);
  });

  it("filters by moed", () => {
    expect(codes(filterAndSortExams(exams, { ...base, moedFilter: "ב" }))).toEqual(["2021b"]);
  });

  it("filters by semester", () => {
    expect(codes(filterAndSortExams(exams, { ...base, semesterFilter: "winter" }))).toEqual([
      "2021a",
      "2019a",
    ]);
  });

  it("filters by lecturer", () => {
    expect(codes(filterAndSortExams(exams, { ...base, lecturerFilter: "יוסי" }))).toEqual([
      "2021b",
    ]);
  });

  it("hides the latest year when hideLatest is on", () => {
    const r = filterAndSortExams(exams, { ...base, hideLatest: true, latestYear: 2021 });
    expect(codes(r)).toEqual(["2019a"]);
  });

  it("matches the free-text query against question summaries", () => {
    expect(codes(filterAndSortExams(exams, { ...base, query: "אינטגרל" }))).toEqual(["2021b"]);
  });

  it("matches the query against code, year, moed, lecturers and topics", () => {
    expect(codes(filterAndSortExams(exams, { ...base, query: "det" }))).toEqual(["2021a"]);
    expect(codes(filterAndSortExams(exams, { ...base, query: "יוסי" }))).toEqual(["2021b"]);
    expect(codes(filterAndSortExams(exams, { ...base, query: "2019a" }))).toEqual(["2019a"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterAndSortExams(exams, { ...base, query: "אין-כזה" })).toEqual([]);
  });

  it("combines multiple filters (AND semantics)", () => {
    const r = filterAndSortExams(exams, { ...base, yearFilter: "2021", lecturerFilter: "דנה" });
    expect(codes(r)).toEqual(["2021a"]);
  });

  it("respects the requested sort direction", () => {
    expect(codes(filterAndSortExams(exams, { ...base, sortDir: "asc" }))).toEqual([
      "2019a",
      "2021a",
      "2021b",
    ]);
  });

  it("does not mutate the input array", () => {
    const input = [...exams];
    filterAndSortExams(input, base);
    expect(input).toEqual(exams);
  });
});
