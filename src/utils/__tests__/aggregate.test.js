import { describe, it, expect } from "vitest";
import {
  latestExamYear,
  examYears,
  countQuestions,
  examTotals,
} from "../aggregate";

describe("latestExamYear", () => {
  it("returns the most recent year", () => {
    const exams = [
      { year: 2019, moed: "א" },
      { year: 2021, moed: "ב" },
      { year: 2020, moed: "א" },
    ];
    expect(latestExamYear(exams)).toBe(2021);
  });

  it("returns null for an empty list", () => {
    expect(latestExamYear([])).toBeNull();
  });
});

describe("examYears", () => {
  it("returns distinct years sorted oldest → newest", () => {
    const exams = [{ year: 2021 }, { year: 2019 }, { year: 2021 }, { year: 2020 }];
    expect(examYears(exams)).toEqual([2019, 2020, 2021]);
  });

  it("sorts numerically, not lexicographically", () => {
    const exams = [{ year: 2009 }, { year: 2011 }, { year: 2010 }];
    expect(examYears(exams)).toEqual([2009, 2010, 2011]);
  });

  it("returns an empty array for no exams", () => {
    expect(examYears([])).toEqual([]);
  });
});

describe("countQuestions", () => {
  it("sums questions across exams", () => {
    const exams = [
      { questions: [1, 2, 3] },
      { questions: [] },
      { questions: [1, 2] },
    ];
    expect(countQuestions(exams)).toBe(5);
  });

  it("returns 0 for no exams", () => {
    expect(countQuestions([])).toBe(0);
  });
});

describe("examTotals", () => {
  it("returns question count and covered year range in one pass", () => {
    const exams = [
      { year: 2019, questions: [1, 2] },
      { year: 2022, questions: [1] },
      { year: 2020, questions: [1, 2, 3] },
    ];
    expect(examTotals(exams)).toEqual({ totalQuestions: 6, minYear: 2019, maxYear: 2022 });
  });

  it("handles a single exam (min === max)", () => {
    expect(examTotals([{ year: 2021, questions: [1, 2] }])).toEqual({
      totalQuestions: 2,
      minYear: 2021,
      maxYear: 2021,
    });
  });

  it("returns zeros for an empty list", () => {
    expect(examTotals([])).toEqual({ totalQuestions: 0, minYear: 0, maxYear: 0 });
  });
});
