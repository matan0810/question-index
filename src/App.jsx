import {
  HashRouter,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import { CourseProvider } from "./context/CourseContext";
import { COURSE_REGISTRY } from "./courses/index";
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
      <Routes>
        <Route path="/" element={<CoursePicker />} />
        <Route path="/course/:courseId" element={<CourseLoader />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

// TODO:
// - refactor entire state management to be more efficient
// - refactor entire codebase to be more readable, maintainable, and componentized
// - make footer to be on open page and not on course page
// - go over algebra test and make sure all questions are correct and well worded and organized
// - add the rest of infi tests
// - add descrete math course
// - remove all the old code and comments that are no longer relevant
// - use meaningful variable and function names
// - add error handling and loading states where necessary
// - remove lecturers from open page and only show them on course page
// - make alex recent lecturer on algebra (fined out a good way to do this without hardcoding it)
