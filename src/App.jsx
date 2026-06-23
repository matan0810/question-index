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
// - Add Discrete Mathematics course
// - update infi to the new format, of algebra
// - make chapter and type chips clickable to filter by them
// - when click on a type or other chip or link dont clean the last year on not it the material filters. (the V filters basically)
// - Dont write "Excluded" in the question text, instead think of a better way to show that the question is not in the syllabus
// - Show questions subparts in better way
// - add unitests
