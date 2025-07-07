import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axiosInstance.get("/admin/students");
        setStudents(res.data);
        const defaultStatus = {};
        res.data.forEach((student) => {
          defaultStatus[student.id] = "PRESENT"; // Default to present
        });
        setAttendanceStatus(defaultStatus);
      } catch (err) {
        toast.error("Failed to load students.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle status toggle
  const handleChange = (studentId, value) => {
    setAttendanceStatus((prev) => ({ ...prev, [studentId]: value }));
  };

  // Submit attendance one by one (can be optimized to batch later)
  const handleSubmit = async () => {
    try {
      const promises = students.map((student) =>
        axiosInstance.post("/attendance/mark", null, {
          params: {
            studentId: student.id,
            status: attendanceStatus[student.id],
          },
        })
      );
      await Promise.all(promises);
      toast.success("Attendance marked for all students!");
    } catch (err) {
      console.error(err);
      toast.error("Some attendance entries may have failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <>
          <table className="w-full bg-white border rounded shadow mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Roll No.</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.rollNumber}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={attendanceStatus[student.id]}
                      onChange={(e) =>
                        handleChange(student.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="PRESENT">Present</option>
                      <option value="ABSENT">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default Attendance;
