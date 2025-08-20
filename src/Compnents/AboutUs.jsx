import React from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaEye,
  FaArrowRight,
  FaCogs,
  FaBrain,
  FaCode,
  FaPuzzlePiece,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// --- Skill Pill Component ---
const SkillPill = ({ icon, text }) => (
  <motion.div
    variants={fadeInUp}
    className="flex items-center gap-3 bg-white shadow-md rounded-full py-3 px-5"
  >
    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-100 text-[#FF6666] rounded-full">
      {icon}
    </div>
    <span className="font-semibold text-[#2B3C6B]">{text}</span>
  </motion.div>
);

const AboutUs = () => {

  // --- Structured Data for SEO ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Jr. Tinker",
    "url": "https://www.jrtinker.com/about", // Change to your actual URL
    "logo": "https://www.jrtinker.com/images/logo-new.png", // Change to your actual logo URL
    "description": "Jr. Tinker is a leading provider of STEM, Robotics, AI, Coding, and AR/VR education for K–12 students, focusing on hands-on learning to develop 21st-century skills.",
    "sameAs": [
      // Add your social media links here
      // "https://www.facebook.com/your-page",
      // "https://www.instagram.com/your-page"
    ]
  };

  return (
    <>
      {/* ======================================= */}
      {/* SEO Head Section                        */}
      {/* ======================================= */}
      <Helmet>
        <title>About Us | Jr. Tinker | STEM & Robotics Education</title>
        <meta 
          name="description" 
          content="Learn about Jr. Tinker, the leading provider of STEM, Robotics, AI, and Coding education for K-12 students. Discover our mission to empower young minds for a technology-driven future." 
        />
        <link rel="canonical" href="https://www.jrtinker.com/about" /> {/* Change to your actual URL */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="bg-slate-50 overflow-hidden">
        {/* ======================================= */}
        {/* Hero Section - Asymmetrical           */}
        {/* ======================================= */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-28">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-red-50 rounded-bl-[100px] -z-0"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-[#2B3C6B] tracking-tighter leading-[1.1] salsa">
                  Where Curiosity
                  <br />
                  Builds The <span className="text-[#FF6666]">Future.</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-lg">
                  At Jr. Tinker, we provide a vibrant ecosystem where young minds
                  transform their creative sparks into real-world innovations.
                </p>
              </motion.div>
              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4">
                  <div className="w-full h-full bg-gradient-to-br from-[#FF6666] to-purple-500 rounded-3xl transform -rotate-3"></div>
                </div>
                <img
                  src="/images/home-1.webp"
                  alt="Young student building a robot at a Jr. Tinker STEM workshop" // SEO: Descriptive alt text
                  className="relative w-full h-auto object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================= */}
        {/* Mission & Vision Section                */}
        {/* ======================================= */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Mission Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-[#2B3C6B] text-white p-10 rounded-3xl relative overflow-hidden"
              >
                <FaBullseye className="absolute -right-8 -bottom-8 text-9xl text-white/10" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-200 leading-relaxed">
                  To empower young minds through technology-driven learning,
                  using STEM, Robotics, AI, Coding, and AR/VR to boost academic
                  excellence and equip them to solve real-world problems.
                </p>
              </motion.div>
              {/* Vision Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white p-10 rounded-3xl relative overflow-hidden shadow-lg"
              >
                <FaEye className="absolute -right-8 -bottom-8 text-9xl text-gray-100" />
                <h2 className="text-3xl font-bold text-[#2B3C6B] mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To inspire innovation and cultivate 21st-century skills in
                  K–12 students worldwide, preparing them to thrive in the
                  technology-driven future.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ======================================= */}
        {/* "How We Do It" - Skill Showcase         */}
        {/* ======================================= */}
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2B3C6B] mb-4">
                Nurturing Core Abilities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                Through hands-on learning with Robotics, AI, and IoT, we help
                students develop essential skills for the future.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center items-center gap-4"
            >
              <SkillPill icon={<FaBrain />} text="Creativity & Logic" />
              <SkillPill icon={<FaCogs />} text="Problem-Solving" />
              <SkillPill icon={<FaCode />} text="Computational Thinking" />
              <SkillPill icon={<FaPuzzlePiece />} text="Logical Thinking" />
            </motion.div>
          </div>
        </section>

        {/* ======================================= */}
        {/* Final CTA Section                       */}
        {/* ======================================= */}
        <section className="bg-slate-50">
          <div className="container mx-auto px-6 py-20 md:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-[#2B3C6B] to-[#4A5C8B] text-white text-center p-12 rounded-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build?
              </h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
                Explore our courses and give your child the tools to become a
                future-ready innovator today.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-3 bg-[#FF6666] font-bold py-4 px-10 rounded-full text-xl hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore Our Courses <FaArrowRight /> {/* SEO: Descriptive link text */}
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;