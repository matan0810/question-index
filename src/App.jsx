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
// - add the rest of infi tests
// - add descrete math course
// - improve the wording of algebra and infi questions so that they are accurate to the original
// - fix the algebra "2026_sample_I" exam: replace moed "sample" with its real moed (it's a mislabeled session; currently sorted last as an exception)
