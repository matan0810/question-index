import { describe, it, expect } from "vitest";
import {
  UNKNOWN_LECTURER,
  examMatchesLecturer,
  examLecturerLabel,
  questionExamPartName,
  questionDisplayNumber,
  buildLecturersList,
} from "./exam";

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
    expect(examMatchesLecturer({ lecturers: undefined }, UNKNOWN_LECTURER)).toBe(
      true,
    );
  });

  it("does not match UNKNOWN_LECTURER when the exam has named lecturers", () => {
    expect(examMatchesLecturer({ lecturers: ["דנה"] }, UNKNOWN_LECTURER)).toBe(
      false,
    );
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

describe("questionExamPartName", () => {
  it("returns null when the exam has one part or fewer", () => {
    expect(questionExamPartName({ parts: [] }, "q1")).toBeNull();
    expect(
      questionExamPartName({ parts: [{ name: "כל המבחן", from: ["q1"] }] }, "q1"),
    ).toBeNull();
  });

  it("returns null when the exam is undefined or has no parts", () => {
    expect(questionExamPartName(undefined, "q1")).toBeNull();
    expect(questionExamPartName({}, "q1")).toBeNull();
  });

  it("returns the part containing the question", () => {
    const exam = {
      parts: [
        { name: "חלק א'", from: ["q1", "q2"] },
        { name: "חלק ב'", from: ["q3"] },
      ],
    };
    expect(questionExamPartName(exam, "q3")).toBe("חלק ב");
  });

  it("returns null when no part contains the question", () => {
    const exam = {
      parts: [
        { name: "חלק א'", from: ["q1"] },
        { name: "חלק ב'", from: ["q2"] },
      ],
    };
    expect(questionExamPartName(exam, "q9")).toBeNull();
  });

  it("normalizes inconsistent part spellings to 'חלק <X>'", () => {
    const make = (name) => ({
      parts: [
        { name, from: ["q1"] },
        { name: "אחר", from: ["q2"] },
      ],
    });
    expect(questionExamPartName(make("חלק א'"), "q1")).toBe("חלק א");
    expect(questionExamPartName(make("חלק (א)"), "q1")).toBe("חלק א");
    expect(questionExamPartName(make("פרק ג'"), "q1")).toBe("חלק ג");
    expect(questionExamPartName(make("חלק III"), "q1")).toBe("חלק III");
    expect(questionExamPartName(make("חלק 1"), "q1")).toBe("חלק 1");
  });

  it("keeps non-part labels (e.g. חובה) as-is", () => {
    const exam = {
      parts: [
        { name: "חובה", from: ["q1"] },
        { name: "רשות", from: ["q2"] },
      ],
    };
    expect(questionExamPartName(exam, "q1")).toBe("חובה");
  });

  it("falls back to the raw name when the part token is empty after stripping", () => {
    const exam = {
      parts: [
        { name: "חלק", from: ["q1"] },
        { name: "אחר", from: ["q2"] },
      ],
    };
    expect(questionExamPartName(exam, "q1")).toBe("חלק");
  });
});

describe("questionDisplayNumber", () => {
  it("uses the explicit number when present", () => {
    expect(questionDisplayNumber({ number: 5, id: "q12" })).toBe(5);
  });

  it("uses an explicit number of 0", () => {
    expect(questionDisplayNumber({ number: 0, id: "q12" })).toBe(0);
  });

  it("falls back to the digits in the id when number is missing", () => {
    expect(questionDisplayNumber({ id: "q12" })).toBe("12");
    expect(questionDisplayNumber({ id: "question7" })).toBe("7");
  });

  it("strips only the leading non-digit prefix", () => {
    expect(questionDisplayNumber({ id: "abc34" })).toBe("34");
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
    expect(buildLecturersList([{}, { lecturers: [] }])).toEqual([
      UNKNOWN_LECTURER,
    ]);
  });

  it("returns an empty list for no exams", () => {
    expect(buildLecturersList([])).toEqual([]);
  });
});
