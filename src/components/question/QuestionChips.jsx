import Chip, { useTypeHelpers } from "../ui/Chip";
import { questionTypes } from "../../utils/exam";

// The classifier chips shown for every question: the course-topic chapter
// (colored, "פרק X") and one chip per question type. A multi-part question
// (computation + proof, …) shows a chip for each type it covers. Shared by the
// exams list and the search results so the wording/styling lives in one place.
export default function QuestionChips({ question }) {
  const { typeToLabel, typeToKind } = useTypeHelpers();
  return (
    <>
      <Chip kind={question.chapter}>פרק {question.chapter}</Chip>
      {questionTypes(question).map((type) => (
        <Chip key={type} kind={typeToKind(type)}>{typeToLabel(type)}</Chip>
      ))}
    </>
  );
}
