import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';
// import testimonialData from './testimonialData';
import TestimonialCard from './TestimonialCard';
import { useLanguage } from "../../Context/LanguageContext";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

const ParentTestimonials = () => {

  const {t} = useLanguage()


  const testimonialData = [
    {
      name: t.parentstestimonials.nancy.name,
      text: t.parentstestimonials.nancy.text,
      image:"/images/parents/parent-1.jpeg"
    },
    {
        name: t.parentstestimonials.khusboo_singh.name,
      text: t.parentstestimonials.khusboo_singh.text,
      image:"/images/parents/parent-2.jpeg"
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 px-4 sm:px-6 md:px-12 bg-[#FCF9F4] relative">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">
          {t.parentstestimonials.mainheading}
        </h2>
        <p className="text-lg text-indigo-700 max-w-2xl mx-auto font-light">
        {t.parentstestimonials.subheading}
        </p>
      </motion.div>

      <div className="absolute -left-4 top-10 text-indigo-200 opacity-30 pointer-events-none z-0">
        <QuoteIcon size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={2000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active bg-indigo-600',
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="pb-12"
        >
          <AnimatePresence>
            {testimonialData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </AnimatePresence>
        </Swiper>

        {/* Navigation Buttons */}
        <div className="swiper-button-prev custom-nav-button !text-indigo-600 !opacity-80 hover:!opacity-100 transition-opacity left-2 md:left-0 after:!text-2xl"></div>
        <div className="swiper-button-next custom-nav-button !text-indigo-600 !opacity-80 hover:!opacity-100 transition-opacity right-2 md:right-0 after:!text-2xl"></div>

 


      </div>
    </section>
  );
};

export default ParentTestimonials;
