import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircleArrowOutUpRight } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const allCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jrtinker01.onrender.com/admin/course-dashboard/all-courses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("all courses data: ", data);
        setCourses(data.courses);
      }
    } catch (error) {
      console.log("all courses error: ", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCourses();
  }, []);

  return (
    <motion.section className="w-full min-h-screen flex flex-col items-center py-16  bg-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 ">
        Fun & Exciting Courses!
      </h1> 
      {loading ? (
        <p className=" text-xl">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 ">
          {courses.slice(0,6).map((course) => (
            <motion.div
              key={course._id} 
              whileHover={{ scale: 1.05 }}
              className={`relative w-80 h-60 bg-blue-500 rounded-xl p-6 flex items-center justify-center shadow-lg shadow-blue-500/50`}
            >
              <div className="absolute inset-0 bg-opacity-30 rounded-xl"></div>
              <h2 className="relative text-white text-2xl font-bold text-center">
                {course.courseName}
              </h2>
              <CircleArrowOutUpRight className="absolute bottom-4 right-4 text-white text-3xl" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Courses;
