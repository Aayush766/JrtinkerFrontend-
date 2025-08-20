import { useState } from "react";
import { motion } from "framer-motion";
import BookFreeDemo from "../BookFreeDemo";
import Feature from "./Feature";
import GradeSix from "./GradeSix";
import GradeSeven from "./GradeSeven";
import GradeEight from "./GradeEight";
import GradeNine from "./GradeNine";
import GradeTen from "./GradeTen";
import GradeEleven from "./GradeEleven";
import GradeTwelve from "./GradeTwelve";

const CBSE = () => {
  // const [selectedGrade, setSelectedGrade] = useState("Grade 6");
  // const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
  const [activeTab,setActiveTab] = useState(0)
  const gradeChangeTab=[
    {
      grade:"feature",
      component:Feature
    },
    {
      grade:"Grade 6",
      component:GradeSix
    },
    {
      grade:"Grade 7",
      component:GradeSeven
    },
    {
      grade:"Grade 8",
      component: GradeEight
    },
    {
      grade:"Grade 9",
      component:GradeNine
    },
    {
      grade:"Grade 10",
      component:GradeTen
    },
    {
      grade:"Grade 11",
      component:GradeEleven
    },
    {
      grade:"Grade 12",
      component:GradeTwelve
    }
    
  ]

  const ActiveTabComponent = gradeChangeTab[activeTab].component

  return (
    <>
    <section className="w-full py-20 pt-32 px-16 relative bg-gradient-to-br from-green-300 via-teal-300 to-emerald-300 rounded-b-3xl shadow-inner space-y-6" style={{backgroundImage:"url('/images/bg-cbse.png')"}}>
      
  <div className="w-3/5 space-y-4 mt-20">
    <h2 className="text-5xl font-extrabold text-purple-900">CBSE</h2>
    <h3 className="text-3xl font-semibold text-yellow-900">Personalised CBSE Online Tuitions Tailored for Success</h3>
    <p className="text-lg mulish text-gray-800">
      Tutoroot offers fun and effective online tuition for CBSE students from Grade 6 to 12. Our expert tutors make learning exciting and help boost your academic scores with ease and flexibility!
    </p>
  </div>

  <div className="absolute top-40 right-12 rounded-3xl shadow-2xl">
    <BookFreeDemo />
  </div>

  <div className="w-full flex flex-wrap items-center gap-3 mt-12 ">
    {
      gradeChangeTab.map((elem, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-xl transition-all duration-300 text-md font-semibold border border-teal-600 hover:bg-teal-500 hover:text-white ${activeTab === index ? "bg-teal-600 text-white shadow-lg" : "bg-white text-teal-700"}`}
          onClick={() => setActiveTab(index)}
        >
          {elem.grade}
        </button>
      ))
    }
  </div>
</section>

<section className="w-full bg-yellow-100 py-16 px-16">
  <motion.div
    className="bg-white p-8 rounded-3xl shadow-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <ActiveTabComponent />
  </motion.div>
</section>

    </>
  );
};

export default CBSE;
