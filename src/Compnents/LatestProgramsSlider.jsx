import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { useCourses } from "../Context/CourseProvider";
import LatestProgramContent from "./LatestProgramContent";
// import "./latestProgramsSlider.css"; // 🆕 Add this line for custom styles
import { motion } from "framer-motion";
import { useLanguage } from "../Context/LanguageContext";

const LatestProgramsSlider = ({scrollYProgress}) => {
   const {t} = useLanguage()
  const { courses, loading } = useCourses();

  if (loading)
    return <p className="text-center text-lg font-medium">Loading courses...</p>;

  return (
    <motion.section
      className="w-full bg-cover bg-center bg-no-repeat min-h-[100vh] py-16 px-4 md:px-12 lg:px-20 relative"
      style={{ backgroundImage: "url('/images/background/bg-courses.png')" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-right">
        <div className="flex items-center gap-4 mb-4 justify-center">
          <img src="/images/asset 54.svg" alt="asset1" />
          <p className="text-xl font-extrabold text-red-400 mulish text-center">
            {t.latestprograms.mainheading}
          </p>
          <img src="/images/asset 53.svg" alt="asset2" />
        </div>

        <p className="text-4xl md:text-5xl text-[#34477b] font-medium salsa text-center leading-tight mb-12 max-w-2xl">
         {t.latestprograms.subheading}
        </p>

        <div className="w-full pb-12"> {/* 🆕 Add padding bottom */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            speed={1600}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            // pagination={{ clickable: true }}
            modules={[ Autoplay]}
            className="w-full latest-swiper"
          >
            {courses.slice(0, 6).map((course, index) => (
              <SwiperSlide key={index} className="h-full">
                <LatestProgramContent course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestProgramsSlider;
