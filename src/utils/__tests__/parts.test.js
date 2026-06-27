import { describe, it, expect } from "vitest";
import { questionExamPartName, splitSummaryParts } from "../parts";

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
    const r = splitSummaryParts("(1) הוכיחו $A$ לכסינה; (2) יהי $B$ בסיס אורתונורמלי");
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
    expect(r.parts[0].text).toBe("$A\\in M_5(\\mathbb{R})$ עם $\\det(A)=20$. הוכיחו לכסינה");
    expect(r.parts[1].text).toBe("$T:V\\to V$ אופרטור");
  });

  it("does not split a single-formula summary that merely contains parens", () => {
    expect(splitSummaryParts("$f(1)$ ו-$g(2)$ שווים")).toBeNull();
  });
});
