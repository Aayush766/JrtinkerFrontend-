import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // Ensure react-hot-toast is installed and configured
import Skeleton from "../Skeleton"; // Assuming this path is correct for your Skeleton component
import debounce from "lodash/debounce"; // Ensure lodash/debounce is installed

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // Use a separate state for the debounced search term that actually filters the courses
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Memoized fetch function
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jrtinker01.onrender.com/admin/course-dashboard/all-courses");
      const data = await res.json();

      // Always check for `data.success` or similar if your backend sends it,
      // or rely purely on `res.ok` (status 2xx).
      if (!res.ok) {
        // Use the error message from the backend if available
        throw new Error(data.message || "Failed to fetch courses.");
      }
      // Ensure 'data.courses' is an array, default to empty array if null/undefined
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error); // Log the actual error
      toast.error(error.message || "Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  }, []); // Dependencies: None, as it fetches all courses

  // Initial fetch on component mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]); // `fetchCourses` is stable due to `useCallback`

  // Debounced search handler for the input
  // This updates `debouncedSearchTerm` after a delay
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((query) => {
        setDebouncedSearchTerm(query);
      }, 300),
    [] // `debounce` function itself is stable, so no dependencies needed
  );

  // Handle input change and pass it to the debounced handler
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update immediate input value
    debouncedSetSearchTerm(query); // Update debounced term for filtering
  };

  // Memoized filtered courses - now uses `debouncedSearchTerm`
  const filteredCourses = useMemo(() => {
    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase().trim();
    if (!lowerCaseSearchTerm) {
      return courses; // If debounced term is empty, show all courses
    }
    return courses.filter((course) =>
      course.courseName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [courses, debouncedSearchTerm]); // Dependencies: raw courses and the debounced search term

  // Course card component for better reusability and cleaner JSX
  const CourseCard = ({ course }) => (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <img
        src={course.courseImage} // Assuming 'courseImage' exists in your course object
        alt={course.courseName}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{course.courseName}</h3>
        {/* Link to update page using course._id */}
        <Link
          to={`/admin/course-dashboard/update-course/${course._id}`}
          className="mt-2 inline-block text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Update Course
        </Link>
        {/* Potentially add a link to the single course view using slug */}
        <Link
          to={`/admin/course-dashboard/course/${course.slug}`} // Assuming 'slug' field exists
          className="mt-2 ml-4 inline-block text-green-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen pt-64">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Panel - All Courses
        </h2>
        <div className="flex justify-center items-center gap-4 max-w-2xl mx-auto">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              value={searchQuery} // Binds to the immediate input value
              onChange={handleInputChange} // Uses the new handler
              aria-label="Search courses"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* Display count based on debounced search term, or don't show anything if no search is active */}
        {debouncedSearchTerm.trim() !== "" && (
          <p className="text-center mt-4 text-gray-600">
            Found {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}{" "}
            for "{debouncedSearchTerm}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Skeleton count={4} />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            {searchQuery ? "No courses match your search." : "No courses available."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllCourses;