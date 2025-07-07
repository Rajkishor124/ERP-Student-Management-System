// src/pages/admin/AdminDashboard.jsx
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Manage Students" 
          description="View, add, and edit student records"
          link="/admin/students"
          linkText="Go to Students"
          bgColor="bg-blue-100"
        />
        
        <DashboardCard 
          title="Attendance" 
          description="Track and manage student attendance"
          link="/admin/attendance"
          linkText="View Attendance"
          bgColor="bg-green-100"
        />
        
        <DashboardCard 
          title="Results" 
          description="Manage student grades and reports"
          link="/admin/results"
          linkText="View Results"
          bgColor="bg-purple-100"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, description, link, linkText, bgColor }) {
  return (
    <div className={`${bgColor} rounded-lg p-5 shadow`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link 
        to={link} 
        className="inline-block bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
      >
        {linkText}
      </Link>
    </div>
  );
}