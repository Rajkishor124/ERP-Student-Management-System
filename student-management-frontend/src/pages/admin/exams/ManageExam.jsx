import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageExam() {
  const navigate = useNavigate();
  const { id } = useParams(); // exam ID for edit, undefined for add

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "",
    durationMinutes: "",
    course: "",
    department: "",
    semester: "",
  });

  useEffect(() => {
    if (isEdit) {
      axiosInstance.get(`/exams/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => toast.error("Failed to load exam"));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axiosInstance.put(`/exams/${id}`, form);
        toast.success("Exam updated successfully!");
      } else {
        await axiosInstance.post("/exams", form);
        toast.success("Exam created successfully!");
      }

      navigate("/admin/exams");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save exam";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-4">
      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Exam" : "Add Exam"}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Exam Title"
          required
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="durationMinutes"
          value={form.durationMinutes}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="semester"
          value={form.semester}
          onChange={handleChange}
          placeholder="Semester (optional)"
          className="border p-2 rounded"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/exams")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
