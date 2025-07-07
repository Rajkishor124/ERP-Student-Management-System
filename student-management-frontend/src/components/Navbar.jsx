import { useAuth } from "../context/AuthContext";

function Navbar({ title, user, onLogout, onToggleSidebar }) {
  return (
    <header className="bg-blue-700 text-white shadow">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden mr-2 text-white focus:outline-none"
        >
          ☰
        </button>
        
        <h1 className="text-xl font-bold">{title}</h1>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="hidden md:flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
              <span className="font-medium">{user.name || user.email}</span>
            </div>
          )}
          <button 
            onClick={onLogout}
            className="flex items-center text-sm hover:bg-blue-800 px-3 py-1 rounded transition"
          >
            <span className="mr-1">🚪</span>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;