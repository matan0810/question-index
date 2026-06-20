import Chip, { useTypeHelpers } from "./Chip";

// The two classifier chips shown for every question: the course-topic chapter
// (colored, "פרק X") and the question type. Shared by the exams list and the
// search results so the wording/styling lives in one place.
export default function QuestionChips({ question }) {
  const { typeToLabel, typeToKind } = useTypeHelpers();
  return (
    <>
      <Chip kind={question.chapter}>פרק {question.chapter}</Chip>
      <Chip kind={typeToKind(question.type)}>{typeToLabel(question.type)}</Chip>
    </>
  );
}
