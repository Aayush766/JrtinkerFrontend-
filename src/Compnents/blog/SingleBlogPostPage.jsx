// src/pages/SingleBlogPostPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CircleArrowOutUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async"; // ✅ IMPORT HELMET HERE!

// ✅ IMPORT YOUR LOADING AND PAGNOTFOUND COMPONENTS
// Make sure your folder is named 'Components' (with an 'o') in your file system
import Loading from "../Loading";
import PageNotFound from "../PageNotFound";

// Helper component to render content blocks dynamically (no changes needed here)
const ContentRenderer = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="blog-content space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index} className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-700">{block.value}</p>;
          case "heading":
            const HeadingTag = `h${block.level || 2}`;
            return (
              <HeadingTag key={index} className={`text-${(7 - block.level) * 8}xl sm:text-${(7 - block.level) * 9}xl font-bold text-[#2e3d62] mt-8 mb-4`}>
                {block.value}
              </HeadingTag>
            );
          case "image":
            return (
              <figure key={index} className="my-6">
                <img src={block.value} alt={block.alt || "Blog image"} className="rounded-lg shadow-md w-full object-cover max-h-96" />
                {block.alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{block.alt}</figcaption>}
              </figure>
            );
          case "list":
            return (
              <ul key={index} className="list-disc list-inside text-base sm:text-lg text-gray-700 space-y-1">
                {Array.isArray(block.items) && block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={index} className="border-l-4 border-purple-600 pl-4 py-2 my-6 italic text-gray-800 text-lg sm:text-xl">
                "{block.value}"
              </blockquote>
            );
          case "code":
            return (
              <pre key={index} className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-x-auto my-6">
                <code>{block.value}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const SingleBlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogAndOtherBlogs = async () => {
      // Only proceed if slug is defined
      if (!slug) {
        setLoading(false);
        setError("Blog post URL is incomplete.");
        return;
      }

      try {
        setLoading(true);
        setError(null); // Clear previous errors

        // Fetch the main blog post
        const blogRes = await axios.get(`https://jrtinker01.onrender.com/api/blogs/${slug}`);
        setBlog(blogRes.data); // Assuming res.data directly contains the blog object

        // Fetch all blogs to get "other blogs"
        const allBlogsRes = await axios.get("https://jrtinker01.onrender.com/api/blogs");

        let allBlogsArray = [];
        if (Array.isArray(allBlogsRes.data)) {
          allBlogsArray = allBlogsRes.data;
        } else if (allBlogsRes.data && Array.isArray(allBlogsRes.data.data)) {
          allBlogsArray = allBlogsRes.data.data;
        } else if (allBlogsRes.data && Array.isArray(allBlogsRes.data.blogs)) {
          allBlogsArray = allBlogsRes.data.blogs;
        } else {
          console.warn("API response for /api/blogs (other blogs) is not a direct array or a known nested array. Check backend response structure.");
          allBlogsArray = [];
        }

        const filteredOtherBlogs = allBlogsArray.filter((post) => post.slug !== slug).slice(0, 3);
        setOtherBlogs(filteredOtherBlogs);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog post or other blogs:", err);
        // More specific error message for 404
        if (err.response && err.response.status === 404) {
          setError("The blog post you are looking for does not exist.");
        } else {
          setError("Failed to load blog post. Please check your internet connection or try again later.");
        }
        setLoading(false);
        setBlog(null);
        setOtherBlogs([]);
      }
    };
    fetchBlogAndOtherBlogs();
    window.scrollTo(0, 0); // Scroll to top on mount/slug change
  }, [slug]); // Dependency array includes slug

  // ✅ REMOVED: The old useEffect for manual DOM manipulation of meta tags is gone.
  // Helmet component below handles this.

  if (loading) {
    return <Loading />; // Using the imported Loading component
  }

  if (error || !blog) {
    return (
      <PageNotFound // Using the imported PageNotFound component
        message={error || "The blog post you are looking for does not exist or has been removed."}
      />
    );
  }

  return (
    <>
      {/* --- */}
      {/* ✅ ADDED: Helmet component for comprehensive SEO meta tags */}
      {blog && ( // Only render Helmet if blog data is available
        <Helmet>
          {/* Dynamic Title based on blog data, with fallback */}
          <title>{blog.metaTitle || blog.title} | Jr Tinker Blog</title>

          {/* Dynamic Meta Description based on blog data, with fallback */}
          <meta
            name="description"
            content={
              blog.metaDescription ||
              blog.description || // Assuming 'description' is a fallback if metaDescription isn't explicitly set
              "Read the latest articles and insights on STEM, technology, and education from Jr Tinker."
            }
          />

          {/* Dynamic Meta Keywords based on blog data, with fallback */}
          <meta
            name="keywords"
            content={
              blog.metaKeywords ||
              "blog, STEM, education, technology, science, coding, innovation, Jr Tinker"
            }
          />

          {/* Open Graph Tags (for social media sharing previews like Facebook, LinkedIn) */}
          <meta property="og:title" content={blog.metaTitle || blog.title} />
          <meta property="og:description" content={blog.metaDescription || blog.description} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://jrtinker.com/blog/${blog.slug}`} />
          {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
          {/* Consider adding og:image:alt if your backend provides it */}

          {/* Twitter Card Tags (for Twitter previews) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={blog.metaTitle || blog.title} />
          <meta name="twitter:description" content={blog.metaDescription || blog.description} />
          {blog.imageUrl && <meta name="twitter:image" content={blog.imageUrl} />}

          {/* Canonical URL (important for SEO to prevent duplicate content issues) */}
          <link rel="canonical" href={`https://jrtinker.com/blog/${blog.slug}`} />
        </Helmet>
      )}
      {/* --- */}

      <section className="w-full pt-20 sm:pt-32 md:pt-44">
        <div className="flex flex-col lg:flex-row items-start justify-between p-4 sm:p-6 lg:p-12 gap-8 max-w-7xl mx-auto">
          {/* Main Blog Post Content */}
          <div className="w-full lg:w-2/3 space-y-6 sm:space-y-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors text-lg"
            >
              <FaArrowLeftLong /> Back to All Blogs
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2e3d62] mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 text-sm sm:text-base mb-6">
              <span className="mr-4">By <span className="font-semibold">{blog.author}</span></span>
              <span className="mr-4">|</span>
              <span>Published on {new Date(blog.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                {blog.category}
              </span>
            </div>

            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="rounded-xl object-cover w-full max-h-[31rem] shadow-md"
            />

            {/* Render content blocks using the helper component */}
            <ContentRenderer blocks={blog.contentBlocks} />

            {/* Social Sharing (Optional) */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-4 text-gray-700">
              <span className="font-semibold">Share this post:</span>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" className="w-8 h-8" />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">
                <img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter" className="w-8 h-8" />
              </a>
              <a href={`https://wa.me/?text=${encodeURIComponent(blog.title + " " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" alt="WhatsApp" className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Right Section - Other Blogs */}
          <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-xl p-4 sm:p-6 space-y-6">
            <h3 className="text-2xl font-bold text-[#2e3d62] mb-4">
              More from our Blog
            </h3>
            {otherBlogs.length > 0 ? (
              <div className="space-y-6">
                {otherBlogs.map((otherBlog) => (
                  <Link
                    to={`/blog/${otherBlog.slug}`}
                    key={otherBlog._id}
                    className="flex items-center gap-4 group"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img
                      src={otherBlog.imageUrl}
                      alt={otherBlog.title}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-[#2e3d62] group-hover:text-purple-700 transition-colors leading-tight">
                        {otherBlog.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {otherBlog.description}
                      </p>
                    </div>
                    <CircleArrowOutUpRight className="text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" size={20} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No other blogs available.</p>
            )}

            {/* Contact Section (Can be reused from CourseClassDetails or simplified) */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <h3 className="text-xl sm:text-2xl font-medium text-[#2e3d62]">
                Need Help? Contact Us!
              </h3>
              <div className="grid grid-cols-1 gap-4">
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
        </div>
      </section>
    </>
  );
};

export default SingleBlogPostPage;