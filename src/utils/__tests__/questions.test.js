import { describe, it, expect } from "vitest";
import {
  questionTopics,
  questionTypes,
  questionInSyllabus,
  questionDisplayNumber,
  makeTopicOrder,
} from "../questions";

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
