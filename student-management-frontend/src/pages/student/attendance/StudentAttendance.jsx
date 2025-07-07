import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

function StudentAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axiosInstance.get("/attendance/my"); // preferred endpoint
        setAttendanceRecords(res.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError("Failed to load attendance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Attendance Report</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : attendanceRecords.length === 0 ? (
        <p className="text-gray-600">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id}>
                  <td className="py-2 px-4 border-b">{record.date}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        record.status === "PRESENT"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {record.status === "PRESENT" ? "✅ Present" : "❌ Absent"}
                    </span>
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

export default StudentAttendance;
