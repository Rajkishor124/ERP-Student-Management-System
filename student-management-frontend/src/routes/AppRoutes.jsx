import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Public pages
import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";
import NotFound from "../pages/auth/NotFound";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Layouts
import AdminLayout from "../sidebar/AdminSidebar";
import StudentLayout from "../sidebar/StudentSidebar";

// Admin pages
import AdminDashboard from "../pages/admin/layout/AdminDashboard";
import Students from "../pages/admin/student/Students";
import AddStudent from "../pages/admin/student/AddStudent";
import EditStudent from "../pages/admin/student/EditStudent";
import MarkAttendance from "../pages/admin/attendance/MarkAttendance";
import Results from "../pages/admin/exams/Results";
import IssueBooks from "../pages/admin/library/IssueBooks";
import AddBook from "../pages/admin/library/AddBook";
import Library from "../pages/admin/library/Library";
import ExamList from "../pages/admin/exams/ExamList";
import ManageExam from "../pages/admin/exams/ManageExam";

// Student pages
import StudentDashboard from "../pages/student/layout/StudentDashboard";
import Profile from "../pages/student/self/Profile";
import StudentAttendance from "../pages/student/attendance/StudentAttendance";
import StudentExamList from "../pages/student/exams/StudentExamList";
import StudentLibrary from "../pages/student/library/StudentLibrary";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="attendance" element={<MarkAttendance />} />
          <Route path="results" element={<Results />} />
          <Route path="library" element={<Library />} />
          <Route path="library/add" element={<AddBook />} />
          <Route path="library/issue" element={<IssueBooks />} />
          <Route path="exams" element={<ExamList />} />
          <Route path="exams/add" element={<ManageExam />} />
          <Route path="exams/edit/:id" element={<ManageExam />} />
        </Route>
      </Route>

      {/* Student Routes */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_STUDENT"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="exams" element={<StudentExamList />} />
          <Route path="library" element={<StudentLibrary />} />
          <Route path="timetable" element={<div>Timetable</div>} />
          <Route path="results" element={<div>Results</div>} />
          <Route path="fees" element={<div>Fees</div>} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
