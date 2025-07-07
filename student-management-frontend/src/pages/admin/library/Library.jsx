import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import ConfirmModal from "../../../components/ConfirmModal";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get("/books");
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedBookId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/books/${selectedBookId}`);
      toast.success("Book deleted");
      setBooks((prev) => prev.filter((book) => book.id !== selectedBookId));
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      let msg;
      if (backendMessage?.includes("currently issued")) {
        msg = "You can't delete this book because it was issued to students.";
      } else if (backendMessage?.includes("not found")) {
        msg = "Book not found. It may have already been deleted.";
      } else {
        msg = backendMessage || "Something went wrong while deleting the book.";
      }
      toast.error(msg);
    } finally {
      setConfirmOpen(false);
      setSelectedBookId(null);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Library Books</h1>
        <div className="space-x-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/admin/library/issue")}
          >
            📚 Issue Book
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => navigate("/admin/library/add")}
          >
            ➕ Add Book
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">ISBN</th>
                <th className="py-2 px-4 border-b">Available</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{book.title}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.isbn}</td>
                  <td className="py-2 px-4 border-b">{book.availableCopies}</td>
                  <td className="py-2 px-4 border-b">{book.totalCopies}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Link
                      to={`/admin/library/edit/${book.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(book.id)}
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
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Book"
        message="This book will be permanently removed."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
        icon="🗑️"
      />
    </div>
  );
}
