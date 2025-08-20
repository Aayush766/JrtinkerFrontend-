// src/pages/CourseClassDetails.jsx

import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import { motion } from "framer-motion";
import { CircleArrowOutUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const CourseClassDetails = () => {
  const { slug: courseSlug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Single loading state for both fetches
  const [error, setError] = useState(null); // Single error state

  const [otherCourses, setOtherCourses] = useState([]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!courseSlug) {
        setLoading(false);
        setError("Course slug is missing from URL.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch both single course and other courses in parallel
        const [courseResponse, allCoursesResponse] = await Promise.all([
          fetch(`https://jrtinker01.onrender.com/admin/course-dashboard/course/${courseSlug}`),
          fetch("https://jrtinker01.onrender.com/admin/course-dashboard/all-courses")
        ]);

        // Handle single course response
        if (courseResponse.ok) {
          const courseData = await courseResponse.json();
          setCourse(courseData.course);
        } else {
          const errorData = await courseResponse.json();
          setError(errorData.message || "Failed to fetch course details.");
          console.error("Failed to fetch course details:", courseResponse.status, courseResponse.statusText);
          setCourse(null); // Ensure course is null on error
        }

        // Handle all courses response
        if (allCoursesResponse.ok) {
          const allCoursesData = await allCoursesResponse.json();
          const filteredCourses = allCoursesData.courses.filter(
            (courseItem) => courseItem.slug !== courseSlug
          );
          setOtherCourses(filteredCourses);
        } else {
          console.error(
            "Failed to fetch other courses:",
            allCoursesResponse.status,
            allCoursesResponse.statusText
          );
          setOtherCourses([]); // Ensure otherCourses is empty on error
        }

      } catch (err) {
        setError("Error fetching data: " + err.message);
        console.error("Error fetching data:", err);
        setCourse(null);
        setOtherCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [courseSlug]); // Only depend on courseSlug

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading course details...</div>;
  }

  if (error || !course) { // If there's an error or no course data after loading
    return <div className="text-center py-20 text-xl text-red-500">Error: {error || "Course not found."}</div>;
  }

  // Rest of your component remains largely the same
  return (
    <>
      <Helmet>
        <title>{course.metaTitle || `${course.courseName} | JRTinker Courses`}</title>
        <meta name="description" content={course.metaDescription || course.courseDescription || `Learn more about ${course.courseName} at JRTinker. ${course.courseDuration} sessions for age group ${course.ageGroup?.min}-${course.ageGroup?.max}.`} />
        {course.metaKeywords && <meta name="keywords" content={course.metaKeywords} />}
        {/* Add Open Graph and Twitter card meta tags for better social sharing previews */}
        <meta property="og:title" content={course.metaTitle || course.courseName} />
        <meta property="og:description" content={course.metaDescription || course.courseDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://jrtinker.com/courses/${course.slug}`} /> {/* Replace with your actual domain */}
        {course.courseImage && <meta property="og:image" content={course.courseImage} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={course.metaTitle || course.courseName} />
        <meta name="twitter:description" content={course.metaDescription || course.courseDescription} />
        {course.courseImage && <meta name="twitter:image" content={course.courseImage} />}

        <link rel="canonical" href={`https://jrtinker.com/courses/${course.slug}`} />
      </Helmet>
      {/* ... (rest of your JSX) ... */}
      <section className="w-full pt-20 sm:pt-32 md:pt-44">
        <img
          src="/images/heading-bg/class-bg-2.jpg"
          alt="class-bg"
          className="w-full h-auto object-cover max-h-[23rem]"
        />

        <div className="flex flex-col lg:flex-row items-start justify-between p-4 sm:p-6 lg:p-12 gap-8 max-w-7xl mx-auto">
          <div className="w-full lg:w-2/3 space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-medium text-[#2e3d62] mb-4 sm:mb-6">
              {course.courseName}
            </h2>

            {course.contentBlocks && course.contentBlocks.length > 0 ? (
              course.contentBlocks.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p
                        key={index}
                        className="mulish text-base sm:text-lg leading-7 sm:leading-8 text-gray-500"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {block.value}
                      </p>
                    );
                  case 'image':
                    return (
                      <img
                        key={index}
                        src={block.value}
                        alt={block.alt || course.courseName}
                        className="rounded-xl object-cover w-full max-h-[31rem] mt-6 sm:mt-8"
                      />
                    );
                  case 'heading':
                    return (
                      <h3 key={index} className="text-xl sm:text-2xl font-medium text-[#2e3d62] mt-6 sm:mt-8 mb-4">
                        {block.value}
                      </h3>
                    );
                  case 'list':
                    return (
                      <ul
                        key={index}
                        className="list-disc list-inside mulish text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 pl-5 mt-4"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {Array.isArray(block.value) ? (
                          block.value.map((item, i) => item.trim() && <li key={i}>{item.trim()}</li>)
                        ) : (
                          block.value.split('\n').map((item, i) => item.trim() && <li key={i}>{item.trim()}</li>)
                        )}
                      </ul>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <p className="mulish text-base sm:text-lg leading-7 sm:leading-8 text-gray-500" style={{ whiteSpace: 'pre-wrap' }}>
                {course.courseDescription || "No detailed description available for this course."}
              </p>
            )}

            {course.faqs && course.faqs.length > 0 && (
              <div className="mt-8 sm:mt-12">
                <h3 className="text-xl sm:text-2xl font-medium text-[#2e3d62] mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {course.faqs.map((faq, index) => (
                    <details key={index} className="border border-gray-200 rounded-lg">
                      <summary className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg cursor-pointer">
                        <span className="font-semibold text-[#2e3d62]">
                          {faq.question}
                        </span>
                      </summary>
                      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                        <p className="text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 sm:mt-12">
              <h3 className="text-xl sm:text-2xl font-medium text-[#2e3d62] mb-4">
                Explore Other Programs
              </h3>
              {loading && otherCourses.length === 0 ? ( // Display loading for other courses if main course is still loading or if otherCourses haven't been fetched yet.
                <p className="text-lg text-gray-600">
                  Loading other courses...
                </p>
              ) : otherCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherCourses.map((otherCourse) => (
                    <Link
                      to={`/courses/${otherCourse.slug}`}
                      key={otherCourse._id}
                      className="block group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`relative w-full h-60 rounded-xl p-6 flex items-center justify-center shadow-lg overflow-hidden`}
                        style={{
                          backgroundImage: `url(${otherCourse.courseImage || '/images/default-course-thumbnail.jpg'})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundColor: "#a78bfa",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <h2 className="relative z-10 text-white text-2xl font-bold text-center">
                          {otherCourse.courseName}
                        </h2>
                        <CircleArrowOutUpRight className="absolute bottom-4 right-4 text-white text-3xl z-10" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-gray-600">
                  No other courses available at the moment.
                </p>
              )}
            </div>

            <div className="mt-8 sm:mt-12 space-y-4">
              <h3 className="text-xl sm:text-2xl font-medium text-[#2e3d62] mb-4">
                Need Help? Contact Us!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="https://wa.me/+919990802009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 font-semibold rounded-lg transition"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                  WhatsApp
                </a>
                <a
                  href="mailto:contact@jrtinker.com"
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl bg-red-600 hover:bg-red-700 text-white py-2.5 sm:py-3 font-semibold rounded-lg transition"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/gmail--v1.png"
                    alt="Email"
                    className="w-6 h-6"
                  />
                  Email Us
                </a>
                <a
                  href="tel:+919990802009"
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 font-semibold rounded-lg transition"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/phone--v1.png"
                    alt="Call"
                    className="w-6 h-6"
                  />
                  Call Us
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-xl">
            <div className="bg-purple-500 text-white rounded-t-xl p-3 sm:p-4 text-xl flex items-center gap-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 20l9-5-9-5-9 5 9 5z" />
                <path d="M12 12l9-5-9-5-9 5 9 5z" />
              </svg>
              <p className="text-2xl sm:text-3xl salsa">Informations</p>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#2b3c6b] mulish text-base sm:text-lg font-bold">
                  Sessions
                </span>
                <span className="text-[#ff6b6b] text-lg sm:text-xl font-bold">{`${course?.courseDuration}`}</span>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between items-center">
                <span className="text-[#2b3c6b] mulish text-base sm:text-lg font-bold">
                  Age Group
                </span>
                <span className="text-[#ff6b6b] text-lg sm:text-xl font-bold">
                  {course && `${course.ageGroup?.min}-${course.ageGroup?.max}`}
                </span>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between items-center">
                <span className="text-[#2b3c6b] mulish text-base sm:text-lg font-bold">
                  Months
                </span>
                <span className="text-[#ff6b6b] text-lg sm:text-xl font-bold">{`${Math.ceil(
                  parseInt(course.courseDuration, 10) / 20 || 1
                )}`}</span>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between items-center">
                <span className="text-[#2b3c6b] mulish text-base sm:text-lg font-bold">
                  Lessons
                </span>
                <span className="text-[#ff6b6b] text-lg sm:text-xl font-bold">
                  12
                </span>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between items-center">
                <span className="text-[#2b3c6b] mulish text-base sm:text-lg font-bold">
                  Language
                </span>
                <span className="text-[#ff6b6b] text-lg sm:text-xl font-bold">
                  English
                </span>
              </div>
              <hr className="text-gray-300" />
              <div className="flex justify-between items-center">
                <span className="text-[#2b3c6b] mulish text-base sm:text-lg font-bold">
                  Course Price
                </span>
                <span className="text-[#ff6b6b] text-lg sm:text-xl font-bold">
                  {course.isDiscounted && course.originalPrice ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">${course.originalPrice}</span>
                      ${course.coursePrice}
                    </>
                  ) : (
                    `$${course.coursePrice}`
                  )}
                </span>
              </div>
              <hr className="text-gray-300" />

              <Link
                to={`/bookdemoclass/${course.slug}`}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl mt-4 bg-[#1f2a54] hover:bg-[#2e3d62] text-white py-2.5 sm:py-3 font-semibold rounded-lg transition"
              >
                Book a free demo <FaArrowRightLong />
              </Link>

              <button
                disabled
                className="w-full cursor-not-allowed opacity-95 flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl mt-4 bg-[#1f2a54] text-white py-2.5 sm:py-3 font-semibold rounded-lg transition"
              >
                Enroll now <FaArrowRightLong />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseClassDetails;