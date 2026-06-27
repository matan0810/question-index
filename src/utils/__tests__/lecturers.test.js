import { describe, it, expect } from "vitest";
import {
  UNKNOWN_LECTURER,
  examMatchesLecturer,
  examLecturerLabel,
  buildLecturersList,
} from "../lecturers";

describe("examMatchesLecturer", () => {
  it("matches when the lecturer is in the exam's list", () => {
    const exam = { lecturers: ["דנה", "יוסי"] };
    expect(examMatchesLecturer(exam, "דנה")).toBe(true);
    expect(examMatchesLecturer(exam, "יוסי")).toBe(true);
  });

  it("does not match a lecturer absent from the list", () => {
    const exam = { lecturers: ["דנה"] };
    expect(examMatchesLecturer(exam, "יוסי")).toBeFalsy();
  });

  it("treats an exam with no lecturers as matching UNKNOWN_LECTURER", () => {
    expect(examMatchesLecturer({ lecturers: [] }, UNKNOWN_LECTURER)).toBe(true);
    expect(examMatchesLecturer({}, UNKNOWN_LECTURER)).toBe(true);
    expect(examMatchesLecturer({ lecturers: undefined }, UNKNOWN_LECTURER)).toBe(true);
  });

  it("does not match UNKNOWN_LECTURER when the exam has named lecturers", () => {
    expect(examMatchesLecturer({ lecturers: ["דנה"] }, UNKNOWN_LECTURER)).toBe(false);
  });
});

describe("examLecturerLabel", () => {
  it("joins multiple lecturers with a comma", () => {
    expect(examLecturerLabel({ lecturers: ["דנה", "יוסי"] })).toBe("דנה, יוסי");
  });

  it("returns the single lecturer", () => {
    expect(examLecturerLabel({ lecturers: ["דנה"] })).toBe("דנה");
  });

  it("falls back to UNKNOWN_LECTURER when lecturers is missing", () => {
    expect(examLecturerLabel({})).toBe(UNKNOWN_LECTURER);
  });

  it("returns an empty string for an empty lecturers array", () => {
    // [].join(", ") === "" which is not nullish, so the fallback does not apply
    expect(examLecturerLabel({ lecturers: [] })).toBe("");
  });
});

describe("buildLecturersList", () => {
  it("returns a de-duplicated, sorted list of lecturers", () => {
    const exams = [
      { lecturers: ["יוסי"] },
      { lecturers: ["דנה", "יוסי"] },
      { lecturers: ["אבי"] },
    ];
    expect(buildLecturersList(exams)).toEqual(
      ["אבי", "דנה", "יוסי"].sort((a, b) => a.localeCompare(b)),
    );
  });

  it("substitutes UNKNOWN_LECTURER for exams without lecturers", () => {
    const exams = [{ lecturers: ["דנה"] }, {}, { lecturers: [] }];
    const list = buildLecturersList(exams);
    expect(list).toContain("דנה");
    expect(list).toContain(UNKNOWN_LECTURER);
  });

  it("always sorts UNKNOWN_LECTURER last", () => {
    const exams = [{}, { lecturers: ["דנה"] }, { lecturers: ["אבי"] }];
    const list = buildLecturersList(exams);
    expect(list[list.length - 1]).toBe(UNKNOWN_LECTURER);
  });

  it("returns only UNKNOWN_LECTURER when no exam has lecturers", () => {
    expect(buildLecturersList([{}, { lecturers: [] }])).toEqual([UNKNOWN_LECTURER]);
  });

  it("returns an empty list for no exams", () => {
    expect(buildLecturersList([])).toEqual([]);
  });
});
