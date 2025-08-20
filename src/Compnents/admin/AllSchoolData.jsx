import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash2, School, Mail, Phone, User } from "lucide-react";

const AllSchoolData = () => {
  const [schoolSubmissions, setSchoolSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    fetchSchoolSubmissions();
  }, [refetchTrigger]);

  const fetchSchoolSubmissions = async () => {
    setError(null);
    setLoading(true);
    try {
      // This URL should match the admin route you created for school submissions
      const res = await axios.get("https://jrtinker01.onrender.com/admin/submissions/school");

      let fetchedSubmissions = [];
      if (res.data && Array.isArray(res.data.schoolForms)) {
        fetchedSubmissions = res.data.schoolForms;
      } else if (Array.isArray(res.data)) {
        fetchedSubmissions = res.data;
      } else {
        console.warn(
          "API response for school submissions is not an array, received:",
          res.data
        );
        fetchedSubmissions = [];
      }
      setSchoolSubmissions(fetchedSubmissions);
    } catch (err) {
      console.error("Error fetching school submissions:", err);
      setError(err.response?.data?.message || "Failed to fetch school submissions.");
      toast.error(err.response?.data?.message || "Failed to fetch school submissions.");
      setSchoolSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, schoolName) => {
    if (window.confirm(`Are you sure you want to delete the submission from "${schoolName}"?`)) {
      try {
        // You will need to create a new DELETE endpoint for school submissions
        await axios.delete(`https://jrtinker01.onrender.com/admin/submissions/school/${id}`);
        toast.success(`Submission from "${schoolName}" deleted successfully!`);
        setRefetchTrigger((prev) => prev + 1); // Trigger re-fetch
      } catch (err) {
        console.error("Error deleting school submission:", err);
        toast.error(err.response?.data?.message || "Failed to delete submission.");
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
        <p className="ml-4 text-xl text-gray-700">Loading school submissions...</p>
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
            onClick={fetchSchoolSubmissions}
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
          School Submission Forms
        </h1>
      </div>

      {schoolSubmissions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-xl mb-4">
            No school submission forms have been received yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schoolSubmissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {submission.schoolName}
                </h2>
                
                <div className="flex-grow space-y-2 text-sm text-gray-700">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{submission.contactPersonName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{submission.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{submission.contactNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <School className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{submission.city}</span>
                  </div>
                  {submission.message && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-md">
                      <p className="font-medium text-gray-800">Message:</p>
                      <p className="text-gray-600">{submission.message}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 p-4 flex justify-end gap-3 bg-gray-50">
                <button
                  onClick={() => handleDelete(submission._id, submission.schoolName)}
                  className="flex items-center justify-center p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150 ease-in-out tooltip"
                  title="Delete Submission"
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

export default AllSchoolData;