import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div onClick={onClick} className="bg-[#FFB200] shadow-md rounded-xl p-5 transition-all cursor-pointer hover:bg-[#FFA500]">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-white">{question}</h2>
      {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{ opacity: 1, maxHeight: 200 }} // Set an appropriate max height
          exit={{ opacity: 0, maxHeight: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }} // Adjusted duration
          className="mt-3 text-white overflow-hidden"
        >
          {answer}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { question: "What is STEMLab?", answer: "STEMLab is an innovative platform that provides resources for STEM education, offering interactive learning experiences in Science, Technology, Engineering, and Mathematics." },
    { question: "How can I get started with STEMLab?", answer: "You can start by creating an account on our website and exploring our interactive learning modules and hands-on projects." },
    { question: "Does STEMLab offer certifications?", answer: "Yes, STEMLab provides certifications upon the successful completion of various courses and projects." },
    { question: "What kind of projects can I work on?", answer: "STEMLab offers a wide range of projects in robotics, coding, physics simulations, and engineering challenges." },
    { question: "Can teachers use STEMLab for classroom learning?", answer: "Absolutely! Educators can integrate STEMLab's tools and resources into their curriculum to enhance student engagement." },
    { question: "Is STEMLab accessible on mobile devices?", answer: "Yes, STEMLab is mobile-friendly, allowing users to access content on various devices." },
    { question: "Does STEMLab have a community for collaboration?", answer: "Yes! STEMLab has an active community where learners and educators can collaborate, share projects, and discuss STEM-related topics." },
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-8 bg-white  shadow-lg text-black">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="md:w-1/3">
          <div className="flex items-center gap-4">
            <img src="https://storage.googleapis.com/a1aa/image/mIEM1kgQdAnWA7FWFyCNq-1di4ke_qsEceodArPBnJg.jpg" alt="STEMLab Logo" className="w-14 h-14 rounded-full shadow-lg" />
            <h1 className="text-4xl font-bold text-black">FAQs</h1>
          </div>
          <div className="flex items-center gap-2 mt-4 text-gray-700">
            <MessageCircle />
            <span>Still need help? Chat with us.</span>
          </div>
        </div>
        <div className="md:w-2/3 space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
