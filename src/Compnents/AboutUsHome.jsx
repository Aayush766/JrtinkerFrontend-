import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useLanguage } from '../Context/LanguageContext';

const AboutUsHome = () => {
  const {t} = useLanguage()
  return (
    <section className="w-full+">
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 px-6 py-20 md:px-20 lg:p-[140px] gap-10 lg:gap-20 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/images/home-2.webp"
            alt="about-us-img"
            className="w-full max-w-[599px] object-contain"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <p className="text-xl font-extrabold text-red-400 mulish">{t.aboutus.mainheading}</p>
            <img src="/images/asset 53.svg" alt="asset2" loading="lazy"/>
          </div>

          <p className="text-3xl md:text-4xl leading-9 md:leading-11 text-[#33467b] font-medium salsa">
            {t.aboutus.subheading}
          </p>

          <p className="text-[1rem] text-gray-500">
              {t.aboutus.paragraph}
          </p>

          <Link
            to="/know-more-info"
            className="px-6 py-4 w-fit mt-6 text-white bg-[#e6a72a] flex items-center gap-2.5 rounded-md uppercase text-xl salsa"
          >
             {t.aboutus.btntext} <FaArrowRightLong className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHome;
