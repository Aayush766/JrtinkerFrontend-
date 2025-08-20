import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Edit, Trash2, PlusCircle, Mail, Phone, BookOpen } from "lucide-react";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    fetchTeachers();
  }, [refetchTrigger]);

  const fetchTeachers = async () => {
    setError(null);
    setLoading(true);
    try {
      // This URL should match the admin route you created
      const res = await axios.get("https://jrtinker01.onrender.com/admin/dashboard/teachers");
      
      let fetchedTeachersArray = [];
      if (res.data && Array.isArray(res.data.teachers)) {
        fetchedTeachersArray = res.data.teachers;
      } else if (Array.isArray(res.data)) {
        fetchedTeachersArray = res.data;
      } else {
        console.warn(
          "API response for /admin/dashboard/teachers is not an array, received:",
          res.data
        );
        fetchedTeachersArray = [];
      }
      setTeachers(fetchedTeachersArray);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError(err.response?.data?.message || "Failed to fetch teachers.");
      toast.error(err.response?.data?.message || "Failed to fetch teachers.");
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the teacher: "${name}"?`)) {
      try {
        // You will need to create a new DELETE endpoint for teachers
        await axios.delete(`https://jrtinker01.onrender.com/admin/teachers/${id}`);
        toast.success(`Teacher "${name}" deleted successfully!`);
        setRefetchTrigger((prev) => prev + 1); // Trigger re-fetch
      } catch (err) {
        console.error("Error deleting teacher:", err);
        toast.error(err.response?.data?.message || "Failed to delete teacher.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
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
        <p className="ml-4 text-xl text-gray-700">Loading teachers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <p className="text-2xl font-semibold text-red-600 mb-4">Error!</p>
          <p className="text-lg text-gray-700">{error}</p>
          <button
            onClick={fetchTeachers}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-[#2e3d62] tracking-tight">
          Teacher Management
        </h1>
        <Link
          to="/admin/teachers/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Teacher
        </Link>
      </div>

      {teachers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-xl mb-4">
            No teachers found. Time to add some instructors!
          </p>
          <Link
            to="/admin/teachers/new"
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Add Your First Teacher
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden"
            >
              {/* Teacher Image */}
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={teacher.profilepic || "https://via.placeholder.com/150"}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {teacher.name}
                </h2>
                
                {/* Contact and Subjects */}
                <div className="flex-grow space-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{teacher.contactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-medium mr-1">Subjects:</span>
                    <span className="line-clamp-1">
                      {teacher.subjectsTaught?.join(", ") || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 p-4 flex justify-end gap-3 bg-gray-50">
                <Link
                  to={`/admin/teachers/edit/${teacher._id}`} // You'll need to create this route and component
                  className="flex items-center justify-center p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition duration-150 ease-in-out tooltip"
                  title="Edit Teacher"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(teacher._id, teacher.name)}
                  className="flex items-center justify-center p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150 ease-in-out tooltip"
                  title="Delete Teacher"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTeachers;