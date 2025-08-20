import { useState } from "react";
import { toast } from "react-toastify"; // Using react-toastify as per your import, ensure it's configured
import "react-toastify/dist/ReactToastify.css";
import "../../App.css"; // Assuming this is for global styles or utility classes

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [ageGroup, setAgeGroup] = useState({ min: "", max: "" });
  const [coursePrice, setCoursePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [courseRating, setCourseRating] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for dynamic content blocks
  const [contentBlocks, setContentBlocks] = useState([]);

  // State for FAQs
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  // States for SEO Meta Tags
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaTitle, setMetaTitle] = useState("");

  // --- Helper functions for Content Blocks ---
  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index][field] = value;
    setContentBlocks(newBlocks);
  };

  const addBlock = (type) => {
    let newBlock;
    if (type === "image") {
      newBlock = { type, value: "", alt: "", isLoading: false, uploadFailed: false };
    } else {
      newBlock = { type, value: "" };
    }
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const removeBlock = (index) => {
    const newBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(newBlocks);
  };

  const handleCloudinaryImageUpload = async (file, index) => {
    if (!file) return; // Ensure a file is selected

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jr-tinker"); // Your Cloudinary upload preset
    formData.append("cloud_name", "priyank-cloud"); // Your Cloudinary cloud name

    const newBlocks = [...contentBlocks];
    newBlocks[index].isLoading = true;
    newBlocks[index].uploadFailed = false; // Reset error state on new upload attempt
    newBlocks[index].value = ""; // Clear previous image URL
    setContentBlocks(newBlocks);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/priyank-cloud/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        const updatedBlocks = [...contentBlocks];
        updatedBlocks[index].value = result.url; // Store the uploaded image URL
        updatedBlocks[index].isLoading = false;
        setContentBlocks(updatedBlocks);
        toast.success(`Image for Block ${index + 1} uploaded successfully!`);
      } else {
        const errorText = await response.text();
        console.error("Cloudinary upload failed:", errorText);
        const updatedBlocks = [...contentBlocks];
        updatedBlocks[index].uploadFailed = true;
        updatedBlocks[index].isLoading = false;
        setContentBlocks(updatedBlocks);
        toast.error(`Image upload failed for Block ${index + 1}. Details: ${errorText.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error("Error in Image Upload:", error);
      const updatedBlocks = [...contentBlocks];
      updatedBlocks[index].uploadFailed = true;
      updatedBlocks[index].isLoading = false;
      setContentBlocks(updatedBlocks);
      toast.error(`Error in Image Upload for Block ${index + 1}. Check console for details.`);
    }
  };

  // --- Helper functions for FAQs ---
  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  // --- Form Submission Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- Client-side Validation ---
    if (!courseName.trim()) {
      toast.error("Course Name is required.");
      setIsSubmitting(false);
      return;
    }
    if (!instructorName.trim()) {
      toast.error("Instructor Name is required.");
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

    let finalOriginalPrice = null;
    if (isDiscounted) {
      finalOriginalPrice = Number(originalPrice);
      if (isNaN(finalOriginalPrice) || finalOriginalPrice <= priceNum) {
        toast.error("Original Price must be a number greater than Course Price when discounted.");
        setIsSubmitting(false);
        return;
      }
    }

    // Validate content blocks
    if (contentBlocks.length === 0) {
      toast.error("Please add at least one content block (e.g., a description or image).");
      setIsSubmitting(false);
      return;
    }
    for (const [index, block] of contentBlocks.entries()) {
      if (!block.type || !block.value.trim()) {
        toast.error(`Content Block ${index + 1}: Type and Value are required for all blocks.`);
        setIsSubmitting(false);
        return;
      }
      if (block.type === "image") {
        if (block.isLoading) {
          toast.warn(`Content Block ${index + 1}: Please wait for the image upload to complete.`);
          setIsSubmitting(false);
          return;
        }
        if (block.uploadFailed) {
          toast.error(`Content Block ${index + 1}: Image upload failed. Please re-upload the image.`);
          setIsSubmitting(false);
          return;
        }
        if (!block.value) { // Ensure image URL is present after successful upload
          toast.error(`Content Block ${index + 1}: Please upload an image.`);
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Filter and validate FAQs
    const cleanedFaqs = faqs.filter(faq => faq.question.trim() !== "" || faq.answer.trim() !== "");
    for (const faq of cleanedFaqs) {
      if (!faq.question.trim() || !faq.answer.trim()) {
        toast.error("Please ensure all FAQ questions and answers are filled, or remove incomplete FAQs.");
        setIsSubmitting(false);
        return;
      }
    }

    // Prepare data for submission
    const courseData = {
      courseName: courseName.trim(),
      courseDuration: durationNum,
      ageGroup: {
        min: minAgeNum,
        max: maxAgeNum,
      },
      coursePrice: priceNum,
      originalPrice: isDiscounted ? finalOriginalPrice : null, // Send null if not discounted
      isDiscounted,
      instructorName: instructorName.trim(),
      courseRating: ratingNum,
      contentBlocks: contentBlocks.map(({ type, value, alt }) => ({
        type,
        value,
        alt: type === "image" ? (alt || undefined) : undefined, // Only send alt for image types
      })),
      faqs: cleanedFaqs,
      // Only include meta fields if they have a value after trimming
      metaDescription: metaDescription.trim() || undefined,
      metaKeywords: metaKeywords.trim() || undefined,
      metaTitle: metaTitle.trim() || undefined,
    };

    try {
      const response = await fetch(
        "https://jrtinker01.onrender.com/admin/course-dashboard/create-course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (response.ok) {
        toast.success("Course created successfully!");
        // Reset form fields after successful submission
        setCourseName("");
        setCourseDuration("");
        setAgeGroup({ min: "", max: "" });
        setCoursePrice("");
        setOriginalPrice("");
        setIsDiscounted(false);
        setInstructorName("");
        setCourseRating("");
        setContentBlocks([]);
        setFaqs([{ question: "", answer: "" }]);
        setMetaDescription("");
        setMetaKeywords("");
        setMetaTitle("");
      } else {
        const errorData = await response.json();
        console.error("Backend error during course creation:", errorData);
        toast.error(`Error creating course: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Network or fetch error during course creation (Frontend):", error);
      toast.error("Network error or failed to connect to server. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 pt-60 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create a New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div className="space-y-1">
          <label htmlFor="courseName" className="label font-semibold">Course Name</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        {/* Course Duration */}
        <div className="space-y-1">
          <label htmlFor="courseDuration" className="label font-semibold">Course Duration (in sessions/hours)</label>
          <input
            type="number"
            id="courseDuration"
            name="courseDuration"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
            min="1"
          />
        </div>

        {/* Age Group MIN */}
        <div className="space-y-1">
          <label htmlFor="ageGroupMin" className="label font-semibold">Age Group (Min Age)</label>
          <input
            type="number"
            id="ageGroupMin"
            name="ageGroupMin"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={ageGroup.min}
            onChange={(e) =>
              setAgeGroup({ ...ageGroup, min: e.target.value })
            }
            required
            min="1"
          />
        </div>

        {/* Age Group MAX */}
        <div className="space-y-1">
          <label htmlFor="ageGroupMax" className="label font-semibold">Age Group (Max Age)</label>
          <input
            type="number"
            id="ageGroupMax"
            name="ageGroupMax"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={ageGroup.max}
            onChange={(e) =>
              setAgeGroup({ ...ageGroup, max: e.target.value })
            }
            required
            min="1"
          />
        </div>

        {/* Course Price */}
        <div className="space-y-1">
          <label htmlFor="coursePrice" className="label font-semibold">Course Price (INR)</label>
          <input
            type="number"
            id="coursePrice"
            name="coursePrice"
            className="remove-arrow input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            min="0"
            required
          />
        </div>

        {/* Is Discounted Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isDiscounted"
            className="checkbox checkbox-primary"
            checked={isDiscounted}
            onChange={(e) => setIsDiscounted(e.target.checked)}
          />
          <label htmlFor="isDiscounted" className="label font-semibold cursor-pointer">Is Discounted?</label>
        </div>

        {/* Original Price (conditional rendering) */}
        {isDiscounted && (
          <div className="space-y-1">
            <label htmlFor="originalPrice" className="label font-semibold">Original Price (INR)</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              className="remove-arrow input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              min="0"
              required={isDiscounted}
            />
          </div>
        )}

        {/* Instructor Name */}
        <div className="space-y-1">
          <label htmlFor="instructorName" className="label font-semibold">Instructor Name</label>
          <input
            type="text"
            id="instructorName"
            name="instructorName"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            required
          />
        </div>

        {/* Course Rating */}
        <div className="space-y-1">
          <label htmlFor="courseRating" className="label font-semibold">Course Rating (0-5)</label>
          <input
            type="number"
            id="courseRating"
            name="courseRating"
            className="remove-arrow input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={courseRating}
            onChange={(e) => setCourseRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </div>

        ---
        ### Dynamic Course Content Blocks
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">Course Content</h2>
          {contentBlocks.map((block, index) => (
            <div key={index} className="space-y-2 border-b pb-4 mb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-bold text-gray-800">Content Block #{index + 1}</h3>
              <div className="flex flex-col space-y-2">
                <label htmlFor={`block-type-${index}`} className="label font-semibold">Block Type</label>
                <select
                  id={`block-type-${index}`}
                  className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                  value={block.type}
                  onChange={(e) => handleBlockChange(index, "type", e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="image">Image</option>
                  <option value="list">List Item</option>
                </select>

                {/* Conditional Rendering for Block Values */}
                {(block.type === "paragraph" || block.type === "list") && (
                  <textarea
                    placeholder={block.type === "paragraph" ? "Enter paragraph text" : "Enter list item text"}
                    className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                    value={block.value}
                    onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                    required
                  />
                )}

                {block.type === "heading" && (
                  <input
                    type="text"
                    placeholder="Enter heading text"
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                    value={block.value}
                    onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                    required
                  />
                )}

                {block.type === "image" && (
                  <>
                    <label htmlFor={`image-upload-${index}`} className="label font-semibold">Upload Image</label>
                    <input
                      type="file"
                      id={`image-upload-${index}`}
                      accept="image/*"
                      className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                      onChange={(e) => handleCloudinaryImageUpload(e.target.files[0], index)}
                      required={!block.value && !block.isLoading && !block.uploadFailed} // Only required if no image is uploaded/uploading
                    />
                    <input
                      type="text"
                      placeholder="Image Alt Text (for accessibility)"
                      className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                      value={block.alt || ""}
                      onChange={(e) => handleBlockChange(index, "alt", e.target.value)}
                    />
                    {block.isLoading && (
                      <div className="flex items-center space-x-2 mt-2 text-blue-600">
                        <span className="loading loading-spinner loading-md"></span>
                        <p className="text-sm">Uploading image...</p>
                      </div>
                    )}
                    {!block.isLoading && block.value && (
                      <>
                        <p className="text-sm text-green-600 mt-2">Image uploaded successfully!</p>
                        <img src={block.value} alt={block.alt || "Uploaded image preview"} className="w-32 h-32 rounded-lg object-cover mt-2 shadow-md" />
                      </>
                    )}
                    {!block.isLoading && block.uploadFailed && (
                      <p className="text-sm text-red-600 mt-2">Image upload failed. Please try again.</p>
                    )}
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeBlock(index)}
                className="btn btn-error btn-sm mt-2"
              >
                Remove Block
              </button>
            </div>
          ))}
          <div className="flex flex-wrap justify-around gap-2 mt-4">
            <button
              type="button"
              onClick={() => addBlock("heading")}
              className="btn btn-info btn-outline flex-grow"
            >
              Add Heading
            </button>
            <button
              type="button"
              onClick={() => addBlock("paragraph")}
              className="btn btn-primary btn-outline flex-grow"
            >
              Add Paragraph
            </button>
            <button
              type="button"
              onClick={() => addBlock("image")}
              className="btn btn-success btn-outline flex-grow"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={() => addBlock("list")}
              className="btn btn-warning btn-outline flex-grow"
            >
              Add List Item
            </button>
          </div>
        </div>

        ---
        ### Course FAQs
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">Course FAQs</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2 border-b pb-4 mb-4 last:border-b-0 last:pb-0">
              <label htmlFor={`faq-question-${index}`} className="label font-semibold">FAQ #{index + 1} Question</label>
              <input
                type="text"
                id={`faq-question-${index}`}
                placeholder="Question"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                value={faq.question}
                onChange={(e) => handleFaqChange(index, "question", e.target.value)}
              />
              <label htmlFor={`faq-answer-${index}`} className="label font-semibold">FAQ #{index + 1} Answer</label>
              <textarea
                id={`faq-answer-${index}`}
                placeholder="Answer"
                className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
              />
              {faqs.length > 1 && ( // Only show remove button if there's more than one FAQ
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
        ### SEO Meta Information
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">SEO Meta Information (Optional)</h2>
          <div className="space-y-1">
            <label htmlFor="metaTitle" className="label font-semibold">Meta Title</label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              placeholder="e.g., Robotics Course for Kids | JRTinker"
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="metaDescription" className="label font-semibold">Meta Description</label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              placeholder="A concise summary of the course for search engines."
              className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="metaKeywords" className="label font-semibold">Meta Keywords</label>
            <input
              type="text"
              id="metaKeywords"
              name="metaKeywords"
              placeholder="comma, separated, keywords, for, SEO"
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          // Disable if submitting or if any image block is currently uploading
          disabled={isSubmitting || contentBlocks.some(block => block.type === 'image' && block.isLoading)}
        >
          {isSubmitting ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;