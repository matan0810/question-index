import Chip, { useTypeHelpers } from "../ui/Chip";
import { questionTypes } from "../../utils";

// The classifier chips shown for every question: the course-topic chapter
// (colored, "פרק X") and one chip per question type. A multi-part question
// (computation + proof, …) shows a chip for each type it covers. Shared by the
// exams list and the search results so the wording/styling lives in one place.
//
// When onChapterClick / onTypeClick are supplied the matching chips become
// clickable filters (jump to search, or narrow the search in place); without
// them the chips render as plain labels.
export default function QuestionChips({ question, onChapterClick, onTypeClick }) {
  const { typeToLabel, typeToKind } = useTypeHelpers();
  return (
    <>
      <Chip
        kind={question.chapter}
        title={onChapterClick ? "סנן לפי פרק" : undefined}
        onClick={onChapterClick ? () => onChapterClick(question.chapter) : undefined}
      >
        פרק {question.chapter}
      </Chip>
      {questionTypes(question).map((type) => (
        <Chip
          key={type}
          kind={typeToKind(type)}
          title={onTypeClick ? "סנן לפי סוג" : undefined}
          onClick={onTypeClick ? () => onTypeClick(type) : undefined}
        >
          {typeToLabel(type)}
        </Chip>
      ))}
    </>
  );
}
