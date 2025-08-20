import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import WhyUs from "./WhyUs";
import EnrollmentBanner from "./EnrollmentBanner";
import ChooseCamp from "./ChooseCamp";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    grade: "",
    school: "",
    parentContact: "",
  });

  const skills = [
    { name: "Financial Literacy", color: "text-emerald-500" },
    { name: "Robotics Fundamentals", color: "text-purple-500" },
    { name: "Entrepreneurship", color: "text-orange-500" },
    { name: "Internet Of Things", color: "text-teal-500" },
    { name: "Coding", color: "text-blue-500" },
    { name: "Vedic Maths", color: "text-amber-500" },
    { name: "3D Modeling & Printing", color: "text-green-500" },
    { name: "Python", color: "text-yellow-500" },
    { name: "Visual Block Coding", color: "text-green-500" },
  ];

  const handleEnrollNowClick = () => {
    navigate("/enroll");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const link = document.createElement("a");
    link.href =
      "https://res.cloudinary.com/dirdswp32/image/upload/v1749207724/SummerCampJRTinker_cq2ilm.pdf";
    link.download = "SummerCamp_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowModal(false);

    setFormData({
      studentName: "",
      studentEmail: "",
      grade: "",
      school: "",
      parentContact: "",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 pt-[174px]">
      {/* Background SVG Blob */}
      <svg
        className="absolute top-[-120px] left-[-100px] w-[600px] h-[800px] z-0 opacity-10"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#7F9CF5"
          d="M40.3,-64.7C52.1,-56.5,62.3,-44.3,68.1,-30.8C74,-17.3,75.5,-2.4,71.5,11.7C67.6,25.9,58.2,39.3,46.6,49.2C35,59,21.3,65.4,6.6,67.9C-8.2,70.4,-16.5,69,-27.5,64.4C-38.6,59.7,-52.5,51.8,-60.7,40.3C-68.9,28.8,-71.3,13.6,-68.2,0.3C-65.1,-13,-56.6,-25.3,-47.5,-36.2C-38.4,-47.2,-28.7,-56.7,-17.1,-62.7C-5.6,-68.7,7.9,-71.3,21.6,-70.6C35.3,-69.8,49.4,-65.9,40.3,-64.7Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-1 mb-4 border border-white/20 text-sm md:text-base text-red-600">
            Ignite Their Future!
          </div>

          <div className="mb-6 relative z-10">
            <h1 className="leading-none mb-4">
              <img
                src="/images/summerCamp/SummerCampBanner.png"
                alt="Summer Camp"
                className="block mx-auto w-[calc(100%-80px)] md:w-3/4 lg:w-[800px] h-auto"
              />
            </h1>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-2xl text-xl font-bold shadow-lg mt-0 md:text-2xl md:px-8 md:py-3">
              2025
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Learn Next-Gen Skills This Summer
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
            Starting From{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              1 July 2025
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Camp!
            </span>
          </h2>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={`${skill.color} bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium text-xs md:text-sm lg:text-base hover:scale-105 transition-transform duration-200 hover:shadow-lg border border-white/30`}
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 md:px-8 md:py-4 md:text-lg"
            onClick={handleEnrollNowClick}
          >
            Enroll Now
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white/60 backdrop-blur-sm border border-gray-300 text-gray-700 hover:bg-white/80 px-6 py-3 text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center md:px-8 md:py-4 md:text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            Brochure
          </button>
        </div>

        {/* Demo Class */}
        <div className="mt-6 flex justify-center">
          <button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-3 text-base font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 md:px-10 md:py-4 md:text-lg">
            Demo Class
          </button>
        </div>

        {/* Emojis */}
        <div className="absolute top-10 left-5 text-4xl md:top-20 md:left-20 md:text-7xl opacity-90 animate-bounce">🤖</div>
        <div className="absolute top-16 right-5 text-5xl md:top-32 md:right-32 md:text-8xl opacity-100 animate-spin-slow text-yellow-400 drop-shadow-[0_0_15px_rgba(255,223,0,0.8)]">☀️</div>
        <div className="absolute bottom-20 left-10 text-5xl md:bottom-40 md:left-32 md:text-8xl opacity-90 animate-bounce delay-1000">🚀</div>
        <div className="absolute bottom-10 right-10 text-6xl md:bottom-32 md:right-20 md:text-9xl opacity-95 animate-pulse delay-500">💻</div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Get the Brochure</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                placeholder="Student Name"
                className="w-full border px-3 py-2 rounded text-black"
              />
              <input
                type="email"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                required
                placeholder="Student Email"
                className="w-full border px-3 py-2 rounded text-black"
              />
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                placeholder="Grade"
                className="w-full border px-3 py-2 rounded text-black"
              />
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                placeholder="School"
                className="w-full border px-3 py-2 rounded text-black"
              />
              <input
                type="text"
                name="parentContact"
                value={formData.parentContact}
                onChange={handleChange}
                required
                placeholder="Parent Contact No."
                className="w-full border px-3 py-2 rounded text-black"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
              >
                Download Brochure
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Sections */}
      <EnrollmentBanner />
      <WhyUs />
      <ChooseCamp />
    </div>
  );
};

export default HeroSection;
