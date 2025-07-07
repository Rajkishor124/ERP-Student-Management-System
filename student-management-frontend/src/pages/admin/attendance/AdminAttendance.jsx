// src/pages/admin/AdminAttendance.jsx

import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

function AdminAttendance() {
  const [students, setStudents] = useState([]);
  const [marking, setMarking] = useState({}); // To show loading spinner per student
  const [markedToday, setMarkedToday] = useState({}); // Track today's marked attendance

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get("/admin/students");
        setStudents(res.data);
      } catch (err) {
        toast.error("Failed to load students");
      }
    };
    fetchStudents();
  }, []);

  const markAttendance = async (studentId, status) => {
    setMarking((prev) => ({ ...prev, [studentId]: true }));
    try {
      await axiosInstance.post("/attendance/mark", null, {
        params: { studentId, status },
      });
      toast.success(`Marked ${status} for student ID ${studentId}`);
      setMarkedToday((prev) => ({ ...prev, [studentId]: status }));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to mark attendance"
      );
    } finally {
      setMarking((prev) => ({ ...prev, [studentId]: false }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Mark Attendance</h1>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Roll Number</th>
                <th className="py-2 px-4 border-b text-left">Department</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.rollNumber}</td>
                  <td className="py-2 px-4 border-b">{student.department}</td>
                  <td className="py-2 px-4 border-b">
                    {markedToday[student.id] ? (
                      <span className={`font-semibold ${markedToday[student.id] === "PRESENT" ? "text-green-600" : "text-red-600"}`}>
                        {markedToday[student.id]}
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => markAttendance(student.id, "PRESENT")}
                          disabled={marking[student.id]}
                          className="mr-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          {marking[student.id] === true ? "Marking..." : "Present"}
                        </button>
                        <button
                          onClick={() => markAttendance(student.id, "ABSENT")}
                          disabled={marking[student.id]}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          {marking[student.id] === true ? "Marking..." : "Absent"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminAttendance;
