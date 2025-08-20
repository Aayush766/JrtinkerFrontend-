
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, isActive }) => {
 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 10,
      }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl mx-auto"
    >
      <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* Avatar or Initials */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
            }}
            className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0"
          >
           <img src={testimonial.image} alt="parent image" className='w-full h-full object-cover rounded-full object-top' />
          </motion.div>

          {/* Testimonial Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-700  text-base md:text-xl leading-relaxed mb-4"
            >
              “{testimonial.text}”
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center justify-center md:justify-start"
            >
              <div className="h-0.5 w-8 bg-indigo-400 mr-3"></div>
              <span className="font-semibold text-indigo-900 text-base md:text-lg">
                {testimonial.name}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
