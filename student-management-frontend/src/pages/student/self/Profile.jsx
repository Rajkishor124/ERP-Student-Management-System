import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/students/profile");
        setStudent(res.data);
      } catch (error) {
        console.error("Failed to load profile", error);
        setError("Failed to load student profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600 animate-pulse">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600 font-semibold">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
            {student.name?.charAt(0)}
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">{student.name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div>
            <span className="block text-sm text-gray-500">Roll Number</span>
            <span className="text-base font-medium text-gray-700">{student.rollNumber || "N/A"}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Department</span>
            <span className="text-base font-medium text-gray-700">{student.department || "N/A"}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Course</span>
            <span className="text-base font-medium text-gray-700">{student.course || "N/A"}</span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Semester</span>
            <span className="text-base font-medium text-gray-700">{student.semester || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
