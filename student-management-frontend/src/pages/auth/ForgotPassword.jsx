// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // API call would go here
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Password Reset Sent
          </h2>
          <p className="text-gray-700 mb-6">
            We've sent instructions to reset your password to your email address.
            Please check your inbox.
          </p>
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;