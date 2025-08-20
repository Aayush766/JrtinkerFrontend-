import React from "react";

const courses = [
  {
    tag: "Basic Starter",
    title: "RoboXplore",
    oldPrice: "\u20B997.91K",
    newPrice: "\u20B989.01K",
    sessions: 45,
    modules: [
      "Robotics Foundation",
      "Fundamentals of AI & ML",
      "AI & ML for Robots",
    ],
    certificateTitles: ["Emerging Innovator Leader"],
    bg: "bg-white",
    text: "text-black",
  },
  {
    tag: "Top Seller",
    title: "RoboXpert",
    oldPrice: "\u20B9180.58K",
    newPrice: "\u20B9164.16K",
    sessions: 90,
    modules: [
      "Functional Robotics",
      "Physical Computing",
      "Interactive Mechatronics",
    ],
    certificateTitles: ["Emerging Innovator Leader", "Young Mechatronics Master"],
    bg: "bg-cyan-700",
    text: "text-white",
  },
  {
    tag: "Best Value",
    title: "RoboPremier",
    oldPrice: "\u20B9300.96K",
    newPrice: "\u20B9273.60K",
    sessions: 150,
    modules: ["Internet of Things", "Sensory Systems", "Home Automation"],
    certificateTitles: [
      "Emerging Innovator Leader",
      "Young Mechatronics Master",
      "Junior IoT Engineer",
      "Exceeding Robotics Expert",
    ],
    bg: "bg-white",
    text: "text-black",
  },
];

const CourseCard = ({ course }) => {
  return (
    <div
      className={`w-full max-w-sm p-6 rounded-3xl shadow-xl ${course.bg} ${course.text} flex flex-col justify-between`}
    >
      <div>
        <p className="text-sm font-semibold mb-2">{course.tag}</p>
        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
        <p className="line-through text-gray-400 text-sm">{course.oldPrice}</p>
        <p className="text-2xl font-bold mb-4">{course.newPrice}</p>
        <p className="font-medium mb-2">
          <span className="font-bold">{course.sessions}</span> Live Sessions are conducted in this course
        </p>
        <div className="mb-4">
          <p className="font-semibold mb-1">Modules in this course</p>
          <ul className="list-disc list-inside space-y-1">
            {course.modules.map((mod, idx) => (
              <li key={idx} className="font-bold text-white">
                {mod}
              </li>
            ))}
          </ul>
        </div>
        {/* <p className="text-sm font-medium mb-2">
          {course.certificateTitles.join(" | ")}
        </p> */}
        <img
          src="https://marketplace.canva.com/EAF7h2vFXaU/2/0/1600w/canva-blue-and-gold-elegant-curved-certificate-of-achievement-certificate-HTxQpZIhLas.jpg"
          alt="Certificate"
          className="rounded-xl w-full mb-4"
        />
      </div>
      <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
        Book my demo trial class
      </button>
    </div>
  );
};

const PricingSection = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4 sm:px-6 lg:px-16"
      style={{ backgroundImage: `url('/your-background-image.jpg')` }}
    >
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
