import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaUserGraduate, FaArrowRightLong } from "react-icons/fa6";
import { RiPriceTag3Fill } from "react-icons/ri";
import { MdCalendarViewMonth } from "react-icons/md";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Import Helmet
import { useLanguage } from "../Context/LanguageContext";
import Loading from "./Loading"; // Ensure this path is correct

const CourseFilterOptions = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const ageGroupOptions = [
    { label: t.mychildagegroup.allagegroups || "All Age Groups", value: "all" },
    { label: "6-12", value: "6-12" },
    { label: "6-18", value: "6-18" },
    { label: "12-24", value: "12-24" },
    { label: "14-24", value: "14-24" },
    { label: "16-24", value: "16-24" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jrtinker01.onrender.com/admin/course-dashboard/all-courses"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setAllCourses(result.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    if (selectedAgeGroup === "all") {
      return allCourses;
    }
    const [min, max] = selectedAgeGroup.split("-").map(Number);
    return allCourses.filter(
      (course) => course.ageGroup.min === min && course.ageGroup.max === max
    );
  }, [selectedAgeGroup, allCourses]);

  const handleAgeGroupChange = (e) => {
    setSelectedAgeGroup(e.target.value);
  };

  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    return url.replace('/upload/', '/upload/w_400,q_auto,f_auto/');
  };

  // Function to generate Schema Markup for SEO
  const generateSchema = () => {
    if (!filteredCourses || filteredCourses.length === 0) return null;

    const itemListElement = filteredCourses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        url: `https://jrtinker.com/courses/${course.slug}`,
        name: course.courseName,
        description: course.courseDescription,
        provider: {
          "@type": "Organization",
          name: "JRtinker",
        },
      },
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "JRtinker STEM Courses",
      description: "Explore STEM, coding, and robotics courses for kids and teens, filtered by age group.",
      itemListElement,
    };
  };

  return (
    <>
      <Helmet>
        <title>Our STEM Courses - JRtinker</title>
        <meta
          name="description"
          content="Explore fun and engaging STEM courses for kids. Filter by age group to find the perfect robotics, coding, or science program for your child."
        />
        <link rel="canonical" href="https://jrtinker.com/courses" />
        {/* Add Structured Data */}
        <script type="application/ld+json">{JSON.stringify(generateSchema())}</script>
      </Helmet>

      <div className="w-full min-h-screen">
        <div className="text-center py-8 sm:py-12 md:py-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            {t.ourCourses || "Our Courses"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
            {t.ourCoursesSubtitle || "Discover the perfect program for your child's age group."}
          </p>
        </div>

        <div className="px-4 sm:px-8 md:px-16 pb-8 md:pb-16">
          <div className="w-full mb-8 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              {t.mychildagegroup.textone || "My child is"}
            </h2>
            <div className="relative inline-block w-full sm:w-auto min-w-[180px]">
              <select
                className="appearance-none block w-full px-5 py-3 text-xl sm:text-2xl font-medium border-2 border-cyan-500 rounded-full shadow-md bg-white text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 pr-10 cursor-pointer"
                onChange={handleAgeGroupChange}
                value={selectedAgeGroup}
              >
                {ageGroupOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-cyan-700">
                <svg
                  className="fill-current h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              {t.mychildagegroup.texttwo || "years old."}
            </h2>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="w-full">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
              >
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <motion.div
                      key={course._id}
                      className="relative group bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col cursor-pointer"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getOptimizedImageUrl(course.courseImage)}
                          alt={course.courseName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          width="400"
                          height="250"
                          style={{
                            maskImage: `url("/images/background/bg-img-courses.png")`,
                            maskPosition: "center center",
                            maskRepeat: "no-repeat",
                            maskSize: "contain",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                          <Link
                            to={`/courses/${course.slug}`}
                            className="text-white text-md font-semibold flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                          >
                            View Course <FaArrowRightLong className="ml-1" />
                          </Link>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col text-center flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 font-salsa line-clamp-2">
                          {course.courseName}
                        </h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-grow">
                          {course.courseDescription}
                        </p>

                        <div className="w-10 h-0.5 bg-indigo-400 rounded-full my-2 mx-auto"></div>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 w-full text-left mt-auto">
                          <div className="flex items-center gap-1.5">
                            <FaUserGraduate className="text-sm text-indigo-600 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">
                              {`${course.ageGroup.min}-${course.ageGroup.max}`} {t.mychildagegroup.years || "years"}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MdCalendarViewMonth className="text-sm text-cyan-500 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">
                              {`${Math.ceil(course.courseDuration / 20)} ${t.mychildagegroup.months || "months"}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <RiPriceTag3Fill className="text-sm text-orange-500 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">
                              ${course.coursePrice}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FaRegClock className="text-sm text-yellow-500 flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-700 truncate">
                              {`${course.courseDuration} ${t.mychildagegroup.sessions || "sessions"}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-xl sm:text-2xl text-gray-500 font-medium">
                      {t.noCoursesFound || "No courses found for this age group."}
                    </p>
                    <p className="text-md sm:text-lg text-gray-400 mt-2">
                      {t.tryanotherfilter || "Try selecting a different age group or check back later!"}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseFilterOptions;