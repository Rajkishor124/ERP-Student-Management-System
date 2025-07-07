import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/ConfirmModal"; // Make sure the path is correct

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/admin/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedStudent) return;

    try {
      await axiosInstance.delete(`/admin/students/${selectedStudent.id}`);
      toast.success("Student deleted successfully.");
      setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    } finally {
      setShowModal(false);
      setSelectedStudent(null);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Student List</h2>
        <Link
          to="/admin/students/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </Link>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Dept</th>
              <th className="border px-4 py-2">Semester</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.rollNumber}</td>
                <td className="border px-4 py-2">{student.department}</td>
                <td className="border px-4 py-2">{student.semester}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/admin/students/edit/${student.id}`}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    ✏ Edit
                  </Link>
                  <button
                    onClick={() => confirmDelete(student)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteConfirmed}
        message={`Are you sure you want to delete "${selectedStudent?.name}"?`}
      />
    </div>
  );
}

export default Students;
