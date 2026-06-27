import { describe, it, expect } from "vitest";
import {
  MOED_ORDER,
  isExceptionalMoed,
  examSemesterLabel,
  examShortLabel,
} from "../sessions";

describe("isExceptionalMoed", () => {
  it("is false for the known sessions", () => {
    Object.keys(MOED_ORDER).forEach((moed) => {
      expect(isExceptionalMoed(moed)).toBe(false);
    });
  });

  it("is true for an unlisted session (sample/unknown)", () => {
    expect(isExceptionalMoed("sample")).toBe(true);
    expect(isExceptionalMoed("ד")).toBe(true);
    expect(isExceptionalMoed("")).toBe(true);
    expect(isExceptionalMoed(undefined)).toBe(true);
  });
});

describe("examSemesterLabel", () => {
  it("maps each known semester to its Hebrew label", () => {
    expect(examSemesterLabel({ semester: "winter" })).toBe("חורף");
    expect(examSemesterLabel({ semester: "spring" })).toBe("אביב");
    expect(examSemesterLabel({ semester: "summer" })).toBe("קיץ");
  });

  it("returns an empty string for a missing/unknown semester", () => {
    expect(examSemesterLabel({})).toBe("");
    expect(examSemesterLabel({ semester: "autumn" })).toBe("");
  });
});

describe("examShortLabel", () => {
  it("formats year/moed for a non-winter exam", () => {
    expect(examShortLabel({ year: 2023, semester: "spring", moed: "א" })).toBe("2023/א");
  });

  it("marks winter exams with a ח before the slash", () => {
    expect(examShortLabel({ year: 2023, semester: "winter", moed: "ב" })).toBe("2023ח/ב");
  });

  it("omits the winter mark when the semester is absent", () => {
    expect(examShortLabel({ year: 2021, moed: "א" })).toBe("2021/א");
  });
});
