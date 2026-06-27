import { describe, it, expect } from "vitest";
import { examDateCompare, sortExams } from "../sorting";

describe("examDateCompare", () => {
  it("orders by year first", () => {
    expect(examDateCompare({ year: 2010, moed: "א" }, { year: 2011, moed: "א" })).toBeLessThan(0);
    expect(examDateCompare({ year: 2012, moed: "א" }, { year: 2011, moed: "ב" })).toBeGreaterThan(0);
  });

  it("orders by session within the same year", () => {
    expect(examDateCompare({ year: 2020, moed: "א" }, { year: 2020, moed: "ב" })).toBeLessThan(0);
    expect(examDateCompare({ year: 2020, moed: "ב" }, { year: 2020, moed: "א" })).toBeGreaterThan(0);
  });

  it("orders by the real exam date when both dates are known", () => {
    // a winter Feb session precedes a spring Jul session even though both are מועד א
    const winter = { year: 2020, moed: "א", date: "15.02.20" };
    const spring = { year: 2020, moed: "א", date: "10.07.20" };
    expect(examDateCompare(winter, spring)).toBeLessThan(0);
    expect(examDateCompare(spring, winter)).toBeGreaterThan(0);
  });

  it("treats exceptional sessions (sample/unknown) as last within a year", () => {
    expect(examDateCompare({ year: 2020, moed: "א" }, { year: 2020, moed: "sample" })).toBeLessThan(0);
    expect(examDateCompare({ year: 2020, moed: "ג" }, { year: 2020, moed: "??" })).toBeLessThan(0);
  });

  it("treats two exceptional sessions as equal (no NaN)", () => {
    expect(examDateCompare({ year: 2020, moed: "x" }, { year: 2020, moed: "y" })).toBe(0);
  });
});

describe("sortExams", () => {
  const a = { year: 2019, moed: "א", lecturers: ["בני"] };
  const b = { year: 2021, moed: "ב", lecturers: ["אבי"] };
  const c = { year: 2021, moed: "א", lecturers: ["גדי"] };

  it("sorts by date descending (newest first) by default", () => {
    expect(sortExams([a, b, c])).toEqual([b, c, a]);
  });

  it("sorts by date ascending when asked", () => {
    expect(sortExams([b, a, c], "date", "asc")).toEqual([a, c, b]);
  });

  it("does not mutate the input array", () => {
    const input = [b, a, c];
    sortExams(input, "date", "asc");
    expect(input).toEqual([b, a, c]);
  });

  it("sorts by lecturer label", () => {
    const asc = sortExams([a, b, c], "lecturer", "asc");
    expect(asc.map((e) => e.lecturers[0])).toEqual(["אבי", "בני", "גדי"]);
  });

  it("ranks an exceptional session last within its own year", () => {
    const reg1 = { year: 2020, moed: "א", lecturers: ["x"] };
    const reg2 = { year: 2020, moed: "ב", lecturers: ["x"] };
    const samp = { year: 2020, moed: "sample", lecturers: ["x"] };
    // ascending: the sample comes after the real sessions of its year
    expect(sortExams([samp, reg2, reg1], "date", "asc")).toEqual([reg1, reg2, samp]);
    // descending: the sample leads (it's the "latest" session of the year)
    expect(sortExams([reg1, samp, reg2], "date", "desc")).toEqual([samp, reg2, reg1]);
  });
});
