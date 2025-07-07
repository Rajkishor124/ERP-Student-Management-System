import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal";

export default function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const navigate = useNavigate();

  const fetchExams = async () => {
    try {
      const res = await axiosInstance.get("/exams");
      setExams(res.data);
    } catch (err) {
      toast.error("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedExamId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/exams/${selectedExamId}`);
      toast.success("Exam deleted successfully");
      setExams((prev) => prev.filter((e) => e.id !== selectedExamId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete exam");
    } finally {
      setConfirmOpen(false);
      setSelectedExamId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📋 Exam Schedule</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/admin/exams/add")}
        >
          ➕ Add Exam
        </button>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading exams...</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-600">No exams scheduled.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Start Time</th>
                <th className="py-2 px-4 border-b">Duration</th>
                <th className="py-2 px-4 border-b">Course</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{exam.title}</td>
                  <td className="py-2 px-4 border-b">{exam.date}</td>
                  <td className="py-2 px-4 border-b">{exam.startTime}</td>
                  <td className="py-2 px-4 border-b">{exam.durationMinutes} mins</td>
                  <td className="py-2 px-4 border-b">{exam.course}</td>
                  <td className="py-2 px-4 border-b">{exam.department}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Link
                      to={`/admin/exams/edit/${exam.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(exam.id)}
                      className="text-red-600 hover:underline"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        message="Are you sure you want to delete this exam?"
        onConfirm={handleDeleteConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}
