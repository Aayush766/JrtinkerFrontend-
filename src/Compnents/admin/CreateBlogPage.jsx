// src/Compnents/admin/AdminCreateBlog.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    author: "",
    publishDate: "",
    contentBlocks: [],
    faqs: [{ question: "", answer: "" }],
    metaDescription: "",
    metaKeywords: "",
    metaTitle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setFormData((prevData) => ({
      ...prevData,
      publishDate: `${year}-${month}-${day}`,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData((prevData) => ({ ...prevData, faqs: newFaqs }));
  };

  const addFaq = () => {
    setFormData((prevData) => ({
      ...prevData,
      faqs: [...prevData.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    if (newFaqs.length === 0) {
      setFormData((prevData) => ({ ...prevData, faqs: [{ question: "", answer: "" }] }));
    } else {
      setFormData((prevData) => ({ ...prevData, faqs: newFaqs }));
    }
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = formData.contentBlocks.map((block, i) => {
      if (i === index) {
        if (field === "type") {
          let resetBlock = { ...block, type: value, value: "" };

          if (value === "heading") {
            resetBlock.level = block.level || 2;
            delete resetBlock.alt;
            delete resetBlock.items;
            delete resetBlock.isLoading;
            delete resetBlock.uploadFailed;
          } else if (value === "image") {
            resetBlock.alt = block.alt || "";
            resetBlock.isLoading = false;
            resetBlock.uploadFailed = false;
            delete resetBlock.level;
            delete resetBlock.items;
          } else if (value === "list") {
            resetBlock.items = block.items || [""];
            delete resetBlock.level;
            delete resetBlock.alt;
            delete resetBlock.isLoading;
            delete resetBlock.uploadFailed;
          } else {
            delete resetBlock.level;
            delete resetBlock.alt;
            delete resetBlock.items;
            delete resetBlock.isLoading;
            delete resetBlock.uploadFailed;
          }
          return resetBlock;
        } else if (field === "items") {
          return { ...block, [field]: value.split("\n") };
        } else if (field === "level") {
          return { ...block, [field]: parseInt(value) };
        } else {
          return { ...block, [field]: value };
        }
      }
      return block;
    });
    setFormData((prevData) => ({ ...prevData, contentBlocks: newBlocks }));
  };

  const addBlock = (type) => {
    let newBlock;
    if (type === "image") {
      newBlock = {
        type,
        value: "",
        alt: "",
        isLoading: false,
        uploadFailed: false,
      };
    } else if (type === "heading") {
      newBlock = { type, value: "", level: 2 };
    } else if (type === "list") {
      newBlock = { type, items: [""] };
    } else {
      newBlock = { type, value: "" };
    }
    setFormData((prevData) => ({
      ...prevData,
      contentBlocks: [...prevData.contentBlocks, newBlock],
    }));
  };

  const removeBlock = (index) => {
    const newBlocks = formData.contentBlocks.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, contentBlocks: newBlocks }));
  };

  const handleCloudinaryImageUpload = async (file, index) => {
    if (!file) return;

    const updatedBlocksLoading = [...formData.contentBlocks];
    if (updatedBlocksLoading[index]) {
      updatedBlocksLoading[index].isLoading = true;
      updatedBlocksLoading[index].uploadFailed = false;
    }
    setFormData((prevData) => ({ ...prevData, contentBlocks: updatedBlocksLoading }));

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "jr-tinker");
    formDataUpload.append("cloud_name", "priyank-cloud");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${formDataUpload.get("cloud_name")}/image/upload`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      if (response.ok) {
        const result = await response.json();
        const updatedBlocksSuccess = [...formData.contentBlocks];
        if (updatedBlocksSuccess[index]) {
          updatedBlocksSuccess[index].value = result.url;
          updatedBlocksSuccess[index].isLoading = false;
          updatedBlocksSuccess[index].uploadFailed = false;
        }
        setFormData((prevData) => ({
          ...prevData,
          contentBlocks: updatedBlocksSuccess,
        }));
        toast.success(`Image for Block ${index + 1} uploaded successfully!`);
      } else {
        const errorText = await response.text();
        console.error("Cloudinary upload failed:", errorText);
        const updatedBlocksFail = [...formData.contentBlocks];
        if (updatedBlocksFail[index]) {
          updatedBlocksFail[index].uploadFailed = true;
          updatedBlocksFail[index].isLoading = false;
        }
        setFormData((prevData) => ({
          ...prevData,
          contentBlocks: updatedBlocksFail,
        }));
        toast.error(`Image upload failed for Block ${index + 1}. Please try again.`);
      }
    } catch (error) {
      console.error("Error in Image Upload:", error);
      const updatedBlocksError = [...formData.contentBlocks];
      if (updatedBlocksError[index]) {
        updatedBlocksError[index].uploadFailed = true;
        updatedBlocksError[index].isLoading = false;
      }
      setFormData((prevData) => ({
        ...prevData,
        contentBlocks: updatedBlocksError,
      }));
      toast.error(`Error in Image Upload for Block ${index + 1}. Check console for details.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const {
      title,
      category,
      author,
      publishDate,
      contentBlocks,
      faqs,
      slug,
      metaDescription,
      metaKeywords,
      metaTitle,
    } = formData;

    // --- Client-side Validation ---
    // Core blog details (Title, Category, Author, Publish Date) remain required
    if (!title.trim() || !category.trim() || !author.trim() || !publishDate.trim()) {
      toast.error("Please fill in all required blog details (Title, Category, Author, Publish Date).");
      setIsSubmitting(false);
      return;
    }

    // Still require at least one content block, but its content can be optional
    if (contentBlocks.length === 0) {
      toast.error("Please add at least one content block for the blog post.");
      setIsSubmitting(false);
      return;
    }

    const cleanedContentBlocks = [];
    for (const [index, block] of contentBlocks.entries()) {
      const newBlock = { type: block.type };

      if (!block.type) {
        toast.error(`Content Block ${index + 1}: Please select a Block Type.`);
        setIsSubmitting(false);
        return;
      }

      if (block.type === "image") {
        if (block.isLoading) {
          toast.warn(`Content Block ${index + 1}: Please wait for image upload to complete.`);
          setIsSubmitting(false);
          return;
        }
        // Image value is optional, only include if it exists
        if (block.value) {
            newBlock.value = block.value;
        }
        if (block.alt) newBlock.alt = block.alt.trim();
      } else if (block.type === "list") {
        const trimmedItems = (Array.isArray(block.items) ? block.items : [])
          .map(item => item.trim())
          .filter(item => item !== ''); // Remove empty strings
        // List items are now optional, include only if there are non-empty items
        if (trimmedItems.length > 0) {
          newBlock.items = trimmedItems;
        } else {
            // If the list block is empty, you can still push it, or choose to exclude it.
            // For "optional" meaning "can be empty", we push it.
            newBlock.items = []; // Ensure it's an empty array if no items
        }
      } else { // paragraph, heading, code, quote
        // Value for these blocks is now optional
        if (block.value && block.value.trim() !== "") {
          newBlock.value = block.value.trim();
        } else {
            newBlock.value = ""; // Ensure it's an empty string if no value
        }

        if (block.type === "heading") {
          if (!block.level || block.level < 1 || block.level > 6) {
            toast.error(`Content Block ${index + 1}: Heading level must be between 1 and 6.`);
            setIsSubmitting(false);
            return;
          }
          newBlock.level = block.level;
        }
      }
      // Push the block, even if its value/items are empty, because the type was selected.
      cleanedContentBlocks.push(newBlock);
    }

    // Derive imageUrl and description (still optional)
    let blogImageUrl = '';
    let blogDescription = '';

    const firstImageBlock = cleanedContentBlocks.find(
      (block) => block.type === "image" && block.value
    );
    if (firstImageBlock) {
      blogImageUrl = firstImageBlock.value;
    }

    const paragraphBlocks = cleanedContentBlocks.filter(
      (block) => block.type === "paragraph" && block.value && block.value.trim() !== ""
    );
    if (paragraphBlocks.length > 0) {
      blogDescription = paragraphBlocks
        .map((block) => block.value)
        .join(" ")
        .substring(0, 890);
    }

    // Filter and validate FAQs (only send non-empty ones)
    const cleanedFaqs = faqs.filter(
      (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
    );

    const generatedSlug =
      slug.trim() ||
      title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-*|-*$/g, "");

    if (!generatedSlug) {
      toast.error("Slug cannot be empty. Please enter a title or a slug.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title: title.trim(),
      slug: generatedSlug,
      category: category.trim(),
      author: author.trim(),
      publishDate: publishDate,
      imageUrl: blogImageUrl,
      description: blogDescription,
      contentBlocks: cleanedContentBlocks,
      faqs: cleanedFaqs,
      metaDescription: metaDescription.trim() || undefined,
      metaKeywords: metaKeywords.trim() || undefined,
      metaTitle: metaTitle.trim() || undefined,
    };

    console.log("Submitting Payload:", payload);

    try {
      const response = await fetch(
        "https://jrtinker01.onrender.com/api/blogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Blog post created successfully!");
        setFormData({
          title: "",
          slug: "",
          category: "",
          author: "",
          publishDate: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
          contentBlocks: [],
          faqs: [{ question: "", answer: "" }],
          metaDescription: "",
          metaKeywords: "",
          metaTitle: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        let errorMessage = errorData.message || "Unknown error occurred.";

        if (errorData.errors) {
          errorMessage += "\nDetails:";
          for (const field in errorData.errors) {
            errorMessage += `\n- ${field}: ${errorData.errors[field].message || errorData.errors[field]}`;
          }
        }
        toast.error(`Error creating blog post: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error in Blog Creation (Frontend fetch):", error);
      toast.error("Network error or failed to connect to server. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 pt-60 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create a New Blog Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="label font-semibold text-black">Blog Title<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Slug (Optional, can be auto-generated or manually entered) */}
        <div className="space-y-1">
          <label className="label font-semibold text-black">Blog Slug (URL-friendly)</label>
          <input
            type="text"
            name="slug"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={formData.slug}
            onChange={handleChange}
            placeholder="auto-generated if empty"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="label font-semibold text-black">Category<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="category"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* Author */}
        <div className="space-y-1">
          <label className="label font-semibold text-black">Author Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="author"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        {/* Publish Date */}
        <div className="space-y-1">
          <label className="label font-semibold text-black">Publish Date<span className="text-red-500">*</span></label>
          <input
            type="date"
            name="publishDate"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
            value={formData.publishDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* --- SECTION FOR DYNAMIC CONTENT BLOCKS --- */}
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">Blog Content</h2>
          {formData.contentBlocks.map((block, index) => (
            <div key={index} className="space-y-2 border-b pb-4 mb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-bold text-black">Content Block #{index + 1}</h3>
              <div className="flex flex-col space-y-2">
                <label className="label font-semibold">Block Type<span className="text-red-500">*</span></label>
                <select
                  className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                  value={block.type || ""}
                  onChange={(e) => handleBlockChange(index, "type", e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="image">Image</option>
                  <option value="list">List Item</option>
                  <option value="quote">Quote</option>
                  <option value="code">Code Block</option>
                </select>

                {/* Conditional rendering for different block types */}
                {(block.type === "paragraph" || block.type === "quote" || block.type === "code") && (
                  <textarea
                    placeholder={`Enter ${block.type} text (optional)`}
                    className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                    value={block.value || ""}
                    onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                    rows={block.type === "code" ? "8" : "4"}
                    // 'required' attribute removed
                  />
                )}

                {block.type === "heading" && (
                  <div>
                    <label className="label font-semibold">Heading Text</label>
                     <textarea
                      placeholder="Enter heading text (optional)"
                      className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                      value={block.value || ""}
                      onChange={(e) => handleBlockChange(index, "value", e.target.value)}
                      rows="2"
                    />
                    <label className="label font-semibold">Heading Level (1-6)<span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      placeholder="e.g., 2 for H2"
                      className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                      value={block.level || 2}
                      onChange={(e) => handleBlockChange(index, "level", e.target.value)}
                      required
                    />
                  </div>
                )}

                {block.type === "list" && (
                  <textarea
                    placeholder="Enter list items, one per line (optional)"
                    className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                    value={Array.isArray(block.items) ? block.items.join("\n") : ""}
                    onChange={(e) => handleBlockChange(index, "items", e.target.value)}
                    rows="4"
                    // 'required' attribute removed
                  />
                )}

                {block.type === "image" && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                      onChange={(e) => handleCloudinaryImageUpload(e.target.files[0], index)}
                      // 'required' attribute removed
                    />
                    <input
                      type="text"
                      placeholder="Image Alt Text (for accessibility)"
                      className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                      value={block.alt || ""}
                      onChange={(e) => handleBlockChange(index, "alt", e.target.value)}
                    />
                    {block.isLoading && (
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="loading loading-spinner loading-md"></span>
                        <p className="text-sm text-blue-600">Uploading image...</p>
                      </div>
                    )}
                    {!block.isLoading && block.value && (
                      <>
                        <p className="text-sm text-green-600 mt-2">Image uploaded successfully!</p>
                        <img
                          src={block.value}
                          alt={block.alt || "Uploaded image preview"}
                          className="w-32 h-32 rounded-lg object-cover mt-2 shadow-md"
                        />
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
              className="btn btn-info btn-outline"
            >
              Add Heading
            </button>
            <button
              type="button"
              onClick={() => addBlock("paragraph")}
              className="btn btn-primary btn-outline"
            >
              Add Paragraph
            </button>
            <button
              type="button"
              onClick={() => addBlock("image")}
              className="btn btn-success btn-outline"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={() => addBlock("list")}
              className="btn btn-warning btn-outline"
            >
              Add List Item
            </button>
            <button
              type="button"
              onClick={() => addBlock("quote")}
              className="btn btn-accent btn-outline"
            >
              Add Quote
            </button>
            <button
              type="button"
              onClick={() => addBlock("code")}
              className="btn btn-neutral btn-outline"
            >
              Add Code Block
            </button>
          </div>
        </div>

        {/* --- SECTION FOR FAQS (Optional for blog) --- */}
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">Blog FAQs (Optional)</h2>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="space-y-2 border-b pb-4 mb-4 last:border-b-0 last:pb-0">
              <label className="label font-semibold text-black">FAQ #{index + 1}</label>
              <input
                type="text"
                placeholder="Question (optional)"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                value={faq.question}
                onChange={(e) =>
                  handleFaqChange(index, "question", e.target.value)
                }
              />
              <textarea
                placeholder="Answer (optional)"
                className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
                value={faq.answer}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
              />
              {formData.faqs.length > 1 || (faq.question.trim() !== "" || faq.answer.trim() !== "") ? (
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="btn btn-error btn-sm mt-2"
                >
                  Remove FAQ
                </button>
              ) : null}
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

        {/* --- SECTION FOR SEO META TAGS --- */}
        <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold text-gray-700">SEO Meta Information (Optional)</h2>
          <div className="space-y-1">
            <label className="label font-semibold">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              placeholder="e.g., How to Code in Python for Beginners | JRTinker Blog"
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={formData.metaTitle}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="label font-semibold">Meta Description</label>
            <textarea
              name="metaDescription"
              placeholder="A concise summary of the blog post for search engines."
              className="textarea textarea-bordered resize-none w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={formData.metaDescription}
              onChange={handleChange}
              maxLength={500}
            />
          </div>
          <div className="space-y-1">
            <label className="label font-semibold">Meta Keywords</label>
            <input
              type="text"
              name="metaKeywords"
              placeholder="python, coding, beginners, tutorial, JRTinker"
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:outline-0 focus:border-0"
              value={formData.metaKeywords}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting || formData.contentBlocks.some(block => block.type === 'image' && block.isLoading)}
        >
          {isSubmitting ? "Creating Blog Post..." : "Create Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;