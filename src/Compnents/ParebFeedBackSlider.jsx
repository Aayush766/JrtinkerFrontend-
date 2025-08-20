// ParebFeedBackSlider.jsx
import React from "react";

const ParebFeedBackSlider = ({ name, title, message, avatar }) => {
  console.log(name,title,avatar,props)
  return (
    <div className="relative w-full max-w-[500px]">
      <img
        src="/images/background/bg-slider-fb.png"
        alt="Feedback Background"
        className="object-cover w-full"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <div className="flex items-center gap-4 mb-6">
          <img src={avatar} alt="Parent Photo" className="w-14 h-14 rounded-full" />
          <div>
            <p className="font-medium salsa">{name}</p>
            <p className="text-purple-600">{title}</p>
          </div>
        </div> 
        <p className="text-center text-[1.3rem] font-medium text-gray-600 fredoka salsa">
          "{message}"
        </p>
      </div>
    </div>
  );
};

export default ParebFeedBackSlider;
