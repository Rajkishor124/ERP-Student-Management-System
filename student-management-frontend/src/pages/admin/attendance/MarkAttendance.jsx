import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const departments = ["CSE", "CIVIL", "MECHANICAL", "AUTOMOBILE", "ECE", "EEE"];
const courses = ["B.Tech", "M.Tech", "Diploma"];

export default function MarkAttendance() {
  const [filters, setFilters] = useState({
    course: "",
    department: "",
    search: "",
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markedToday, setMarkedToday] = useState({}); // { studentId: true/false }

  const fetchFilteredStudents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.course.trim()) params.course = filters.course.trim();
      if (filters.department.trim())
        params.department = filters.department.trim();
      if (filters.search.trim()) params.search = filters.search.trim();

      const res = await axiosInstance.get("/students/filter", { params });
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (studentId, status) => {
    try {
      await axiosInstance.post(`/attendance/mark`, null, {
        params: { studentId, status },
      });
      toast.success(`Marked ${status} for student ID ${studentId}`);
      setMarkedToday((prev) => ({ ...prev, [studentId]: true }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark attendance");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={filters.course}
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={filters.department}
          onChange={(e) =>
            setFilters({ ...filters, department: e.target.value })
          }
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by name or roll no."
          className="border p-2 rounded"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={fetchFilteredStudents}
        >
          Search
        </button>
      </div>

      {/* Student Table */}
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Roll No</th>
                <th className="py-2 px-4 border-b">Course</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-2 px-4 border-b">{student.name}</td>
                    <td className="py-2 px-4 border-b">{student.rollNumber}</td>
                    <td className="py-2 px-4 border-b">{student.course}</td>
                    <td className="py-2 px-4 border-b">{student.department}</td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() =>
                          handleMarkAttendance(student.id, "PRESENT")
                        }
                        className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                        disabled={markedToday[student.id]}
                      >
                        Present
                      </button>
                      <button
                        onClick={() =>
                          handleMarkAttendance(student.id, "ABSENT")
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                        disabled={markedToday[student.id]}
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
