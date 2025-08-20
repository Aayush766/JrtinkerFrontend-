import { Link } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      img: "/images/Icons/study-game.png",
      alt: "Award icon with a star and ribbon",
      description: t.whychooseus.featureone.paragraph,
      title: t.whychooseus.featureone.title,
    },
    {
      img: "/images/Icons/atoz.png",
      alt: "Books icon representing curriculum",
      description: t.whychooseus.featuretwo.paragraph,
      title: t.whychooseus.featuretwo.title,
    },
    {
      img: "/images/Icons/expert-teacher.png",
      alt: "Expert Teacher icon",
      description: t.whychooseus.featurethree.paragraph,
      title: t.whychooseus.featurethree.title,
    },
    {
      img: "/images/Icons/mental-health.png",
      alt: "Mental Health icon",
      description: t.whychooseus.featurefour.paragraph,
      title: t.whychooseus.featurefour.title,
    },
  ];

  return (
    <section
    className="w-full relative  bg-cover  min-h-screen py-14 lg:py-[7rem]  "
    style={{ backgroundImage: "url('/images/background/bg-tf-discovery.png')" ,
   
      backgroundRepeat:"no-repeat",
     
    }}
  >
      {/* Decorative Top Wave */}
    
      

      <div className="w-full flex flex-col items-center py-20 md:py-20 px-4 text-red-400  sm:text-white md:text-white lg:text-white ">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-6">
          <img src="/images/asset 54.svg" alt="decor" className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-lg md:text-xl font-semibold">{t.whychooseus.mainheading}</p>
          <img src="/images/asset 53.svg" alt="decor" className="w-8 h-8 md:w-10 md:h-10" />
        </div>

        {/* Subheading */}
        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center max-w-[90%] md:max-w-[50%] leading-tight mb-12">
          {t.whychooseus.subheading}{" "}
          <span className="text-pink-500">JRtinker</span>
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4">
          {features.map((elem, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-2xl transition duration-300 hover:scale-[1.03] group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                  <img src={elem.img} alt={elem.alt} className="w-8 h-8" />
                </div>
              </div>
              <Link
                to={elem.path || "#"}
                className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200 capitalize mb-2 block"
              >
                {elem.title}
              </Link>
              <p className="text-sm text-gray-100">{elem.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Bottom Wave */}
     
    </section>
  );
};

export default WhyChooseUs;
