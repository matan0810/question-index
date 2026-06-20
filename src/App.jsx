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
//
// Fixes
// - Algebra exam "2026_sample_I": replace "sample" with the real exam session
//   (currently sorted last because "sample" doesn't map to a real session)
//
// Editing & quality
// - Review and fix wording of Algebra and Infi questions against the original exam
//
// Structure — edge cases
// - Questions covering two different topics in a single part (e.g. question 3, 2019 moed B)
//   Options: (a) split into two separate questions · (b) dual-tag the topic
// - Exams spanning two semesters — requires deeper handling in both the data and the code
