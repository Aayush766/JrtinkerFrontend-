import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Home, List, Book, Users, LogOut, Clock, UserCheck, UserPlus, Mail } from "lucide-react";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("admin-user"));
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      toast.error("You must be an admin to access this page.");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin-user");
    toast.success("Logged out successfully.");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2e3d62] text-white p-6 flex flex-col mt-30">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <Home className="w-5 h-5 mr-3 text-white" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/blogs"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <Book className="w-5 h-5 mr-3 text-white" /> Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <List className="w-5 h-5 mr-3 text-white"  /> Courses
              </Link>
            </li>
            <li>
              <Link
                to="/admin/teachers"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <Users className="w-5 h-5 mr-3 text-white" /> Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/admin/slots"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <Clock className="w-5 h-5 mr-3 text-white" /> Booked Slots
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <UserCheck className="w-5 h-5 mr-3 text-white" /> All Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/enrollment-forms"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <UserPlus className="w-5 h-5 mr-3 text-white" /> Enrollment Forms
              </Link>
            </li>
            <li>
              <Link
                to="/admin/contact-forms"
                className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 text-white"
              >
                <Mail className="w-5 h-5 mr-3 text-white" /> Contact Forms
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2.5 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition duration-150 mt-4"
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </button>
      </aside>

      {/* Main content area */}
      <main className="flex-grow p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;