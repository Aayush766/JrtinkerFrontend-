
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

import { useLanguage } from "../Context/LanguageContext";

 
const HomePageNew = () => {
  const {t} = useLanguage()

  return (
    <section className="w-full pt-14 lg:pt-30 min-h-screen ">
      <div className="w-full flex flex-col-reverse lg:flex-row justify-between">
        {/* Text Section */}
       
        <div className="w-full lg:w-3/5 px-6 lg:pl-52 text-[#2B3C6B] py-0 lg:py-20 left-home">
          <p className="text-[24px] sm:text-[40px] md:flex lg:text-[45px] tracking-tighter capitalize leading-[30px] salsa">
            {/* {t.careChildStudy} */}
            
             {t.home.mainheadingone}
          </p>
          <p className="text-[30px] sm:text-[44px] lg:text-[65px] tracking-tight capitalize mb-0 md:mb-2 lg:mb-2  salsa">
          
           {t.home.mainheadingtwo}
          </p>

          <div className="flex relative mb-0 md:mb-10 lg:mb-10 flex-col sm:flex-row items-center sm:items-start">
            <div className="w-fit relative mb-6 sm:mb-0">
              <img
                src="/images/background/bg-sub-slider.png"
                alt="bg-sub-slider"
                loading="lazy"
              />
              <p className="text-[36px] sm:text-[44px] lg:text-[52px] top-1/2 left-1/2 salsa text-center absolute text-white transform -translate-x-1/2 -translate-y-1/2">
                JRtinker
              </p>
            </div>
            <img
              src="/images/asset 46.svg"
              alt="line"
              className="absolute right-[24%] top-[-14%] hidden sm:block"
              loading="lazy"
            />
          </div>

          <div className="flex gap-4 sm:gap-6 mb-10 flex-wrap text-[#2B3C6B]">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-2xl text-pink-600" />
              <p className="text-lg sm:text-xl capitalize salsa">
                {/* {t.handsOnExperiments} */}
                  {t.home.benefitone}
                </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-2xl text-purple-600" />
              <p className="text-lg sm:text-xl capitalize salsa">
                {/* {t.codingRobotics} */}
                 {t.home.benefittwo}
                </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-2xl text-blue-600" />
              <p className="text-lg sm:text-xl capitalize salsa">
                {/* {t.creativeProblemSolving} */}
                 {t.home.benefitthree}
                </p>
            </div>
          </div> 

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-lg text-white">
            <Link
              to="/contact-us"
              className="px-6 py-3 bg-[#FF6666] flex items-center gap-2.5 rounded-md salsa w-full sm:w-auto justify-center"
            >
               {t.home.contact} <FaArrowRightLong />
              
            </Link>
            <Link
              to="/know-more-info"
              className="px-6 py-3 bg-[#2B3C6B] flex items-center gap-2.5 rounded-md salsa w-full sm:w-auto justify-center"
            >
               {t.home.learnmore} <FaArrowRightLong />
            
               
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-2/5 flex items-center justify-center right-home mb-2 lg:mb-0">
          <img src="/images/home-1.webp" alt="home image" className="w-full max-w-md sm:max-w-lg lg:max-w-none" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default HomePageNew;
