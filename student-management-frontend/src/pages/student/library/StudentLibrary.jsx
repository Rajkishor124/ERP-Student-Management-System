import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export default function StudentLibrary() {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, issuedRes] = await Promise.all([
          axiosInstance.get("student/library/books"),
          axiosInstance.get("student/library/my-books"),
        ]);

        setBooks(booksRes.data);
        setIssuedBooks(issuedRes.data);
      } catch (err) {
        toast.error("Failed to load library data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-blue-700">📚 Library</h1>

      {/* Available Books */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Available Books</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Author</th>
                <th className="py-2 px-4 border">ISBN</th>
                <th className="py-2 px-4 border">Available</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No books available.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id}>
                    <td className="py-2 px-4 border">{book.title}</td>
                    <td className="py-2 px-4 border">{book.author}</td>
                    <td className="py-2 px-4 border">{book.isbn}</td>
                    <td className="py-2 px-4 border">{book.availableCopies}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Issued Books */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Books You’ve Borrowed</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Issue Date</th>
                <th className="py-2 px-4 border">Due Date</th>
                <th className="py-2 px-4 border">Returned</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No books issued yet.
                  </td>
                </tr>
              ) : (
                issuedBooks.map((b) => (
                  <tr key={b.id}>
                    <td className="py-2 px-4 border">{b.bookTitle}</td>
                    <td className="py-2 px-4 border">{b.issueDate}</td>
                    <td className="py-2 px-4 border">{b.dueDate}</td>
                    <td className="py-2 px-4 border">
                      {b.returned ? "✅" : "❌"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
