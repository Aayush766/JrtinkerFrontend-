import { useRef } from "react";
import "./Projects.css";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Projects = () => {
  return (
    <>
      <Helmet>
        <title> Projects </title>
      </Helmet>

         <section className="w-full ">
      <img src="/images/coming-soon.jpg" alt="coming soon" className="w-full h-auto object-cover object-top" />
    </section>
    </>
  );
};

export default Projects;
