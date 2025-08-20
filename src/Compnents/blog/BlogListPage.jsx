import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { Helmet } from "react-helmet-async";

// Pro-tip: Move API URLs to constants for easier management
const API_URL = "https://jrtinker01.onrender.com/api/blogs";

const BlogListingPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(API_URL);
        
        // FIX: Correctly handle the API response data structure
        const fetchedBlogs = Array.isArray(res.data) ? res.data : res.data?.blogs || [];

        setBlogPosts(fetchedBlogs);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper function to generate structured data for SEO
  const generateSchema = () => {
    if (!blogPosts || blogPosts.length === 0) {
      return null;
    }

    const itemListElement = blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://jrtinker.com/blog/${post.slug}`,
      name: post.title,
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "JRtinker Blog Articles",
      itemListElement,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* --- SEO HEAD SECTION --- */}
      <Helmet>
        <title>JRtinker Blog - STEM & Coding for Kids</title>
        <meta
          name="description"
          content="Read JRtinker's latest blogs on STEM learning, coding, robotics, AI, and online courses for kids in India."
        />
        <link rel="canonical" href="https://jrtinker.com/blog" />

        {/* --- Social Media Meta Tags (Open Graph & Twitter) --- */}
        <meta property="og:title" content="JRtinker Blog - STEM & Coding for Kids" />
        <meta
          property="og:description"
          content="Read JRtinker's latest blogs on STEM learning, coding, robotics, AI, and online courses for kids in India."
        />
        <meta property="og:url" content="https://jrtinker.com/blog" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://jrtinker.com/images/social-share-blogs.jpg" // Replace with a link to a relevant banner image
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JRtinker Blog - STEM & Coding for Kids" />
        <meta
          name="twitter:description"
          content="Read JRtinker's latest blogs on STEM learning, coding, robotics, AI, and online courses for kids in India."
        />
        <meta
          name="twitter:image"
          content="https://jrtinker.com/images/social-share-blogs.jpg" // Replace with a link to a relevant banner image
        />

        {/* --- Structured Data (Schema Markup) --- */}
        {blogPosts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(generateSchema())}
          </script>
        )}
      </Helmet>

      {/* --- PAGE CONTENT --- */}
      <section className="w-full pt-20 sm:pt-32 md:pt-44 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2e3d62] text-center mb-12 sm:mb-16">
            Our Blog & Latest Articles
          </h1>

          {blogPosts.length === 0 && !loading ? (
            <p className="text-center text-gray-600 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {blogPosts.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    translateY: -8,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
                >
                  <Link to={`/blog/${blog.slug}`} className="block group h-full flex flex-col">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-52 object-cover object-center"
                    />
                    <div className="p-5 sm:p-6 space-y-3 flex flex-col flex-grow">
                      <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                        {blog.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#2e3d62] leading-tight group-hover:text-purple-700 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed line-clamp-3 flex-grow">
                        {blog.description}
                      </p>
                      <div className="flex items-center justify-between text-gray-500 text-sm pt-3">
                        <span>By {blog.author}</span>
                        <span>
                          {new Date(blog.publishDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="pt-4 flex items-center gap-2 text-purple-600 font-semibold transition-colors group-hover:text-purple-800">
                        Read More <FaArrowRightLong className="mt-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogListingPage;