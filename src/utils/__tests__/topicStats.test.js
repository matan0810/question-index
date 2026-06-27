import { describe, it, expect } from "vitest";
import { computeYearTopics, getTopTopics } from "../topicStats";

const q = (topic, topics = []) => ({ topic, topics });
const never = () => false;

const exams = [
  { year: 2018, questions: [q("old"), q("det")] },
  { year: 2020, questions: [q("det"), q("det"), q("eig")] },
  { year: 2021, questions: [q("eig", ["det"]), q("old")] },
];

describe("computeYearTopics", () => {
  it("counts topics per year from fromYear onward", () => {
    const byYear = computeYearTopics(exams, 2020, never);
    expect(byYear[2020]).toEqual({ det: 2, eig: 1 });
    expect(byYear[2021]).toEqual({ eig: 1, det: 1, old: 1 });
  });

  it("excludes years before fromYear", () => {
    const byYear = computeYearTopics(exams, 2020, never);
    expect(byYear[2018]).toBeUndefined();
  });

  it("skips excluded topics", () => {
    const isExcluded = (t) => t === "old";
    const byYear = computeYearTopics(exams, 2018, isExcluded);
    expect(byYear[2018]).toEqual({ det: 1 });
    expect(byYear[2021]).toEqual({ eig: 1, det: 1 });
  });

  it("counts secondary topics too (via questionTopics)", () => {
    // the 2021 first question is eig + det, so det is counted once here
    const byYear = computeYearTopics(exams, 2021, never);
    expect(byYear[2021].det).toBe(1);
  });

  it("returns an empty object when no exam qualifies", () => {
    expect(computeYearTopics(exams, 3000, never)).toEqual({});
  });
});

describe("getTopTopics", () => {
  it("returns topics ordered by frequency, most-frequent first", () => {
    expect(getTopTopics(exams, 2018, never)).toEqual(["det", "old", "eig"]);
  });

  it("respects fromYear", () => {
    // from 2020: det×2, eig×2 (2020 eig + 2021 eig), det also +1 in 2021 → det 3, eig 2
    expect(getTopTopics(exams, 2020, never)).toEqual(["det", "eig", "old"]);
  });

  it("honours the limit", () => {
    expect(getTopTopics(exams, 2018, never, 1)).toEqual(["det"]);
  });

  it("drops excluded topics", () => {
    const isExcluded = (t) => t === "old";
    expect(getTopTopics(exams, 2018, isExcluded)).toEqual(["det", "eig"]);
  });

  it("returns an empty list when nothing qualifies", () => {
    expect(getTopTopics(exams, 3000, never)).toEqual([]);
  });
});
