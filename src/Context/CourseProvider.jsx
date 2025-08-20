import React, { createContext, useContext, useEffect, useState } from 'react';

const CourseContext = createContext();

const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allCourses = async () => {
    setLoading(true);
    setError(null);

    // --- MODIFICATION: FORCING LOCALHOST FOR DEVELOPMENT ---
    const BASE_URL = "https://jrtinker01.onrender.com";
    // -----------------------------------------------------

    try {
      const response = await fetch(
        `${BASE_URL}/admin/course-dashboard/all-courses`,
        {
          method: 'GET',
          // credentials: 'include', // Only include if this route requires authentication via cookies
                                  // For /all-courses, it's often public, so may not need this.
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("All courses data:", data);
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.warn("API response did not contain an array 'courses':", data);
          setCourses([]);
          setError("Received unexpected data format from server.");
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'No error message from server.' }));
        console.error(`Failed to fetch courses: ${response.status} ${response.statusText}`, errorData);
        setError(errorData.message || `Failed to load courses. Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Network or parsing error fetching courses:", err);
      setError(`Network error: ${err.message}. Please ensure your backend is running at ${BASE_URL}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
};

const useCourses = () => useContext(CourseContext);

export { useCourses };
export default CourseProvider;