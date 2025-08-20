import { useLanguage } from "../Context/LanguageContext";

const WhyChooseUs2 = () => {
  const {t} = useLanguage()


  return (
    <section className="w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-20 px-4 md:px-8">
        <div className="w-full md:w-1/2">
          <img
            src="/images/home-3.webp"
            className="w-full h-auto object-cover rounded-md "
            alt="service-img"
            loading="lazy"
          />
        </div>

        <div className="w-full md:w-1/2 py-8 md:py-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <p className="text-xl font-extrabold text-red-500 uppercase tracking-wider mulish">
                {t.whychooseustwo.mainheading}
              </p>
              <img src="/images/asset 53.svg" alt="asset2" className="h-6 w-auto" loading="lazy"/>
            </div>
            <h2 className="text-2xl md:text-4xl text-[#33467b] leading-tight font-semibold salsa">
               {t.whychooseustwo.subheading}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed md:w-4/5">
             {t.whychooseustwo.paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs2;