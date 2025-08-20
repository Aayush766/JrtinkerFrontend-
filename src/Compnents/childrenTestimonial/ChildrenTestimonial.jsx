import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../Context/LanguageContext"; // Ensure this path is correct

const ChildrenTestimonial = () => {
  const [active, setActive] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t.childrentestimonials.ahmed.name,
      image: "/images/childrens/children-1.jpeg",
      course: t.childrentestimonials.ahmed.course,
      review: t.childrentestimonials.ahmed.review,
    },
    {
      name: t.childrentestimonials.alfiya_khursheed.name,
      image: "/images/childrens/children-2.jpeg",
      course: t.childrentestimonials.alfiya_khursheed.course,
      review: t.childrentestimonials.alfiya_khursheed.review,
    },
    {
      name: t.childrentestimonials.abhinav_thakur.name,
      image: "/images/childrens/children-3.jpeg",
      course: t.childrentestimonials.abhinav_thakur.course,
      review: t.childrentestimonials.abhinav_thakur.review,
    },
    {
      name: t.childrentestimonials.adarsh_singh.name,
      image: "/images/childrens/children-4.jpeg",
      course: t.childrentestimonials.adarsh_singh.course,
      review: t.childrentestimonials.adarsh_singh.review,
    },
    {
      name: t.childrentestimonials.jasmine_siddiqui.name,
      image: "/images/childrens/children-5.jpeg",
      course: t.childrentestimonials.jasmine_siddiqui.course,
      review: t.childrentestimonials.jasmine_siddiqui.review,
    },
    {
      name: t.childrentestimonials.sakshi_singh.name,
      image: "/images/childrens/children-6.jpeg",
      course: t.childrentestimonials.sakshi_singh.course,
      review: t.childrentestimonials.sakshi_singh.review,
    },
  ];

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  // Optional: Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [active]); // Re-run effect when `active` changes to reset timer

  const randomRotate = () => {
    // Generate a random rotation between -5 and 5 degrees for a subtle effect
    return Math.floor(Math.random() * 11) - 5;
  };

  const activeTestimonial = testimonials[active];

  const isActive = (index) => index === active;

  return (
    <>
      <div className="flex items-center w-full justify-center pt-5">
        <h2 className="text-4xl md:text-5xl text-[#34477b] font-medium salsa text-center leading-tight max-w-2xl">
          {t.childrentestimonials.mainheading || "What Our Little Learners Say"}
        </h2>
      </div>

      <section className="w-full flex flex-col items-center justify-center py-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto items-center">
          {/* Image Container (Left on Lg, Top on Sm) */}
          <div className="relative w-full h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px] xl:h-[550px] max-w-sm md:max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-300">
            <AnimatePresence initial={false}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    rotate: randomRotate(),
                    zIndex: 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.4, // Active card is fully visible, others are slightly faded
                    scale: isActive(index) ? 1 : 0.85, // Active card is full size, others are slightly smaller
                    y: isActive(index) ? 0 : 20, // Active card is at its position, others are slightly lower
                    rotate: isActive(index) ? 0 : randomRotate(), // Active card is straight, others have slight rotation
                    zIndex: isActive(index) ? 10 : 1, // Active card is on top
                    filter: isActive(index) ? "blur(0px)" : "blur(1px)", // Subtle blur for non-active cards
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    rotate: randomRotate(),
                    zIndex: 0,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }} // Slightly longer and smoother transition
                  className="absolute inset-0 origin-center flex items-center justify-center" // Center origin for scale/rotate
                  style={{ pointerEvents: isActive(index) ? 'auto' : 'none' }} // Only active card is interactive (if any interaction were added)
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-3xl h-full w-full object-cover object-center border-4 border-white shadow-lg"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Review + Controls Container (Right on Lg, Bottom on Sm) */}
          <div className="flex flex-col justify-center w-full lg:min-h-[400px]"> {/* Added min-h for consistent height */}
            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.name + "content"} // Unique key for AnimatePresence to detect content change
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center lg:text-left"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#34477b] mb-2 font-salsa leading-tight">
                  {activeTestimonial.name}
                </h3>
                <p className="text-base sm:text-lg text-cyan-600 font-semibold mb-4">
                  {activeTestimonial.course}
                </p>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed italic">
                  "{activeTestimonial.review}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex justify-center lg:justify-start gap-4 mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                <FaArrowLeftLong />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                <FaArrowRightLong />
              </button>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center lg:justify-start gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive(index) ? "bg-blue-500 w-5" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChildrenTestimonial;