import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineLocationOn, MdOutlineMailOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom"; 
import { useCourses } from "../Context/CourseProvider"; 

const Footer = () => {
  const programsArr = [1, 2, 3, 4, 5, 6, 7];
  const {courses} = useCourses()

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center mt-48 relative"
      style={{
        backgroundImage: 'url("/images/background/bg-footer-2.jpg")',
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subscribe Banner */}
      <div className="w-full flex justify-center absolute -top-24 px-4">
        <div className="relative w-full max-w-6xl flex flex-col items-center">
          <img
            src="/images/background/bg-subcribe.png"
            alt="bg-subcribe"
            className="object-cover object-center transform scale-[1.1] w-full"
          />
          <img
            src="/images/patternphoto/feauture-blog-3.png"
            alt="feature-blog-3"
            className="absolute top-20 left-0 object-cover object-center w-20 md:w-auto"
          />
          <img
            src="/images/patternphoto/feauture-blog-4.png"
            alt="feature-blog-4"
            className="absolute top-12 right-0 object-cover object-center w-20 md:w-auto"
          />
          <div className="absolute top-0 h-full w-full flex items-center flex-col px-4 py-16 space-y-4">
            <p className="text-[28px] sm:text-[32px] md:text-[40px] text-white font-medium salsa text-center">
              Subscribe Our Newsletter
            </p>
            <p className="text-center w-full md:w-3/4 font-medium text-white text-sm md:text-md">
            Inspiring the next generation through creative exploration, immersive learning, and a passion for innovation that sparks lifelong curiosity.
            </p>
            <div className="w-full md:min-w-[730px] bg-white rounded-sm mt-6">
              <form className="flex flex-col sm:flex-row items-center w-full py-2 px-3 rounded-sm gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full py-3 px-4 text-base sm:text-lg text-blue-900 border-none outline-none font-medium salsa"
                />
                <button className="w-full sm:w-auto px-6 py-3 bg-[#FF6666] flex items-center justify-center gap-2.5 uppercase text-white text-base sm:text-xl font-medium salsa">
                  Subscribe <FaArrowRightLong />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="text-white w-full flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-28 pt-[350px] px-6">
        {/* Logo and Contact Info */}
        <div className="space-y-3 w-full lg:w-1/4">
          <img src="/images/nav-logo.png" alt="logo" className="w-[138px]" />
          <p>
          Empowering young minds through innovation and hands-on learning to shape a brighter future.
          </p>
          <div className="text-lg space-y-4 mt-6">
            <div className="flex items-center gap-2">
              <MdOutlineLocationOn className="text-2xl text-amber-400" />
              <p className="salsa">55 Main Street, New York</p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineMailOutline className="text-2xl text-amber-400" />
              <p className="salsa">hotline@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlinePhone className="text-2xl text-amber-400" />
              <p className="salsa">+012 (345) 678</p>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="relative w-full lg:w-1/4">
          <img
            src="/images/background/bg-business2.png"
            alt="bg-business"
            className="object-cover w-full"
          />
          <div className="absolute top-0 h-full w-full px-6 py-7 space-y-6">
            <div className="space-y-2">
              <p className="text-2xl font-medium salsa">Opening Hours</p>
              <p className="text-lg pl-6 salsa">Sunday - Friday</p>
              <p className="text-lg pl-6 salsa">08 am - 05 pm</p>
            </div>
            <div className="border-dashed border-b-2"></div>
            <div className="space-y-2">
              <p className="text-lg salsa">Every Saturday and Govt Holiday</p>
              <p className="text-2xl font-medium salsa">Closed</p>
            </div>
          </div>
        </div>

        {/* Program List */}
        <div className="space-y-3 w-full lg:w-1/4">
          <p className="text-2xl font-medium salsa">Our Program</p>
          {courses.map((element, index) => (
            <div key={index} className="flex items-center gap-2 pl-2.5 mb-3">
              <RiArrowRightSLine className="text-2xl" />
              <Link  to={`/courses/${element._id}`} className="text-base">{element.courseName}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Footer;
