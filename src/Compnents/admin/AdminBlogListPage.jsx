// src/admin/pages/AdminBlogListPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Ensure react-hot-toast is installed and configured in App.jsx
import { Edit, Trash2, PlusCircle, Calendar, User, Tag } from "lucide-react";

const AdminBlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a refetch trigger for better control over data fetching
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    fetchBlogs();
  }, [refetchTrigger]); // Depend on refetchTrigger

  const fetchBlogs = async () => {
    setError(null); // Clear previous errors
    setLoading(true);
    try {
      // Use the full absolute URL for fetching blogs
      const res = await axios.get("https://jrtinker01.onrender.com/api/blogs"); // <--- CORRECTED FETCH URL

      // --- IMPROVED DATA PARSING (keep this, it's good) ---
      let fetchedBlogsArray = [];
      if (res.data && Array.isArray(res.data.data)) {
        // If the backend wraps the array in a 'data' property
        fetchedBlogsArray = res.data.data;
      } else if (Array.isArray(res.data)) {
        // If the backend directly returns an array
        fetchedBlogsArray = res.data;
      } else if (res.data && Array.isArray(res.data.blogs)) {
        // If the backend wraps the array in a 'blogs' property
        fetchedBlogsArray = res.data.blogs;
      } else {
        // Fallback for unexpected formats, but log a warning
        console.warn(
          "API response for /api/blogs is not a direct array, nor nested under 'data' or 'blogs'. Received:",
          res.data
        );
        fetchedBlogsArray = []; // Ensure it's always an array
      }
      // --- END IMPROVED DATA PARSING ---

      setBlogs(fetchedBlogsArray);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      // More specific error handling
      if (err.response) {
        setError(err.response.data.message || `Error: ${err.response.status}`);
        toast.error(err.response.data.message || "Failed to fetch blogs.");
      } else if (err.request) {
        setError("Network error: No response from server. Check connection.");
        toast.error("Network error: Could not connect to server.");
      } else {
        setError("An unexpected error occurred while setting up the request.");
        toast.error("An unexpected error occurred.");
      }
      setBlogs([]); // Ensure blogs is an empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        // !!! IMPORTANT: CHANGE THIS LINE TO USE THE ABSOLUTE URL
        await axios.delete(`https://jrtinker01.onrender.com/api/blogs/${id}`); // <--- CRITICAL FIX HERE
        toast.success(`Blog "${title}" deleted successfully!`);
        setRefetchTrigger((prev) => prev + 1); // Trigger re-fetch
      } catch (err) {
        console.error("Error deleting blog:", err);
        toast.error(err.response?.data?.message || "Failed to delete blog.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col items-center">
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
          <p className="mt-4 text-xl text-gray-700">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="text-center p-8 rounded-lg bg-white shadow-md">
          <p className="text-2xl font-semibold text-red-600 mb-4">Error!</p>
          <p className="text-lg text-gray-700">{error}</p>
          <button
            onClick={fetchBlogs}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-[#2e3d62] tracking-tight">
          Blog Management
        </h1>
        <Link
          to="/admin/blogs/new"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-xl mb-4">
            No blog posts found. Time to create some compelling content!
          </p>
          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                  Slug: <span className="font-mono">{blog.slug}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-medium">Category:</span>{" "}
                    {blog.category}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-medium">Author:</span> {blog.author}
                  </div>
                  <div className="flex items-center col-span-2">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="font-medium">Published:</span>{" "}
                    {new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {/* Tags if you have them in blog.tags (assuming it's an array) */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 p-4 flex justify-end gap-3 bg-gray-50">
                <Link
                  to={`/admin/blogs/edit/${blog._id}`}
                  className="flex items-center justify-center p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition duration-150 ease-in-out tooltip"
                  title="Edit Blog"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(blog._id, blog.title)}
                  className="flex items-center justify-center p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-150 ease-in-out tooltip"
                  title="Delete Blog"
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

export default AdminBlogListPage;