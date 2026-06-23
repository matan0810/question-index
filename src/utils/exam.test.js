import { describe, it, expect } from "vitest";
import {
  UNKNOWN_LECTURER,
  examMatchesLecturer,
  examLecturerLabel,
  questionExamPartName,
  questionDisplayNumber,
  buildLecturersList,
  examDateCompare,
  sortExams,
  latestExamYear,
  questionTopics,
  questionTypes,
  questionInSyllabus,
  makeTopicOrder,
  splitSummaryParts,
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

describe("examDateCompare", () => {
  it("orders by year first", () => {
    expect(examDateCompare({ year: 2010, moed: "א" }, { year: 2011, moed: "א" })).toBeLessThan(0);
    expect(examDateCompare({ year: 2012, moed: "א" }, { year: 2011, moed: "ב" })).toBeGreaterThan(0);
  });

  it("orders by session within the same year", () => {
    expect(examDateCompare({ year: 2020, moed: "א" }, { year: 2020, moed: "ב" })).toBeLessThan(0);
    expect(examDateCompare({ year: 2020, moed: "ב" }, { year: 2020, moed: "א" })).toBeGreaterThan(0);
  });

  it("treats exceptional sessions (sample/unknown) as last within a year", () => {
    expect(examDateCompare({ year: 2020, moed: "א" }, { year: 2020, moed: "sample" })).toBeLessThan(0);
    expect(examDateCompare({ year: 2020, moed: "ג" }, { year: 2020, moed: "??" })).toBeLessThan(0);
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

describe("questionTopics", () => {
  it("returns the primary topic first", () => {
    expect(questionTopics({ topic: "a" })).toEqual(["a"]);
  });

  it("includes secondary topics and subpart topics, primary first", () => {
    const q = {
      topic: "a",
      topics: ["b", "c"],
      subparts: [{ topic: "d" }, { topic: "e" }],
    };
    expect(questionTopics(q)).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("de-duplicates a topic shared by the question and a subpart", () => {
    const q = { topic: "a", topics: ["b"], subparts: [{ topic: "a" }, { topic: "b" }] };
    expect(questionTopics(q)).toEqual(["a", "b"]);
  });

  it("ignores missing/empty topic fields", () => {
    expect(questionTopics({ topic: "a", subparts: [{}, { topic: null }] })).toEqual(["a"]);
  });
});

describe("questionTypes", () => {
  it("returns the headline type first", () => {
    expect(questionTypes({ type: "compute" })).toEqual(["compute"]);
  });

  it("adds each subpart type, deduped and ordered", () => {
    const q = {
      type: "proof_theorem",
      subparts: [{ type: "compute" }, { type: "proof_theorem" }, { type: "proof_short" }],
    };
    expect(questionTypes(q)).toEqual(["proof_theorem", "compute", "proof_short"]);
  });

  it("skips subparts with no type", () => {
    expect(questionTypes({ type: "compute", subparts: [{}, { type: "" }] })).toEqual([
      "compute",
    ]);
  });
});

describe("questionInSyllabus", () => {
  const isExcluded = (t) => t === "old";

  it("is true when at least one topic is still in the syllabus", () => {
    expect(questionInSyllabus({ topic: "old", topics: ["current"] }, isExcluded)).toBe(true);
  });

  it("is false only when every topic is excluded", () => {
    const q = { topic: "old", subparts: [{ topic: "old" }] };
    expect(questionInSyllabus(q, isExcluded)).toBe(false);
  });

  it("is true for a question whose single topic is in the syllabus", () => {
    expect(questionInSyllabus({ topic: "current" }, isExcluded)).toBe(true);
  });
});

describe("splitSummaryParts", () => {
  it("returns null for a single-part summary", () => {
    expect(splitSummaryParts("מצאו את הפולינום האופייני")).toBeNull();
    expect(splitSummaryParts("")).toBeNull();
    expect(splitSummaryParts(undefined)).toBeNull();
  });

  it('splits "א) … ב) …" markers and keeps the full text of each part', () => {
    const r = splitSummaryParts('א) משפט גרם-שמידט; ב) קיים בסיס אורתונורמלי');
    expect(r.stem).toBe("");
    expect(r.parts).toEqual([
      { label: "א", text: "משפט גרם-שמידט" },
      { label: "ב", text: "קיים בסיס אורתונורמלי" },
    ]);
  });

  it("splits parenthesised markers and extracts the shared stem", () => {
    const r = splitSummaryParts("$T$ צמוד לעצמו: (א) ע\"ע ממשיים; (ב) $T^2=I$");
    expect(r.stem).toBe("$T$ צמוד לעצמו");
    expect(r.parts).toEqual([
      { label: "א", text: 'ע"ע ממשיים' },
      { label: "ב", text: "$T^2=I$" },
    ]);
  });

  it('splits the "א. … · ב. …" (middot) style', () => {
    const r = splitSummaryParts("א. $\\int_0^9 e^{\\sqrt{x}}dx$ · ב. $\\int_0^1 dx$");
    expect(r.parts).toEqual([
      { label: "א", text: "$\\int_0^9 e^{\\sqrt{x}}dx$" },
      { label: "ב", text: "$\\int_0^1 dx$" },
    ]);
  });

  it("handles three parts in order", () => {
    const r = splitSummaryParts("רקע: א) ראשון; ב) שני; ג) שלישי");
    expect(r.stem).toBe("רקע");
    expect(r.parts.map((p) => p.label)).toEqual(["א", "ב", "ג"]);
    expect(r.parts.map((p) => p.text)).toEqual(["ראשון", "שני", "שלישי"]);
  });

  it("does not treat a lone marker as a split", () => {
    expect(splitSummaryParts("הוכיחו א) בלבד")).toBeNull();
  });

  it('splits numbered "(1) … (2) …" markers', () => {
    const r = splitSummaryParts(
      "(1) הוכיחו $A$ לכסינה; (2) יהי $B$ בסיס אורתונורמלי",
    );
    expect(r.stem).toBe("");
    expect(r.parts).toEqual([
      { label: "1", text: "הוכיחו $A$ לכסינה" },
      { label: "2", text: "יהי $B$ בסיס אורתונורמלי" },
    ]);
  });

  it("ignores digit-parens inside maths when splitting numbered parts", () => {
    // $\det(A)=20$ and $\mathrm{rank}(2I-A)$ must not be read as markers.
    const r = splitSummaryParts(
      "(1) $A\\in M_5(\\mathbb{R})$ עם $\\det(A)=20$. הוכיחו לכסינה; (2) $T:V\\to V$ אופרטור",
    );
    expect(r.parts.map((p) => p.label)).toEqual(["1", "2"]);
    expect(r.parts[0].text).toBe(
      "$A\\in M_5(\\mathbb{R})$ עם $\\det(A)=20$. הוכיחו לכסינה",
    );
    expect(r.parts[1].text).toBe("$T:V\\to V$ אופרטור");
  });

  it("does not split a single-formula summary that merely contains parens", () => {
    expect(splitSummaryParts("$f(1)$ ו-$g(2)$ שווים")).toBeNull();
  });
});

describe("makeTopicOrder", () => {
  const topicHe = { first: "ראשון", second: "שני", third: "שלישי" };

  it("orders keys by their position in the topic map", () => {
    const cmp = makeTopicOrder(topicHe);
    expect(["third", "first", "second"].sort(cmp)).toEqual(["first", "second", "third"]);
  });

  it("sorts unknown keys to the end", () => {
    const cmp = makeTopicOrder(topicHe);
    expect(["mystery", "second"].sort(cmp)).toEqual(["second", "mystery"]);
  });
});
