import { useState } from "react";
import { Star, Calendar, Users, Award, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ChooseCamp = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  // Removed showEnrollForm state as we are navigating to a new page
  const navigate = useNavigate(); // Initialize useNavigate hook

  const curriculumData = {
    "Junior Camp": [
      {
        session: "Session 1",
        topic: "STEM with Home Utilities (Balloon car project)",
        activities: "Exploring simple machines using spoons, clips, straws, etc. Design balloon-powered cars using waste bottles",
        outcome: "Learn basic physics concepts, creativity, and problem-solving"
      },
      {
        session: "Session 2",
        topic: "Paper Circuit",
        activities: "Create a light-up greeting card using copper tape & LED",
        outcome: "Understand basic electronics and current flow"
      },
      {
        session: "Session 3",
        topic: "Scribble Bot",
        activities: "Build a DIY scribble bot using motors, battery, and cups",
        outcome: "Learn about circuits and vibration motors"
      },
      {
        session: "Session 4",
        topic: "Block Coding Basics",
        activities: "Animate characters using Pictoblox",
        outcome: "Learn sequencing, logic, and creative storytelling"
      },
      {
        session: "Session 5",
        topic: "Game Design Using Pictoblox",
        activities: "Create a basic click-based game",
        outcome: "Understand variables, loops, conditions in coding"
      },
      {
        session: "Session 6",
        topic: "Intro to App Development",
        activities: "Explore basic UI using MIT App Inventor (drag-and-drop blocks)",
        outcome: "Learn layout, logic, and design thinking"
      },
      {
        session: "Session 7",
        topic: "Make a translation App",
        activities: "Use of simple functions of MIT App inventor to make a basic app",
        outcome: "Learn layout, Algorithm and Functions"
      },
      {
        session: "Session 8",
        topic: "AI with Block Coding (Teachable Machine)",
        activities: "Identify sounds or objects using pre-trained models in Pictoblox",
        outcome: "Understand AI concepts like datasets and classification"
      },
      {
        session: "Session 9",
        topic: "ML Activity Using Pictoblox or Pictoblox Extensions",
        activities: "Use Pictoblox extensions to classify pictures or moods",
        outcome: "Introduction to machine learning through visual coding"
      },
      {
        session: "Session 10",
        topic: "Final Showcase & Certificate Day",
        activities: "Students present their best project to peers and parents",
        outcome: "Boost confidence, presentation skills, and peer learning"
      }
    ],
    "Senior Camp": [
      {
        session: "Session 1",
        topic: "STEM with Home Utilities (Balloon car project)",
        activities: "Intro to STEM & Robotics. Improve designs for speed and distance",
        outcome: "Learn basic physics concepts, creativity, and problem-solving. Understand Newton's laws and propulsion"
      },
      {
        session: "Session 2",
        topic: "Paper Circuit",
        activities: "Design a paper circuit for traffic light",
        outcome: "Understand basic electronics and current flow"
      },
      {
        session: "Session 3",
        topic: "Scribble Bot",
        activities: "Build a DIY scribble bot using motors, battery, and cups",
        outcome: "Learn about circuits and vibration motors"
      },
      {
        session: "Session 4",
        topic: "Block Coding Basics",
        activities: "Design a short story or scene using Pictoblox",
        outcome: "Learn sequencing, logic, and creative storytelling"
      },
      {
        session: "Session 5",
        topic: "Game Design Using Pictoblox",
        activities: "Design a platformer or point system-based game",
        outcome: "Understand variables, loops, conditions in coding"
      },
      {
        session: "Session 6",
        topic: "Intro to App Development",
        activities: "Explore basic UI using MIT App Inventor (drag-and-drop blocks)",
        outcome: "Learn layout, logic, and design thinking"
      },
      {
        session: "Session 7",
        topic: "Make a translation App",
        activities: "Make a translation App",
        outcome: "Learn layout, Algorithm and Functions"
      },
      {
        session: "Session 8",
        topic: "AI with Block Coding (Teachable Machine)",
        activities: "Train an AI model to detect emotions or gestures",
        outcome: "Understand AI concepts like datasets and classification"
      },
      {
        session: "Session 9",
        topic: "ML Activity Using Pictoblox or Pictoblox Extensions",
        activities: "Create ML-powered games or quizzes with feedback",
        outcome: "Introduction to machine learning through visual coding"
      },
      {
        session: "Session 10",
        topic: "Final Showcase & Certificate Day",
        activities: "Students explain project logic and features",
        outcome: "Boost confidence, presentation skills, and peer learning"
      }
    ]
  };

  const camps = [
    {
      title: "Junior Camp",
      grades: "Grade 2 to 5",
      duration: "Batches from July to August",
      image: "images/summerCamp/juniorGrade.jpg",
      bgColor: "from-pink-500 via-rose-400 to-pink-600",
      accentColor: "from-pink-600 to-rose-500",
      price: "₹9,999",
      oldPrice: "₹19,999",
      discount: "50% OFF",
      sessions: ["1 July - 20th July", "21st July - 10 Aug"],
      features: ["Interactive Learning", "Fun Activities", "Certified Teachers"],
    },
    {
      title: "Senior Camp",
      grades: "Grade 6 to 10",
      duration: "Batches from July to August",
      image: "images/summerCamp/seniorGrade.jpg",
      bgColor: "from-indigo-500 via-blue-500 to-indigo-700",
      accentColor: "from-indigo-600 to-blue-500",
      price: "₹9,999",
      oldPrice: "₹19,999",
      discount: "50% OFF",
      sessions: ["1 July - 20th July", "21st July - 10 Aug"],
      features: ["Advanced Concepts", "Project Based", "Industry Experts"],
    },
  ];

  const openModal = (campTitle) => {
    setSelectedCamp(campTitle);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCamp(null);
  };

  const handleEnrollClick = (campTitle) => {
    // Navigate to the EnrollForm page, passing the selected camp title in the state
    navigate('/enroll', { state: { selectedCamp: campTitle } });
    setShowModal(false); // Close the curriculum modal if it's open
  };

  const handleMoreCoursesClick = () => {
    // Navigate to your 'More Courses' page
    navigate('/courses'); // Replace '/more-courses' with the actual path to your page
  };

  return (
    <>
      <section className="w-full py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200/10 to-pink-200/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20 px-4">
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6 leading-tight">
              Choose Your
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Adventure
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Embark on an extraordinary learning journey designed to spark creativity,
              build confidence, and create lasting memories this summer.
            </p>
          </div>

          {/* Camp Cards Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
            {camps.map((camp, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group cursor-pointer transition-all duration-700 ${
                  hoveredCard === index ? 'scale-105 -translate-y-2' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Main Card */}
                <div className={`relative bg-gradient-to-br ${camp.bgColor} rounded-3xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-700`}>

                  {/* Discount Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      {camp.discount}
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredCard === index ? 'scale-110 brightness-110' : 'scale-100 brightness-95'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Floating Price */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-2xl font-black text-gray-800">{camp.price}</span>
                          <span className="text-sm text-red-500 line-through ml-2">{camp.oldPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 text-white relative">
                    {/* Title and Details */}
                    <div className="mb-6">
                      <h3 className="text-4xl font-black mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300">
                        {camp.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/90 mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{camp.grades}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm italic">{camp.duration}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        What's Included
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {camp.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sessions */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold mb-4">Available Sessions</h4>
                      {camp.sessions.map((session, i) => (
                        <div
                          key={i}
                          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 group/session"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-white">{session}</p>
                              <p className="text-sm text-white/70">Limited seats available</p>
                            </div>
                            <button
                              onClick={() => handleEnrollClick(camp.title)} // Navigate to EnrollForm page
                              className={`bg-gradient-to-r ${camp.accentColor} hover:shadow-lg text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 group-hover/session:scale-105`}
                            >
                              Enroll Now
                              <ArrowRight className="w-4 h-4 group-hover/session:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <button
                        onClick={() => openModal(camp.title)}
                        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/cta"
                      >
                        <span className="text-lg">View Complete Details</span>
                        <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${camp.bgColor} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-10 scale-110`}></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-md border border-white/40 rounded-full px-8 py-4 shadow-xl">
              <span className="text-gray-700 font-semibold">Ready for more?</span>
              <button
                onClick={handleMoreCoursesClick} // This will navigate to '/more-courses'
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Our More Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Curriculum Details - This remains a modal */}
      {showModal && selectedCamp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold">{selectedCamp} Curriculum</h3>
                <p className="text-purple-100">Complete session-by-session breakdown</p>
              </div>
              <button
                onClick={closeModal}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-bold text-purple-700">Session</th>
                      <th className="border border-gray-300 p-3 text-left font-bold  text-purple-700">Topic</th>
                      <th className="border border-gray-300 p-3 text-left font-bold  text-purple-700">Activities</th>
                      <th className="border border-gray-300 p-3 text-left font-bold  text-purple-700">Learning Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {curriculumData[selectedCamp]?.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 p-3 font-semibold text-purple-600">
                          {item.session}
                        </td>
                        <td className="border border-gray-300 p-3 font-medium text-black">
                          {item.topic}
                        </td>
                        <td className="border border-gray-300 p-3 text-sm text-black">
                          {item.activities}
                        </td>
                        <td className="border border-gray-300 p-3 text-sm text-black ">
                          {item.outcome}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleEnrollClick(selectedCamp)} // Navigate to EnrollForm page
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  Enroll in {selectedCamp}
                </button>
                <button
                  onClick={closeModal}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Removed Enroll Form Modal: It's now a separate page */}
    </>
  );
};

export default ChooseCamp;