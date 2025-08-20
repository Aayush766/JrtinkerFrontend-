import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { List, Book, Users, Mail, Clock, UserCheck, UserPlus } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCourses: 0,
    totalBlogs: 0,
    totalTeachers: 0,
    totalContactForms: 0,
    totalBookedSlots: 0,
    totalUsers: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <-- FIX: Added an error state

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          coursesRes,
          blogsRes,
          teachersRes,
          contactFormsRes,
          bookedSlotsRes,
          usersRes,
          enrollmentsRes,
        ] = await Promise.all([
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/courses", { withCredentials: true }),
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/blogs", { withCredentials: true }),
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/teachers", { withCredentials: true }),
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/contact-forms", { withCredentials: true }),
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/booked-slots", { withCredentials: true }),
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/users", { withCredentials: true }),
          axios.get("https://jrtinker01.onrender.com/admin/dashboard/enrollments", { withCredentials: true }),
        ]);

        setDashboardData({
          // FIX: Using optional chaining (`?.`) and nullish coalescing (`??`) for safer access
          totalCourses: coursesRes.data?.courses?.length ?? 0,
          totalBlogs: blogsRes.data?.length ?? 0,
          totalTeachers: teachersRes.data?.length ?? 0,
          totalContactForms: contactFormsRes.data?.contactForms?.length ?? 0,
          totalBookedSlots: bookedSlotsRes.data?.bookedSlots?.length ?? 0,
          totalUsers: usersRes.data?.users?.length ?? 0,
          totalEnrollments: enrollmentsRes.data?.length ?? 0,
        });
        setError(null); // FIX: Clear the error state on success
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.response?.data?.message || "Failed to load dashboard data. Please check the server.");
        toast.error(
          err.response?.data?.message || "Failed to load dashboard data. Please check the server."
        );
        // FIX: Do not set dashboard data on error, it will remain at initial state
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // <-- FIX: Added conditional rendering for loading and error states -->
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg
          className="animate-spin h-10 w-10 text-[#2e3d62]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  const cardItems = [
    {
      title: "Total Courses",
      value: dashboardData.totalCourses,
      icon: <List size={32} />,
      bgColor: "bg-indigo-500",
      link: "/admin/courses",
    },
    {
      title: "Total Blogs",
      value: dashboardData.totalBlogs,
      icon: <Book size={32} />,
      bgColor: "bg-green-500",
      link: "/admin/blogs",
    },
    {
      title: "Total Teachers",
      value: dashboardData.totalTeachers,
      icon: <Users size={32} />,
      bgColor: "bg-blue-500",
      link: "/admin/teachers",
    },
    {
      title: "Contact Forms",
      value: dashboardData.totalContactForms,
      icon: <Mail size={32} />,
      bgColor: "bg-red-500",
      link: "/admin/submissions/contact",
    },
    {
      title: "Booked Slots",
      value: dashboardData.totalBookedSlots,
      icon: <Clock size={32} />,
      bgColor: "bg-yellow-500",
      link: "/admin/slots",
    },
    {
      title: "Total Users",
      value: dashboardData.totalUsers,
      icon: <UserCheck size={32} />,
      bgColor: "bg-purple-500",
      link: "/admin/users",
    },
    {
      title: "Enrollment Forms",
      value: dashboardData.totalEnrollments,
      icon: <UserPlus size={32} />,
      bgColor: "bg-orange-500",
      link: "/admin/enrollment-forms",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-30">
      <h1 className="text-4xl font-extrabold text-[#2e3d62] mb-10">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center justify-between p-6 rounded-xl shadow-lg text-white transition-transform duration-200 hover:scale-105 ${item.bgColor}`}
          >
            <div className="flex flex-col">
              <span className="text-xl font-medium mb-1">{item.title}</span>
              <span className="text-5xl font-bold">{item.value}</span>
            </div>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;