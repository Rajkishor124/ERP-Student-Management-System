import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    totalCopies: 1,
    availableCopies: 1,
    category: "",
    publisher: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "totalCopies" || name === "availableCopies" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/books", form);
      toast.success("Book added successfully!");
      navigate("/admin/library");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-4">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/library")}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Library
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="totalCopies"
          placeholder="Total Copies"
          min="1"
          value={form.totalCopies}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="availableCopies"
          placeholder="Available Copies"
          min="1"
          value={form.availableCopies}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={form.publisher}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
