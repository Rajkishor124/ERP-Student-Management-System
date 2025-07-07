import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

const courseOptions = ["DIPLOMA", "BTECH", "MTECH"];
const departments = ["CSE", "CIVIL", "MECHANICAL", "AUTOMOBILE", "ECE", "EEE"];
const semesters = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    course: "",
    department: "",
    semester: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchStudent = async () => {
    try {
      const res = await axiosInstance.get(`/admin/students/${id}`);
      setFormData(res.data);
    } catch (error) {
      toast.error("Failed to load student details.");
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/admin/students/${id}`, formData);
      toast.success("Student updated successfully!");
      navigate("/admin/students");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Student</h2>
        <Link
          to="/admin/students"
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "rollNumber"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        {/* Course Dropdown */}
        <div>
          <label className="block mb-1">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Course</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="block mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Dropdown */}
        <div>
          <label className="block mb-1">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Student"}
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
