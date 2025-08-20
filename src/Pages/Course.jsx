import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../Compnents/Skeleton"; // Assuming this path is correct
import { FaUserGraduate, FaRegClock, FaArrowRight } from "react-icons/fa";
import { MdCalendarViewMonth } from "react-icons/md";
import { motion } from "framer-motion";
import { RiPriceTag3Fill } from "react-icons/ri";
import { useCourses } from "../Context/CourseProvider"; // Assuming this path is correct
import { Helmet } from "react-helmet-async";

const Courses = () => {
  const { loading, courses } = useCourses();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.03, // Slightly reduced scale for a more subtle effect
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <Helmet>
        <title>Our Courses - Jr. Tinker STEM Programs for Kids</title>
        <meta name="description" content="Explore age-inclusive STEM programs at Jr. Tinker. Find courses in robotics, coding, AI, and more that grow with your child." />
        <link rel="canonical" href="https://jrtinker.com/courses" />
      </Helmet>

      <section className="w-full pt-32 sm:pt-40 pb-20">
        <div className="px-4 md:px-8">
          {loading ? (
            <Skeleton />
          ) : (
            <section className="container mx-auto">
              {/* Section Heading */}
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 font-salsa">
                  One Path.{" "}
                  <span className="text-indigo-600">Infinite Possibilities.</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover our range of age-inclusive STEM programs, designed to grow with your child's curiosity and skills.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses &&
                  courses.map((course, index) => (
                    // FIX 1: The entire card is now a link that uses course.slug
                    <Link to={`/courses/${course.slug}`} key={course._id || index}>
                      <motion.div
                        className="relative group bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover="hover"
                      >
                        {/* Image Section */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={course.courseImage.replace(
                              "/upload/",
                              "/upload/w_432,h_256,c_fill,f_auto,q_auto/"
                            )}
                            alt={course.courseName}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            style={{
                              maskImage: `url("/images/background/bg-img-courses.png")`,
                              maskPosition: "center center",
                              maskRepeat: "no-repeat",
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col items-center text-center flex-grow">
                          <h2 className="text-2xl font-semibold text-gray-800 transition-colors duration-300 mb-3 font-salsa group-hover:text-indigo-600">
                            {course.courseName}
                          </h2>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                            {course.courseDescription}
                          </p>

                          {/* Divider */}
                          <div className="w-16 h-1 bg-indigo-500 rounded-full mb-6"></div>

                          {/* Course Details */}
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full text-left mb-8">
                            <div className="flex items-center gap-2">
                              <FaUserGraduate className="text-xl text-indigo-600" />
                              <p className="text-base font-medium text-gray-700">
                                Age {`${course.ageGroup.min}-${course.ageGroup.max}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <MdCalendarViewMonth className="text-xl text-cyan-500" />
                              <p className="text-base font-medium text-gray-700">
                                {`${Math.ceil(course.courseDuration / 20)} months`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <RiPriceTag3Fill className="text-xl text-orange-500" />
                              <p className="text-base font-medium text-gray-700">
                                ₹{course.coursePrice}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaRegClock className="text-xl text-yellow-500" />
                              <p className="text-base font-medium text-gray-700">
                                {`${course.courseDuration} sessions`}
                              </p>
                            </div>
                          </div>

                          {/* FIX 2: Added a clear "View Course" button */}
                          <div className="mt-auto w-full">
                             <div className="inline-flex items-center gap-2 w-full justify-center text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md group-hover:bg-indigo-700 transition-colors duration-300">
                                View Course <FaArrowRight />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;