import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import NotLoginPopUp from "./NotLoginPopUp";
const Slider = () => {
  const courseData = [
    {
      id: 0,
      item: "Begin with Robotics",
    },
    {
      id: 1,
      item: "Jr.-Coders-Visual-Coding",
    },
    {
      id: 2,
      item: "Python-Beginner",
    },
    {
      id: 3,
      item: "Robot-Master",
    },
    {
      id: 4,
      item: "IoT-Master",
    },
    {
      id: 5,
      item: "Python-Master",
    },
    {
      id: 6,
      item: "Animator",
    },
    {
      id: 7,
      item: "Course-AR & VR",
    },
    {
      id: 8,
      item: " Drone-Master",
    },
  ];
  const { isAuthenticated } = useAuth();
  return (
    // <div className='w-full h-auto '>
    <>
      <Marquee
        className="w-full marque-container overflow-hidden py-2.5"
        speed={200}
        pauseOnHover
      >
        {courseData.map((e) => {
          return (
            <h1
              className="text-8xl font-semibold mx-2.5 nunito text-gray-600"
              key={e.id}
            >
              {e.item} 
            </h1>
          );
        })}
      </Marquee>

      <section className="w-full space-y-2.5 ">
        <h1 className="text-center text-2xl nunito font-semibold text-gray-500">
          Login now and know more
        </h1>
        <div className="w-full flex justify-center items-center gap-5 pb-8">
          <Link
            to="/know-more-info"
            className="btn bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Know more
          </Link>
          {isAuthenticated ? (
            <Link
              to="/bookdemoclass"
              className="btn btn-info btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl text-white"
            >
              Book a demo class
            </Link>
            ) : ( 
              <> 
            
<NotLoginPopUp/>



            </> 
           )}
        </div>
      </section>
    </>
    // </div>
  );
};

export default Slider;
