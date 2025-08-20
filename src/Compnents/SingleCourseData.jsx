import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CourseClassDetails from "./CourseClassDetails";
import Loading from "./Loading"; // Assuming you have a Loading component
import PageNotFound from "./PageNotFound"; // Assuming you have a 404 component

const SingleCourseData = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const singleCourse = async () => {
      if (!slug) {
        setLoading(false);
        setError("Course not found.");
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          `https://jrtinker01.onrender.com/admin/course-dashboard/course/${slug}`
        );
        if (response.ok) {
          const result = await response.json();
          setCourseData(result.course);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Course not found.");
          setCourseData(null);
        }
      } catch (error) {
        console.error("single course error: ", error);
        setError("An error occurred while fetching the course.");
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };
    singleCourse();
  }, [slug]);

  // Function to generate Schema markup for Google
  const generateCourseSchema = (course) => {
    if (!course) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.courseName,
      description:
        course.courseDescription ||
        `Join our ${course.courseName} course for ages ${course.ageGroup?.min}-${course.ageGroup?.max}.`,
      provider: {
        "@type": "Organization",
        name: "JRtinker",
        url: "https://jrtinker.com",
      },
      // --- MODIFICATION START ---
      // 1. Added "offers" to specify price and availability
      offers: {
        "@type": "Offer",
        price: course.coursePrice || "0", // Use course price from your data
        priceCurrency: "USD", // IMPORTANT: Change to your currency (e.g., "INR")
        availability: "https://schema.org/InStock",
      },
      // 2. Added "hasCourseInstance" to specify how the course is delivered
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online", // Assuming courses are online
        location: {
          "@type": "VirtualLocation",
        },
      },
      // --- MODIFICATION END ---
    };
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !courseData) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        {/* --- Primary SEO Tags --- */}
        <title>
          {courseData.metaTitle || `${courseData.courseName} | JRtinker`}
        </title>
        <meta
          name="description"
          content={courseData.metaDescription || courseData.courseDescription}
        />
        <link
          rel="canonical"
          href={`https://jrtinker.com/courses/${courseData.slug}`}
        />

        {/* --- Open Graph / Facebook --- */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://jrtinker.com/courses/${courseData.slug}`}
        />
        <meta
          property="og:title"
          content={courseData.metaTitle || courseData.courseName}
        />
        <meta
          property="og:description"
          content={courseData.metaDescription || courseData.courseDescription}
        />
        <meta property="og:image" content={courseData.courseImage} />

        {/* --- Twitter Card --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={`https://jrtinker.com/courses/${courseData.slug}`}
        />
        <meta
          name="twitter:title"
          content={courseData.metaTitle || courseData.courseName}
        />
        <meta
          name="twitter:description"
          content={courseData.metaDescription || courseData.courseDescription}
        />
        <meta name="twitter:image" content={courseData.courseImage} />

        {/* --- Structured Data (Schema Markup) --- */}
        <script type="application/ld+json">
          {JSON.stringify(generateCourseSchema(courseData))}
        </script>
      </Helmet>

      {/* Your existing component that displays the course details */}
      <CourseClassDetails courses={courseData} />
    </>
  );
};

export default SingleCourseData;