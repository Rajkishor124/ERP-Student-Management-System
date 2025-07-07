import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Unauthorized() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      navigate("/login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page. You'll be automatically
          redirected to the login page in 10 seconds.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;