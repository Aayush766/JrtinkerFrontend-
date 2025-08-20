import { useState } from "react";
import { motion } from "framer-motion";
import BookFreeDemo from "../BookFreeDemo";
import Feature from "./Feature";
import GradeSix from "../CBSE/GradeSix";
import GradeSeven from "../CBSE/GradeSeven";
import GradeEight from "../CBSE/GradeEight";
import GradeNine from "../CBSE/GradeNine";
import GradeTen from "../CBSE/GradeTen";
import GradeEleven from "../CBSE/GradeEleven";
import GradeTwelve from "../CBSE/GradeTwelve";


const Icse = () => {
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
    <section className="w-full bg-emerald-500 py-20 pt-32 px-16 relative space-y-6">
      <div className="w-3/5 space-y-2 ">
      <h2 className="text-3xl nunito font-bold">ICSE</h2>
      <h3 className="text-2xl nunito font-semibold">Tutoroot's One to One ICSE Online Tuition for Grades 6 to 12</h3>
      <p className="text-lg nunito">When it is ICSE syllabus, trust Tutoroot for personalised online tuitions with added focus on inherent aspects that are specific to ICSE.</p>

      </div>

      <div className="absolute top-28 right-8">
        <BookFreeDemo/>
      </div>

      <div className="w-full flex items-center gap-2.5 mt-12">
        {
          gradeChangeTab.map((elem,index)=>{
            return(
              <button key={index} className={`btn btn-soft btn-md btn-success ${activeTab === index && "bg-teal-600 border-none text-white"}`} onClick={()=>setActiveTab(index)}>{elem.grade}</button>
            )
          })
        }
      </div>

    </section>
    <section className="w-full bg-white py-16 px-16">
      <ActiveTabComponent/>
    </section>
    </>
  );
};

export default Icse;
