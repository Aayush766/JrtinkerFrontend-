import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const BookDemoClassSlotBookedPage = () => {
  const location = useLocation();
  const [bookingDetails,setBookingDetails] = useState(location.state || null);
  
  const date = new Date(bookingDetails.date).toDateString()

  return (
    <div className="flex flex-col items-center pt-24 md:pt-64 justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 sm:p-6">
      <motion.div
        className="w-full max-w-xl p-8 bg-white/80 rounded-3xl shadow-2xl border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
<h2 className="text-2xl font-[450] text-center text-gray-800 mb-6">Slot Confirmed with <span className='nunito font-semibold'>{bookingDetails?.userName}</span></h2>
        
        <div className="flex items-center p-5 bg-blue-200 rounded-xl shadow-md gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-lg">
            <Calendar className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-blue-900">{date} | {bookingDetails?.time}</p>
            <p className="text-sm text-gray-700">{bookingDetails?.courseName}</p>
            <p className="text-sm text-gray-600">Asia/Kolkata - IST (+05:30)</p>
          </div>
        </div>
        
        <div className="p-5 mt-5 border border-gray-300 rounded-xl bg-white shadow-md">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Student Details</h3>
          <hr className="mb-3" />
          <div className="space-y-3 text-gray-700">
            <p><strong>Name:</strong> {bookingDetails?.userName}</p>
            <p><strong>Email:</strong> {bookingDetails?.email}</p>
            <p><strong>Contact:</strong> {bookingDetails?.contactNumber}</p>
            <p><strong>Course:</strong> {bookingDetails?.courseName}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {bookingDetails?.time}</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        whileHover={{ x: 5,scale:1.06 }}
        transition={{ duration: 0.5 }}
        className="m-6 flex items-center gap-2 text-blue-700 font-medium hover:text-blue-800 transition-all"
      >
        <Link to="/courses">Book Another Appointment</Link>
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </div>
  );
};

export default BookDemoClassSlotBookedPage;
