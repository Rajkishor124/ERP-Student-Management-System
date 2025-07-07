import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/ConfirmModal";

export default function IssueBooks() {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [form, setForm] = useState({ bookId: "", studentId: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedIssuedBookId, setSelectedIssuedBookId] = useState(null);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [booksRes, studentsRes, issuedRes] = await Promise.all([
        axiosInstance.get("/books"),
        axiosInstance.get("/students"),
        axiosInstance.get("/library/all"),
      ]);
      setBooks(booksRes.data);
      setStudents(studentsRes.data);
      setIssuedBooks(issuedRes.data);
    } catch (err) {
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIssue = async () => {
    try {
      await axiosInstance.post("/library/issue", form);
      toast.success("Book issued successfully");
      setForm({ bookId: "", studentId: "" });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to issue book");
    }
  };

  const handleReturnClick = (issuedBookId) => {
    setSelectedIssuedBookId(issuedBookId);
    setConfirmOpen(true);
  };

  const handleReturnConfirm = async () => {
    try {
      await axiosInstance.post(`/library/return/${selectedIssuedBookId}`);
      toast.success("Book returned successfully");
      loadData();
    } catch (err) {
      toast.error("Failed to return book");
    } finally {
      setConfirmOpen(false);
      setSelectedIssuedBookId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📚 Issue Book</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/admin/library/add")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ➕ Add Book
          </button>
          <button
            onClick={() => navigate("/admin/library")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            📖 View Library
          </button>
        </div>
      </div>

      {/* Issue Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - {s.rollNumber}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={form.bookId}
          onChange={(e) => setForm({ ...form, bookId: e.target.value })}
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} ({b.availableCopies} left)
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleIssue}
        >
          Issue
        </button>
      </div>

      {/* Issued Books List */}
      <h2 className="text-xl font-semibold mb-2">📋 Currently Issued Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Book</th>
              <th className="py-2 px-4 border">Student</th>
              <th className="py-2 px-4 border">Issue Date</th>
              <th className="py-2 px-4 border">Due Date</th>
              <th className="py-2 px-4 border">Returned</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.length > 0 ? (
              issuedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="py-2 px-4 border">{book.bookTitle}</td>
                  <td className="py-2 px-4 border">{book.studentName}</td>
                  <td className="py-2 px-4 border">{book.issueDate}</td>
                  <td className="py-2 px-4 border">{book.dueDate}</td>
                  <td className="py-2 px-4 border">
                    {book.returned ? "✅ Yes" : "❌ No"}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {!book.returned && (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => handleReturnClick(book.id)}
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">
                  No books issued yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Return Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Confirm Return"
        message="Are you sure this book has been returned?"
        onConfirm={handleReturnConfirm}
        onClose={() => setConfirmOpen(false)}
        confirmText="Yes, Return"
        cancelText="Cancel"
        confirmColor="bg-green-600 hover:bg-green-700"
        icon="📘"
      />
    </div>
  );
}
