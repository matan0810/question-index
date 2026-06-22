import {
  HashRouter,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import { CourseProvider } from "./context/CourseContext";
import { COURSE_REGISTRY } from "./courses/index";
import { ErrorBoundary } from "./components";
import CoursePicker from "./pages/CoursePicker";
import CourseApp from "./pages/CourseApp";

function CourseLoader() {
  const { courseId } = useParams();
  const courseData = COURSE_REGISTRY[courseId];
  if (!courseData) return <Navigate to="/" replace />;
  return (
    <CourseProvider courseData={courseData}>
      <CourseApp />
    </CourseProvider>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<CoursePicker />} />
          <Route path="/course/:courseId" element={<CourseLoader />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
}

// TODO
//
// Content
// - Add missing Infi exams
// - Add Discrete Mathematics course
// - Sort topics by order in the course material
// - Update readme file
//
// Editing & quality
// - Review and fix wording of Infi questions against the original exam
// - Algebra exams audited 2006–2026. A few fuzzy-OCR reconstructions still want a
//   second look vs a clean copy: 2021_א Q2ב bilinear form, 2021w_ב Q7 wording,
//   2019_א Q1ב B(1,4) entry, 2018_ב Q5, 2014_ג Q5 matrix, 2013_ב Q12 claim.
// - ExamHeader renders `מבנה {exam.chapter_structure}` but no exam has that field,
//   so every card shows "מבנה undefined". Drop the field or populate it.
//
// Known limitations (current behavior, not bugs)
// - useStats aggregates only the primary `topic`; subpart topics and the optional
//   `topics: []` array are not counted.
// - Exams spanning two semesters need deeper handling in both data and code.
