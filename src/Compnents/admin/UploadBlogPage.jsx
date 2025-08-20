import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle, XCircle } from "lucide-react";

const UpdateBlogPage = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    category: "",
    author: "",
    publishDate: "",
    description: "",
    contentBlocks: [],
    metaDescription: "",
    metaKeywords: "",
    metaTitle: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch blog data on component mount or ID change
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`); // Fetch by ID for admin updates
        const blogData = res.data;

        setFormData({
          title: blogData.title || "",
          imageUrl: blogData.imageUrl || "",
          category: blogData.category || "",
          author: blogData.author || "",
          // Format publishDate to 'YYYY-MM-DD' for input type="date"
          publishDate: blogData.publishDate
            ? new Date(blogData.publishDate).toISOString().split("T")[0]
            : "",
          description: blogData.description || "",
          // Ensure contentBlocks are properly initialized with default values for nested fields
          contentBlocks: blogData.contentBlocks.map((block) => ({
            ...block,
            value: block.value || "", // Ensure value is not null/undefined
            items: Array.isArray(block.items) ? block.items : [], // Ensure items is an array for lists
            level: block.level || 2, // Default heading level if not present
            alt: block.alt || "", // Default alt text for images if not present
          })),
          metaDescription: blogData.metaDescription || "",
          metaKeywords: blogData.metaKeywords || "",
          metaTitle: blogData.metaTitle || "",
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog for editing.");
        navigate("/admin/blogs"); // Redirect if not found or error
      } finally {
        setLoading(false); // Ensure loading is set to false even on error
      }
    };
    fetchBlog();
  }, [id, navigate]); // Depend on 'id' and 'navigate'

  // Handle changes for top-level form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for content blocks, including type-specific logic
  const handleContentBlockChange = (index, field, value) => {
    const updatedBlocks = formData.contentBlocks.map((block, i) => {
      if (i === index) {
        if (field === "type") {
          // Reset relevant fields when block type changes
          return {
            ...block,
            [field]: value,
            value: "", // Clear value
            items: [], // Clear items for lists
            level: undefined, // Clear heading level
            alt: "", // Clear alt text for images
          };
        } else if (field === "items") {
          // For list items, split the textarea value by new lines
          return { ...block, [field]: value.split("\n") };
        } else {
          return { ...block, [field]: value };
        }
      }
      return block;
    });
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  // Add a new content block with a default paragraph type
  const addContentBlock = () => {
    setFormData({
      ...formData,
      contentBlocks: [...formData.contentBlocks, { type: "paragraph", value: "" }],
    });
  };

  // Remove a content block by index
  const removeContentBlock = (index) => {
    const updatedBlocks = formData.contentBlocks.filter((_, i) => i !== index);
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload for submission
      const payload = {
        ...formData,
        // Ensure publishDate is an ISO string, default to current date if empty
        publishDate: formData.publishDate
          ? new Date(formData.publishDate).toISOString()
          : new Date().toISOString(),
        contentBlocks: formData.contentBlocks.map((block) => {
          // Convert list items from textarea string back to array if type is 'list'
          if (block.type === "list") {
            return {
              ...block,
              items: Array.isArray(block.items) ? block.items : [], // Ensure it's an array
            };
          }
          return block;
        }),
      };

      const res = await axios.put(`/api/blogs/${id}`, payload);
      toast.success(res.data.message);
      navigate("/admin/blogs"); // Redirect to admin blog list on success
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading blog data...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 sm:p-8 md:p-10">
      <h1 className="text-3xl font-bold text-[#2e3d62] mb-8">Update Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg space-y-6">
        {/* Basic Blog Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
              Image URL:
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-gray-700 text-sm font-bold mb-2">
              Publish Date:
            </label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Short Description (for listing):
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        {/* --- */}

        {/* Content Blocks Section */}
        <div className="border border-dashed border-gray-300 p-4 rounded-md">
          <h3 className="text-xl font-bold text-[#2e3d62] mb-4">Content Blocks</h3>
          {formData.contentBlocks.map((block, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={() => removeContentBlock(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove content block"
                >
                  <XCircle size={20} />
                </button>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">Block Type:</label>
                <select
                  value={block.type}
                  onChange={(e) => handleContentBlockChange(index, "type", e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="heading">Heading</option>
                  <option value="image">Image</option>
                  <option value="list">List</option>
                  <option value="quote">Quote</option>
                  <option value="code">Code Block</option>
                </select>
              </div>

              {block.type === "heading" && (
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Heading Level (1-6):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={block.level || 2} // Default to 2 if not set
                    onChange={(e) =>
                      handleContentBlockChange(index, "level", parseInt(e.target.value))
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}

              {block.type === "list" ? (
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    List Items (one per line):
                  </label>
                  <textarea
                    value={Array.isArray(block.items) ? block.items.join("\n") : ""}
                    onChange={(e) => handleContentBlockChange(index, "items", e.target.value)}
                    rows="4"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
              ) : (
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Content Value:
                  </label>
                  <textarea
                    value={block.value}
                    onChange={(e) => handleContentBlockChange(index, "value", e.target.value)}
                    rows={
                      block.type === "paragraph" || block.type === "quote" || block.type === "code"
                        ? "6"
                        : "2"
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required={
                      block.type !== "image"
                    } // Value is not required for image blocks as URL is handled by 'value'
                  ></textarea>
                </div>
              )}

              {block.type === "image" && (
                <div className="mb-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Alt Text (for image):
                  </label>
                  <input
                    type="text"
                    value={block.alt || ""}
                    onChange={(e) => handleContentBlockChange(index, "alt", e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addContentBlock}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <PlusCircle size={18} /> Add Content Block
          </button>
        </div>

        {/* --- */}

        {/* SEO Fields */}
        <div className="border border-dashed border-gray-300 p-4 rounded-md">
          <h3 className="text-xl font-bold text-[#2e3d62] mb-4">SEO Details</h3>
          <div className="mb-4">
            <label htmlFor="metaTitle" className="block text-gray-700 text-sm font-bold mb-2">
              Meta Title:
            </label>
            <input
              type="text"
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="70"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended max 70 characters.</p>
          </div>
          <div className="mb-4">
            <label htmlFor="metaDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Meta Description:
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="160"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Recommended max 160 characters.</p>
          </div>
          <div className="mb-4">
            <label htmlFor="metaKeywords" className="block text-gray-700 text-sm font-bold mb-2">
              Meta Keywords:
            </label>
            <input
              type="text"
              id="metaKeywords"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-xs text-gray-500 mt-1">
              Comma-separated keywords (e.g., "STEM, coding, education").
            </p>
          </div>
        </div>

        {/* --- */}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Blog Post
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogPage;