import React, { useState } from 'react';

export const InfoCard = ({ icon, title, content, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8">
        <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          {icon}
        </div>
        <h3 className="mt-5 text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-3 text-gray-600 leading-relaxed">{content}</p>
        <a 
          href={link}
          className="mt-6 inline-flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors"
        >
          Learn more 
          <svg className={`w-4 h-4 ml-1 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};