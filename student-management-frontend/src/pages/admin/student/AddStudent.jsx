import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

function AddStudent() {
  const navigate = useNavigate();

  const courseOptions = ["DIPLOMA", "BTECH", "MTECH"];
  const departmentOptions = ["CSE", "CIVIL", "MECHANICAL", "AUTOMOBILE", "ECE", "EEE"];
  const semesterOptions = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    course: courseOptions[0],
    department: departmentOptions[0],
    semester: semesterOptions[0],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/admin/students", formData);
      toast.success("Student created successfully!");
      navigate("/admin/students");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creating student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow relative">
      {/* Close / Back Button */}
      <Link
        to="/admin/students"
        className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
        title="Back"
      >
        ×
      </Link>

      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
        />

        {/* Course Dropdown */}
        <SelectField
          label="Course"
          name="course"
          value={formData.course}
          options={courseOptions}
          onChange={handleChange}
        />

        {/* Department Dropdown */}
        <SelectField
          label="Department"
          name="department"
          value={formData.department}
          options={departmentOptions}
          onChange={handleChange}
        />

        {/* Semester Dropdown */}
        <SelectField
          label="Semester"
          name="semester"
          value={formData.semester}
          options={semesterOptions}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

// Reusable Text Input Field
function InputField({ label, name, value, onChange, type = "text", error }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// Reusable Dropdown Field
function SelectField({ label, name, value, options, onChange }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddStudent;
