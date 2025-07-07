import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

function AdminAttendanceReport() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axiosInstance.get("/attendance/today");
        setRecords(res.data);
      } catch (error) {
        console.error("Failed to fetch attendance", error);
        toast.error("Error loading attendance records.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Today's Attendance</h1>

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No attendance records for today.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Student Name</th>
                <th className="py-2 px-4 border-b text-left">Roll Number</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="py-2 px-4 border-b">{record.studentName}</td>
                  <td className="py-2 px-4 border-b">{record.rollNumber || "-"}</td>
                  <td className={`py-2 px-4 border-b font-semibold ${record.status === "PRESENT" ? "text-green-600" : "text-red-600"}`}>
                    {record.status}
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

export default AdminAttendanceReport;
