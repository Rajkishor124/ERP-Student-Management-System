import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const StudentLayout = () => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  
  const handleLinkClick = () => {
    closeSidebar();
  };

  const getNavLinkClass = (isActive) =>
    isActive
      ? "block px-4 py-2 bg-blue-100 text-blue-700 font-medium"
      : "block px-4 py-2 text-gray-700 hover:bg-gray-100";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar
        title="Student Portal"
        user={user}
        onLogout={logout}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 fixed md:static z-30 w-64 bg-white shadow-md flex flex-col h-full`}
        >
          <div className="p-4 text-xl font-bold text-blue-600 border-b flex justify-between items-center">
            <span>Student Dashboard</span>
            <button onClick={closeSidebar} className="md:hidden">
              ✕
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-between py-4">
            <div className="space-y-1">
              {/* UPDATED LINKS WITH /student/ PREFIX */}
              <NavLink
                to="/student/dashboard"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/student/profile"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Profile
              </NavLink>
              <NavLink
                to="/student/timetable"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Timetable
              </NavLink>
              <NavLink
                to="/student/attendance"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Attendance
              </NavLink>
              <NavLink
                to="/student/results"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Results
              </NavLink>
              <NavLink
                to="/student/fees"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Fees
              </NavLink>
              <NavLink
                to="/student/library"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Library
              </NavLink>
              <NavLink
                to="/student/exams"
                className={({ isActive }) => getNavLinkClass(isActive)}
                onClick={handleLinkClick}
              >
                Examination
              </NavLink>
            </div>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="w-full text-red-600 hover:bg-red-50 p-2 rounded flex items-center"
            >
              <span className="mr-2">🚪</span> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
