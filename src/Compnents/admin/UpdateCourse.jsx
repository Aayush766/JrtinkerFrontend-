import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // States for form fields
    const [courseName, setCourseName] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const [ageGroup, setAgeGroup] = useState({ min: "", max: "" });
    const [coursePrice, setCoursePrice] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [courseRating, setCourseRating] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [isDiscounted, setIsDiscounted] = useState(false);

    // State for FAQS
    const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

    // States for SEO Meta Tags
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeywords, setMetaKeywords] = useState("");
    const [metaTitle, setMetaTitle] = useState("");

    // ✨ NEW STATE FOR DYNAMIC CONTENT BLOCKS ✨
    // Each block will have { type: 'paragraph' | 'image' | 'heading' | 'list', value: '...', alt: '...' (for image) }
    const [contentBlocks, setContentBlocks] = useState([
        { type: "paragraph", value: "", alt: "" },
    ]);

    // Helper to handle FAQ input changes
    const handleFaqChange = (index, field, value) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    // Helper to add a new FAQ
    const addFaq = () => {
        setFaqs([...faqs, { question: "", answer: "" }]);
    };

    // Helper to remove an FAQ
    const removeFaq = (index) => {
        const newFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(newFaqs);
    };

    // ✨ MODIFIED HELPER FOR CONTENT BLOCKS - Now accepts an insertion index ✨
    const handleAddBlock = (type, insertAtIndex = contentBlocks.length) => {
        const newBlock = { type, value: "", alt: "" };
        const newBlocks = [
            ...contentBlocks.slice(0, insertAtIndex),
            newBlock,
            ...contentBlocks.slice(insertAtIndex),
        ];
        setContentBlocks(newBlocks);
    };

    const handleRemoveBlock = (index) => {
        const newBlocks = contentBlocks.filter((_, i) => i !== index);
        setContentBlocks(newBlocks);
    };

    const handleBlockChange = (index, field, value) => {
        const newBlocks = [...contentBlocks];
        newBlocks[index][field] = value;
        setContentBlocks(newBlocks);
    };

    // ✨ NEW HELPERS FOR REORDERING CONTENT BLOCKS ✨
    const handleMoveBlockUp = (index) => {
        if (index === 0) return;
        const newBlocks = [...contentBlocks];
        [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
        setContentBlocks(newBlocks);
    };

    const handleMoveBlockDown = (index) => {
        if (index === contentBlocks.length - 1) return;
        const newBlocks = [...contentBlocks];
        [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
        setContentBlocks(newBlocks);
    };


    // Consolidated Cloudinary upload logic, now updates specific block
    const handleCloudinaryImageUpload = async (index, file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "jr-tinker");
        formData.append("cloud_name", "priyank-cloud");

        const newBlocks = [...contentBlocks];
        newBlocks[index].loading = true; // Add loading state to specific block
        newBlocks[index].error = false; // Clear previous error
        newBlocks[index].success = false; // Clear previous success
        setContentBlocks(newBlocks);

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/priyank-cloud/image/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                handleBlockChange(index, "value", result.url); // Update value with URL
                handleBlockChange(index, "success", true); // Set success state
                toast.success("Image uploaded successfully!");
                return result.url;
            } else {
                const errorData = await response.json();
                console.error("Cloudinary upload error:", errorData);
                handleBlockChange(index, "error", true); // Set error state
                toast.error("Image upload failed: " + (errorData.error?.message || "Unknown error"));
                return null;
            }
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            handleBlockChange(index, "error", true); // Set error state
            toast.error("Error uploading image.");
            return null;
        } finally {
            handleBlockChange(index, "loading", false); // Clear loading state
        }
    };
    // ✨ END NEW HELPERS FOR CONTENT BLOCKS ✨


    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://jrtinker01.onrender.com/admin/course-dashboard/courses/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId: id }),
            });

            if (response.ok) {
                const result = await response.json();
                const fetchedCourse = result.course;
                setCourse(fetchedCourse);

                // Initialize individual states from fetched data
                setCourseName(fetchedCourse.courseName || "");
                setCourseDuration(fetchedCourse.courseDuration || "");
                setAgeGroup(fetchedCourse.ageGroup || { min: "", max: "" });
                setCoursePrice(fetchedCourse.coursePrice || "");
                setInstructorName(fetchedCourse.instructorName || "");
                setCourseRating(fetchedCourse.courseRating || "");
                setOriginalPrice(fetchedCourse.originalPrice || "");
                setIsDiscounted(fetchedCourse.isDiscounted || false);

                // Initialize FAQs
                setFaqs(fetchedCourse.faqs && fetchedCourse.faqs.length > 0 ? fetchedCourse.faqs : [{ question: "", answer: "" }]);

                // Initialize SEO Meta Tags
                setMetaDescription(fetchedCourse.metaDescription || "");
                setMetaKeywords(fetchedCourse.metaKeywords || "");
                setMetaTitle(fetchedCourse.metaTitle || "");

                // ✨ INITIALIZE contentBlocks FROM FETCHED DATA ✨
                // Ensure each block has 'alt' if it's an image for frontend rendering convenience
                const initialContentBlocks = fetchedCourse.contentBlocks?.map(block => ({
                    ...block,
                    alt: block.alt || (block.type === 'image' ? 'Course Image' : '') // Default alt text for images
                })) || [{ type: "paragraph", value: "", alt: "" }];
                setContentBlocks(initialContentBlocks);

            } else {
                toast.error("Failed to fetch course data.");
                navigate("/admin/course-dashboard/all-course");
            }
        } catch (error) {
            console.error("Fetch course error:", error);
            toast.error("Something went wrong while fetching course.");
            navigate("/admin/course-dashboard/all-course");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseData();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- Client-side Validation ---

        if (!courseName.trim() || !instructorName.trim()) {
            toast.error("Please fill in all required text fields (Course Name, Instructor Name).");
            setIsSubmitting(false);
            return;
        }

        const durationNum = Number(courseDuration);
        if (isNaN(durationNum) || durationNum <= 0) {
            toast.error("Course Duration must be a positive number.");
            setIsSubmitting(false);
            return;
        }

        const minAgeNum = Number(ageGroup.min);
        const maxAgeNum = Number(ageGroup.max);
        if (isNaN(minAgeNum) || minAgeNum <= 0 || isNaN(maxAgeNum) || maxAgeNum <= 0) {
            toast.error("Age Group (Min & Max) must be positive numbers.");
            setIsSubmitting(false);
            return;
        }
        if (minAgeNum > maxAgeNum) {
            toast.error("Minimum age cannot be greater than maximum age.");
            setIsSubmitting(false);
            return;
        }

        const priceNum = Number(coursePrice);
        if (isNaN(priceNum) || priceNum < 0) {
            toast.error("Course Price must be a non-negative number.");
            setIsSubmitting(false);
            return;
        }

        const ratingNum = Number(courseRating);
        if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
            toast.error("Course Rating must be between 0 and 5.");
            setIsSubmitting(false);
            return;
        }

        // Check if any image is still loading
        const anyImageLoading = contentBlocks.some(
            (block) => block.type === "image" && block.loading
        );
        if (anyImageLoading) {
            toast.warn("Please wait for all images to finish uploading.");
            setIsSubmitting(false);
            return;
        }

        // Validate contentBlocks
        if (!contentBlocks || contentBlocks.length === 0) {
            toast.error("Course content cannot be empty. Please add at least one paragraph or image.");
            setIsSubmitting(false);
            return;
        }
        for (const block of contentBlocks) {
            if (!block.type || (block.type !== 'image' && !block.value.trim())) {
                toast.error(`Please fill in all content blocks. Block type: ${block.type || 'N/A'}`);
                setIsSubmitting(false);
                return;
            }
            if (block.type === 'image') {
                if (!block.value.startsWith('http')) {
                    toast.error(`Image block requires a valid URL. Found: "${block.value}"`);
                    setIsSubmitting(false);
                    return;
                }
                if (!block.alt.trim()) { // Ensure alt text is also present for images
                    toast.error("Please provide alt text for all image blocks.");
                    setIsSubmitting(false);
                    return;
                }
            }
        }

        let finalOriginalPrice = null;
        if (isDiscounted) {
            finalOriginalPrice = Number(originalPrice);
            if (isNaN(finalOriginalPrice) || finalOriginalPrice <= priceNum) {
                toast.error("Original Price must be a number greater than Course Price when discounted.");
                setIsSubmitting(false);
                return;
            }
        }

        const cleanedFaqs = faqs.filter(faq => faq.question.trim() !== "" || faq.answer.trim() !== "");
        for (const faq of cleanedFaqs) {
            if (!faq.question.trim() || !faq.answer.trim()) {
                toast.error("Please ensure all FAQ questions and answers are filled, or remove incomplete FAQs.");
                setIsSubmitting(false);
                return;
            }
        }

        const trimmedMetaDescription = metaDescription.trim() || undefined;
        const trimmedMetaKeywords = metaKeywords.trim() || undefined;
        const trimmedMetaTitle = metaTitle.trim() || undefined;

        // Construct courseData to send to the backend
        const courseData = {
            id,
            courseName: courseName.trim(),
            courseDuration: durationNum,
            instructorName: instructorName.trim(),
            courseRating: ratingNum,
            coursePrice: priceNum,
            originalPrice: finalOriginalPrice,
            isDiscounted: isDiscounted,
            ageGroup: {
                min: minAgeNum,
                max: maxAgeNum,
            },
            faqs: cleanedFaqs,
            metaDescription: trimmedMetaDescription,
            metaKeywords: trimmedMetaKeywords,
            metaTitle: trimmedMetaTitle,
            // ✨ SEND contentBlocks TO THE BACKEND ✨
            contentBlocks: contentBlocks.map(({ type, value, alt }) => ({ type, value, alt })), // Remove temporary frontend states like loading, error etc.
        };

        console.log("Course data to be sent for update: ", courseData);

        try {
            const response = await fetch("https://jrtinker01.onrender.com/admin/course-dashboard/update-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update course");
            } else {
                toast.success("Course updated successfully");
                navigate("/admin/course-dashboard/all-course");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-60">
                <span className="loading loading-spinner text-primary w-12 h-12"></span>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-60">
                <p>Course data could not be loaded. Please try again or check the course ID.</p>
            </div>
        );
    }

    // Common input styling for consistency
    const commonInputClasses = "input input-bordered w-full mt-2 text-lg px-3 py-3 text-cyan-600 focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0";
    const commonTextareaClasses = "textarea textarea-bordered resize-none w-full mt-2 text-lg px-3 py-3 text-cyan-600 focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0";


    return (
        <section className="container mx-auto px-4 py-24 pt-64">
            <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-2xl border">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Update Course</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course Name */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                            className={commonInputClasses}
                        />
                    </div>

                    {/* Instructor Name */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Instructor Name</label>
                        <input
                            type="text"
                            name="instructorName"
                            value={instructorName}
                            onChange={(e) => setInstructorName(e.target.value)}
                            required
                            className={commonInputClasses}
                        />
                    </div>

                    {/* Course Duration */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Course Duration (sessions/hours)</label>
                        <input
                            type="number"
                            name="courseDuration"
                            value={courseDuration}
                            onChange={(e) => setCourseDuration(e.target.value)}
                            required
                            min="1"
                            className={commonInputClasses}
                        />
                    </div>

                    {/* Course Rating */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Course Rating (0-5)</label>
                        <input
                            type="number"
                            name="courseRating"
                            min="0"
                            max="5"
                            step="0.1"
                            value={courseRating}
                            onChange={(e) => setCourseRating(e.target.value)}
                            required
                            className={commonInputClasses}
                        />
                    </div>

                    {/* Course Price */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Course Price (INR)</label>
                        <input
                            type="number"
                            name="coursePrice"
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                            min="0"
                            className={commonInputClasses}
                        />
                    </div>

                    {/* Is Discounted? */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Is Discounted?</label>
                        <select
                            name="isDiscounted"
                            value={isDiscounted}
                            onChange={(e) => setIsDiscounted(e.target.value === "true")}
                            className="select select-bordered w-full mt-2 text-lg px-3 py-3 text-cyan-600 focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    {/* Original Price - Conditionally rendered */}
                    {isDiscounted && (
                        <div>
                            <label className="font-medium text-xl text-cyan-800">Original Price (INR)</label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                min="0"
                                required={isDiscounted}
                                className={commonInputClasses}
                            />
                        </div>
                    )}

                    {/* Min Age */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Min Age</label>
                        <input
                            type="number"
                            name="ageGroup.min"
                            min="1"
                            value={ageGroup.min}
                            onChange={(e) => setAgeGroup({ ...ageGroup, min: e.target.value })}
                            required
                            className={commonInputClasses}
                        />
                    </div>

                    {/* Max Age */}
                    <div>
                        <label className="font-medium text-xl text-cyan-800">Max Age</label>
                        <input
                            type="number"
                            name="ageGroup.max"
                            min="1"
                            value={ageGroup.max}
                            onChange={(e) => setAgeGroup({ ...ageGroup, max: e.target.value })}
                            required
                            className={commonInputClasses}
                        />
                    </div>

                    {/* --- SECTION FOR DYNAMIC CONTENT BLOCKS --- */}
                    <div className="md:col-span-2 space-y-4 border p-4 rounded-lg bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-700">Course Content (Paragraphs & Images)</h3>
                        {contentBlocks.map((block, index) => (
                            <div key={index} className="space-y-2 border-b pb-4 mb-4 last:border-b-0 last:pb-0 relative group">
                                <label className="label font-semibold">Content Block #{index + 1} ({block.type})</label>
                                {block.type === "paragraph" && (
                                    <textarea
                                        placeholder="Enter paragraph text..."
                                        className={commonTextareaClasses}
                                        value={block.value}
                                        onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                                        rows="4"
                                    />
                                )}
                                {block.type === "heading" && (
                                    <input
                                        type="text"
                                        placeholder="Enter heading text..."
                                        className={commonInputClasses}
                                        value={block.value}
                                        onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                                    />
                                )}
                                {block.type === "list" && (
                                    <textarea
                                        placeholder="Enter list items, one per line..."
                                        className={commonTextareaClasses}
                                        value={block.value}
                                        onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                                        rows="4"
                                    />
                                )}
                                {block.type === "image" && (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="file-input file-input-bordered w-full mt-2"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) handleCloudinaryImageUpload(index, file);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Image Alt Text (e.g., 'Students working on a robot')"
                                            className={commonInputClasses}
                                            value={block.alt}
                                            onChange={(e) => handleBlockChange(index, "alt", e.target.value)}
                                        />
                                        {block.loading && <p className="text-sm mt-2 text-blue-600">Uploading image...</p>}
                                        {block.error && <p className="text-sm mt-2 text-red-600">Image upload failed</p>}
                                        {block.success && <p className="text-sm mt-2 text-green-600">Image uploaded successfully</p>}
                                        {block.value && (
                                            <img
                                                src={block.value}
                                                alt={block.alt || "Course Image Preview"}
                                                className="mt-4 rounded-md w-40 h-40 object-cover shadow-md"
                                                style={{ maxWidth: '600px', maxHeight: '400px', objectFit: 'contain' }}
                                            />
                                        )}
                                    </>
                                )}
                                {/* Reorder Buttons */}
                                <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => handleMoveBlockUp(index)}
                                        disabled={index === 0}
                                        className="btn btn-xs btn-square btn-ghost"
                                        title="Move Up"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMoveBlockDown(index)}
                                        disabled={index === contentBlocks.length - 1}
                                        className="btn btn-xs btn-square btn-ghost"
                                        title="Move Down"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                    </button>
                                </div>

                                {contentBlocks.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveBlock(index)}
                                        className="btn btn-error btn-sm absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Remove
                                    </button>
                                )}

                                {/* NEW: Buttons to insert content AFTER this block */}
                                <div className="flex flex-wrap gap-2 justify-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleAddBlock("paragraph", index + 1)}
                                        className="btn btn-xs btn-outline btn-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        + Paragraph
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddBlock("heading", index + 1)}
                                        className="btn btn-xs btn-outline btn-info opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        + Heading
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddBlock("image", index + 1)}
                                        className="btn btn-xs btn-outline btn-accent opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        + Image
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddBlock("list", index + 1)}
                                        className="btn btn-xs btn-outline btn-warning opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        + List
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* The global add buttons for adding at the very end (still useful for quick adds) */}
                        <div className="flex flex-wrap gap-2 justify-center pt-4">
                            <button
                                type="button"
                                onClick={() => handleAddBlock("paragraph")}
                                className="btn btn-primary btn-outline"
                            >
                                Add Paragraph (End)
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddBlock("image")}
                                className="btn btn-accent btn-outline"
                            >
                                Add Image (End)
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddBlock("heading")}
                                className="btn btn-info btn-outline"
                            >
                                Add Heading (End)
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddBlock("list")}
                                className="btn btn-warning btn-outline"
                            >
                                Add List (End)
                            </button>
                        </div>
                    </div>
                    {/* --- END SECTION FOR DYNAMIC CONTENT BLOCKS --- */}

                    ---

                    {/* --- SECTION FOR FAQS --- */}
                    <div className="md:col-span-2 space-y-4 border p-4 rounded-lg bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-700">Course FAQs</h3>
                        {faqs.map((faq, index) => (
                            <div key={faq._id || index} className="space-y-2 border-b pb-4 mb-4 last:border-b-0 last:pb-0">
                                <label className="label font-semibold">FAQ #{index + 1}</label>
                                <input
                                    type="text"
                                    placeholder="Question"
                                    className={commonInputClasses}
                                    value={faq.question}
                                    onChange={(e) =>
                                        handleFaqChange(index, "question", e.target.value)
                                    }
                                />
                                <textarea
                                    placeholder="Answer"
                                    className={commonTextareaClasses}
                                    value={faq.answer}
                                    onChange={(e) =>
                                        handleFaqChange(index, "answer", e.target.value)
                                    }
                                    rows="3" // Reduced rows for a slightly more compact look
                                />
                                {faqs.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFaq(index)}
                                        className="btn btn-error btn-sm mt-2"
                                    >
                                        Remove FAQ
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFaq}
                            className="btn btn-secondary btn-outline w-full"
                        >
                            Add Another FAQ
                        </button>
                    </div>

                    ---

                    {/* --- SECTION FOR SEO META TAGS --- */}
                    <div className="md:col-span-2 space-y-4 border p-4 rounded-lg bg-gray-50">
                        <h3 className="text-xl font-bold text-gray-700">SEO Meta Information (Optional)</h3>
                        <div className="space-y-1">
                            <label className="label font-semibold">Meta Title</label>
                            <input
                                type="text"
                                name="metaTitle"
                                placeholder="e.g., Robotics Course for Kids | JRTinker"
                                className={commonInputClasses}
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="label font-semibold">Meta Description</label>
                            <textarea
                                name="metaDescription"
                                placeholder="A concise summary of the course for search engines."
                                className={commonTextareaClasses}
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                rows="3" // Reduced rows for a slightly more compact look
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="label font-semibold">Meta Keywords</label>
                            <input
                                type="text"
                                name="metaKeywords"
                                placeholder="comma, separated, keywords, for, SEO"
                                className={commonInputClasses}
                                value={metaKeywords}
                                onChange={(e) => setMetaKeywords(e.target.value)}
                            />
                        </div>
                    </div>

                    ---

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="btn bg-cyan-800 w-full mt-4 text-xl text-white font-medium"
                            disabled={isSubmitting || contentBlocks.some(block => block.loading)}
                        >
                            {isSubmitting ? "Updating..." : "Update Course"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateCourse;