// src/pages/NotFound.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NotFound() {
  const navigate = useNavigate();
  const { role } = useAuth();

  const goToDashboard = () => {
    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "STUDENT") {
      navigate("/student/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goToDashboard}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </button>
        
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;