import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useCourses } from '../../Context/CourseProvider';
import { Link } from 'react-router-dom';



const FooterPrograms= () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const {courses} = useCourses()
  
  const programs = [
    { id: 1, name: "STEM Learning" },
    { id: 2, name: "Robotics Fundamentals" },
    { id: 3, name: "Advance Robotics" },
    { id: 4, name: "Visual Block coding for Beginners" },
    { id: 5, name: "Python for Beginners" },
    { id: 6, name: "Advance Python" },
    { id: 7, name: "Internet of Things" },
    { id: 8, name: "Financial Literacy & Entrepreneurship" },
    { id: 9, name: "Digital Literacy" },
    { id: 10, name: "3D Modeling & Printing" },
    { id: 11, name: "Drone & Aviation Fundamentals" },
    { id: 12, name: "Arduino Masters" },
    { id: 13, name: "Begin with Raspberry Pi" }
  ];
  
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
        Our Programs
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
        {courses.map(program => (
          <div 
            key={program._id}
            className="group"
            onMouseEnter={() => setHoveredItem(program._id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link to={`/courses/${program._id}`}
              href="#" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <ChevronRight 
                className={`h-4 w-4 transform transition-transform duration-300 ${
                  hoveredItem === program._id ? 'translate-x-1 text-[#3b82f6]' : ''
                }`} 
              />
              <span>{program.courseName}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterPrograms;