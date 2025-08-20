import React from 'react'

const HeadingSectionOverlay = (props) => {
  return (
    <>
    <img src="/images/background/bg-inner-page2.png" alt="bg-inner" className="w-full relative " />
      {/* Header Section */}
      <div
       
        className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h1
         
          className="text-5xl font-bold text-white mb-6 salsa "
        >
          {props.heading && props.heading}<span className="text-amber-300 salsa"> {props.spanContent && props.spanContent}</span>
        </h1>
        <p
         
          className="mt-4 max-w-2xl mx-auto text-gray-50 text-[1rem] text-center leading-relaxed mulish"
        >
          {props.paragraph && props.paragraph}
        </p>
      </div>
    </>
  )
}

export default HeadingSectionOverlay