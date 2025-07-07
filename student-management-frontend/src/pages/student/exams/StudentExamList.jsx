import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export default function StudentExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentExams = async () => {
    try {
      const res = await axiosInstance.get("/student/exams");
      setExams(res.data);
    } catch (err) {
      toast.error("Failed to load your exams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentExams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Upcoming Exams</h1>

      {loading ? (
        <p className="text-gray-600">Loading exams...</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-500">No exams scheduled for you.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Duration</th>
                <th className="py-2 px-4 border-b">Course</th>
                <th className="py-2 px-4 border-b">Department</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{exam.title}</td>
                  <td className="py-2 px-4 border-b">{exam.date}</td>
                  <td className="py-2 px-4 border-b">{exam.startTime}</td>
                  <td className="py-2 px-4 border-b">{exam.durationMinutes} min</td>
                  <td className="py-2 px-4 border-b">{exam.course}</td>
                  <td className="py-2 px-4 border-b">{exam.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
