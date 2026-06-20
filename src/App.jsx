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

// TODO:
//
// CONTENT:
// - Add remaining Calculus (Infi) exams
// - Add Discrete Math course
//
// FIXES:
// - Fix mislabeled Algebra exam "2026_sample_I": replace moed "sample" with its actual moed
//   (currently sorted last because "sample" doesn't match any real moed)
//
// QUALITY:
// - Review and correct Algebra & Calculus question wording to match the original exam phrasing
//
// EDGE CASE — Multi-topic sections:
// - Some sections cover two unrelated topics (even within the same section number). שאלה 3 ראיה: 2019 מועד ב
//   Resolution options:
//   (a) Split into two separate questions
//   (b) Add a topic-specific tag or annotation so the question can be filtered correctly
