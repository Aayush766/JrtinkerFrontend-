import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EnrollForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the selected camp title from the navigation state
  const selectedCamp = location.state?.selectedCamp || "Summer Camp";

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phoneNumber: "",
    selectedCamp: selectedCamp,
    selectedSession: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the form data to the backend API endpoint
      const response = await axios.post(
        "https://jrtinker01.onrender.com/api/summercamp/enroll",
        formData
      );

      toast.success(response.data.message);
      // Optional: Navigate to a success page or back to the home page
      navigate("/");

    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-12 p-8 sm:p-12">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          Enroll in {selectedCamp}
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Please fill out the form below to secure your child's spot in our summer camp.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Name */}
          <div>
            <label htmlFor="studentName" className="block text-lg font-medium text-gray-700 mb-2">
              Student's Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </div>

          {/* Parent's Name */}
          <div>
            <label htmlFor="parentName" className="block text-lg font-medium text-gray-700 mb-2">
              Parent's Name
            </label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </div>
          
          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </div>

          {/* Camp Selection - Disabled as it's pre-selected */}
          <div className="md:col-span-2">
            <label htmlFor="selectedCamp" className="block text-lg font-medium text-gray-700 mb-2">
              Selected Camp
            </label>
            <input
              type="text"
              id="selectedCamp"
              name="selectedCamp"
              value={selectedCamp}
              readOnly
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Session Selection */}
          <div className="md:col-span-2">
            <label htmlFor="selectedSession" className="block text-lg font-medium text-gray-700 mb-2">
              Choose Session
            </label>
            <select
              id="selectedSession"
              name="selectedSession"
              value={formData.selectedSession}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            >
              <option value="" disabled>Select a session</option>
              <option value="1 July - 20th July">1 July - 20th July</option>
              <option value="21st July - 10 Aug">21st July - 10 Aug</option>
            </select>
          </div>

          {/* Optional Message */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
              Any Message or Special Request (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              }`}
            >
              {loading ? "Submitting..." : "Submit Enrollment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollForm;