// src/pages/student/StudentDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/students/profile");
        setStudentData(res.data);
      } catch (error) {
        console.error("Error fetching student profile", error);
        toast.error("Failed to load student data.");
      }
    };

    fetchProfile();
  }, []);

  if (!studentData) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{studentData.name}</h1>
          <p className="text-gray-600">
            ID: {studentData.rollNumber} | {studentData.course} - {studentData.department}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Semester" value={studentData.semester} icon="📚" />
        <DashboardCard title="Attendance" value="--" icon="✅" />
        <DashboardCard title="CGPA" value="--" icon="⭐" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/student/profile"
          className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex items-center transition"
        >
          <div className="text-2xl mr-4">👤</div>
          <div>
            <h2 className="font-semibold text-lg">My Profile</h2>
            <p className="text-gray-600">View and update your personal information</p>
          </div>
        </Link>

        <Link
          to="/student/attendance"
          className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex items-center transition"
        >
          <div className="text-2xl mr-4">📊</div>
          <div>
            <h2 className="font-semibold text-lg">Attendance Report</h2>
            <p className="text-gray-600">View your attendance records</p>
          </div>
        </Link>

        <Link
          to="/student/results"
          className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex items-center transition"
        >
          <div className="text-2xl mr-4">📝</div>
          <div>
            <h2 className="font-semibold text-lg">Exam Results</h2>
            <p className="text-gray-600">Check your grades and marks</p>
          </div>
        </Link>

        <Link
          to="/student/fees"
          className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg flex items-center transition"
        >
          <div className="text-2xl mr-4">💰</div>
          <div>
            <h2 className="font-semibold text-lg">Fee Status</h2>
            <p className="text-gray-600">View and pay your semester fees</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <h3 className="text-gray-600">{title}</h3>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
