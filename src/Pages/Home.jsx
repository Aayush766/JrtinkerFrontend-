import React, { lazy } from "react";
import { Helmet } from "react-helmet-async";

// Import the new LazyLoad helper
import LazyLoad from "../Compnents/LazyLoad";

// Keep the main hero section imported directly
import HomePageNew from "../Compnents/HomeNew";

// Lazily import all components that are "below the fold"
const WhyChooseUs = lazy(() => import("../Compnents/WhyChooseUs"));
const AboutUsHome = lazy(() => import("../Compnents/AboutUsHome"));
const LatestProgramsSlider = lazy(() => import("../Compnents/LatestProgramsSlider"));
const CourseFilterOptions = lazy(() => import("../Compnents/CourseFilterOptions"));
const NumberBanner = lazy(() => import("../Compnents/NumberBanner"));
const ParentTestimonials = lazy(() => import("../Compnents/parent-testimonial/ParentTestimonial"));
const TeacherTestimonials = lazy(() => import("../Compnents/TeacherTestimonial"));
const WhyChooseUs2 = lazy(() => import("../Compnents/WhyChooseUs2"));
const ChildrenTestimonial = lazy(() => import("../Compnents/childrenTestimonial/childrenTestimonial"));
const SummerCampbtn = lazy(() => import("../Compnents/SummerCampbtn"));

const Home = () => {
  return (
    <>
      <Helmet>
        <title>JRtinker</title>
        <link rel="canonical" href="https://jrtinker.com/" />
      </Helmet>

      <main className="w-full relative ">
        {/* The first component loads immediately */}
        <HomePageNew />

        {/* All subsequent components are wrapped in LazyLoad */}
        <LazyLoad>
          <WhyChooseUs />
        </LazyLoad>
        
        <LazyLoad>
          <AboutUsHome />
        </LazyLoad>
    
        <LazyLoad>
          <LatestProgramsSlider />
        </LazyLoad>

        <LazyLoad>
          <CourseFilterOptions />
        </LazyLoad>

        <LazyLoad>
          <NumberBanner />
        </LazyLoad>

        <LazyLoad>
          <ParentTestimonials />
        </LazyLoad>

        <LazyLoad>
          <TeacherTestimonials />
        </LazyLoad>

        <LazyLoad>
          <WhyChooseUs2 />
        </LazyLoad>
        
        <LazyLoad>
          <ChildrenTestimonial />
        </LazyLoad>

        <LazyLoad>
          <SummerCampbtn/>
        </LazyLoad>
      </main>
    </>
  );
};

export default Home;