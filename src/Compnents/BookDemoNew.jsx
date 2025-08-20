import React, { useState, useEffect } from "react";

const BookDemoNew = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    date: "",
    time: "",
  });

  const timeSlots = ["10AM", "11AM", "12PM", "1PM", "2PM"];

  // Get today's date in YYYY-MM-DD format
  const getToday = () => new Date().toISOString().split("T")[0];

  // Fetch all available courses from backend
  useEffect(() => {
    fetch("https://jrtinker01.onrender.com/admin/course-dashboard/all-courses") // adjust the route as needed
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://jrtinker01.onrender.com/create-slot-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Slot booked successfully!");
        setFormData({ courseId: "", date: "", time: "" });
      } else {
        alert(result.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 pt-64 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course selection */}
        <div>
          <label className="block font-medium">Select Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">-- Choose a course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Date selection */}
        <div>
          <label className="block font-medium">Select Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getToday()}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Time slot */}
        <div>
          <label className="block font-medium">Select Time</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">-- Choose time --</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Book Slot
        </button>
      </form>
    </div>
  );
};

export default BookDemoNew;
