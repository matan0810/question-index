// ─────────────────────────────────────────────────────────────────────
//  src/courses/index.js — central course registry.
//
//  Courses are registered below. New courses are added by the scaffold
//  script (`npm run scaffold:course <spec.json>`), which inserts an import
//  block and a registry entry at the @scaffold markers. You can also add
//  one by hand following the same shape.
// ─────────────────────────────────────────────────────────────────────

import {
  COURSE as infi2Course,
  CHAPTERS as infi2Chapters,
  EXCLUDED_TOPICS as infi2ExcludedTopics,
  TREND_FROM_YEAR as infi2TrendFromYear,
  TRAPS as infi2Traps,
  EXAM_FORMAT as infi2ExamFormat,
  QUESTION_TYPES as infi2QuestionTypes,
} from "./infi2/config";
import {
  TOPIC_HE as infi2TopicHe,
  COLORS as infi2Colors,
  isExcluded as infi2IsExcluded,
} from "./infi2/topics";
import { EXAMS as infi2Exams } from "./infi2/exams";

import {
  COURSE as algebra2Course,
  CHAPTERS as algebra2Chapters,
  EXCLUDED_TOPICS as algebra2ExcludedTopics,
  TREND_FROM_YEAR as algebra2TrendFromYear,
  TRAPS as algebra2Traps,
  EXAM_FORMAT as algebra2ExamFormat,
  QUESTION_TYPES as algebra2QuestionTypes,
} from "./algebra2/config";
import {
  TOPIC_HE as algebra2TopicHe,
  COLORS as algebra2Colors,
  isExcluded as algebra2IsExcluded,
} from "./algebra2/topics";
import { EXAMS as algebra2Exams } from "./algebra2/exams";

import {
  COURSE as discreteCourse,
  CHAPTERS as discreteChapters,
  EXCLUDED_TOPICS as discreteExcludedTopics,
  TREND_FROM_YEAR as discreteTrendFromYear,
  TRAPS as discreteTraps,
  EXAM_FORMAT as discreteExamFormat,
  QUESTION_TYPES as discreteQuestionTypes,
} from "./discrete/config";
import {
  TOPIC_HE as discreteTopicHe,
  COLORS as discreteColors,
  isExcluded as discreteIsExcluded,
} from "./discrete/topics";
import { EXAMS as discreteExams } from "./discrete/exams";

// @scaffold:imports — new course imports are inserted above this line. Do not remove.

export const COURSE_REGISTRY = {
  infi2: {
    id: "infi2",
    COURSE: infi2Course,
    CHAPTERS: infi2Chapters,
    EXCLUDED_TOPICS: infi2ExcludedTopics,
    TREND_FROM_YEAR: infi2TrendFromYear,
    TRAPS: infi2Traps,
    EXAM_FORMAT: infi2ExamFormat,
    QUESTION_TYPES: infi2QuestionTypes,
    TOPIC_HE: infi2TopicHe,
    COLORS: infi2Colors,
    isExcluded: infi2IsExcluded,
    EXAMS: infi2Exams,
  },
  algebra2: {
    id: "algebra2",
    COURSE: algebra2Course,
    CHAPTERS: algebra2Chapters,
    EXCLUDED_TOPICS: algebra2ExcludedTopics,
    TREND_FROM_YEAR: algebra2TrendFromYear,
    TRAPS: algebra2Traps,
    EXAM_FORMAT: algebra2ExamFormat,
    QUESTION_TYPES: algebra2QuestionTypes,
    TOPIC_HE: algebra2TopicHe,
    COLORS: algebra2Colors,
    isExcluded: algebra2IsExcluded,
    EXAMS: algebra2Exams,
  },
  discrete: {
    id: 'discrete',
    COURSE: discreteCourse,
    CHAPTERS: discreteChapters,
    EXCLUDED_TOPICS: discreteExcludedTopics,
    TREND_FROM_YEAR: discreteTrendFromYear,
    TRAPS: discreteTraps,
    EXAM_FORMAT: discreteExamFormat,
    QUESTION_TYPES: discreteQuestionTypes,
    TOPIC_HE: discreteTopicHe,
    COLORS: discreteColors,
    isExcluded: discreteIsExcluded,
    EXAMS: discreteExams,
  },
  // @scaffold:registry — new course entries are inserted above this line. Do not remove.
};

// Order on the home page follows insertion order in COURSE_REGISTRY above.
export const COURSE_LIST = Object.values(COURSE_REGISTRY);
