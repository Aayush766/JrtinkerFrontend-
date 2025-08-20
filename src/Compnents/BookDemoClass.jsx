import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar, Clock, User, Mail, Phone, ChevronLeft } from "lucide-react";
import "./BookDemoClass.css";
import Loading from "./Loading";

const ClassBooking = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({});
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNumber: "",
  });

  const times = ["10:00AM", "11:00AM", "12:00PM", "2:00PM", "3:00PM"];

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        "https://jrtinker01.onrender.com/admin/course-dashboard/single-course",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId: id }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        setCourseData(result.course);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course details.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const bookingDetails = {
  //     courseName: courseData.courseName,
  //     date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
  //     time: selectedTime,
  //     ...formData,
  //   };

  //   if (bookingDetails) {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("https://jrtinker01.onrender.com/slot-booking", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({ bookingDetails }),
  //       });

  //       if (response.ok) {
  //         toast.success("Your slot has been booked!");
  //         navigate(`/courses/${id}/book-demo-class/book-demo-class-slot-booked-page`, {
  //           state: bookingDetails,
  //         });
  //       } else {
  //         toast.error("Something went wrong");
  //       }
  //     } catch (error) {
  //       console.error("Slot booking error:", error);
  //       toast.error("Slot booking error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      courseName: courseData.courseName,
      date: selectedDate,
      time: selectedTime,
      userName: formData.userName,
      email: formData.email,
      contactNumber: formData.contactNumber,
    };

    if (
      payload.date &&
      payload.time &&
      payload.userName &&
      payload.email &&
      payload.contactNumber
    ) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jrtinker01.onrender.com/create-slot-booking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
          }
        );

        console.log("response is: ", response);

        if (response.ok) {
          toast.success("Your slot has been booked!");
          navigate(
            `/courses/${id}/bookdemoclass/book-demo-class-slot-booked-page`,
            {
              state: payload,
            }
          );
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Slot booking error:", error);
        toast.error("Slot booking error");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill all required fields.");
    }
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1)

  const disabledDateFromToday = new Date(tomorrow)
  // console.log("date: ",disabledDateFromToday)
  return (
    <section
      className="min-h-screen w-full py-16 px-4 md:px-6 lg:px-8 pt-24 md:pt-64   bg-gradient-to-b from-gray-900 to-gray-800 book-demo-class "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${courseData.courseImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-left">
            Book Your Demo Class
          </h1>
          <p className="text-gray-300 mb-8 text-left">
            Take the first step towards mastering <span className="text-xl text-yellow-400">{courseData.courseName}</span> 
          </p>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 flex flex-col items-center"
                >
                  <div className="relative w-full max-w-md mx-auto">
                    <label className=" text-sm font-medium flex items-center justify-center text-gray-300 mb-2 text-center">
                      <Calendar className="inline-block w-5 h-5 mr-2" />
                      Select Date
                    </label>
                    <div className="flex justify-center ">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: disabledDateFromToday }}
                        
                        className="bg-white/25 rounded-xl p-4"
                        classNames={{
                          day_selected: "bg-blue-500 text-white rounded-full",
                          day_today: "text-yellow-400 font-bold bg-yellow-200",
                          day_disabled:
                            "text-gray-400 opacity-50 cursor-not-allowed",
                          months: "flex justify-center",
                        }}
                      />
                    </div>
                  </div>
                  <motion.button
                    className={`w-full max-w-md py-4 rounded-xl text-white font-medium transition-all ${
                      selectedDate
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                    onClick={() => selectedDate && setStep(2)}
                    disabled={!selectedDate}
                    whileHover={{ scale: selectedDate ? 1.02 : 1 }}
                  >
                    Continue to Time Selection
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      <Clock className="inline-block w-5 h-5 mr-2" />
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {times.map((time) => (
                        <motion.button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-4 rounded-xl text-center transition-all ${
                            selectedTime === time
                              ? "bg-blue-600 text-white"
                              : "bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between gap-4">
                    <motion.button
                      onClick={() => setStep(1)}
                      className="flex items-center px-6 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Back
                    </motion.button>
                    <motion.button
                      onClick={() => selectedTime && setStep(3)}
                      disabled={!selectedTime}
                      className={`flex-1 py-3 rounded-xl text-white font-medium ${
                        selectedTime
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-600 cursor-not-allowed"
                      }`}
                      whileHover={{ scale: selectedTime ? 1.02 : 1 }}
                    >
                      Continue to Details
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="inline-block w-5 h-5 mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="userName"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.userName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="inline-block w-5 h-5 mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="inline-block w-5 h-5 mr-2" />
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        required
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-between gap-4 mt-8">
                      <motion.button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex items-center px-6 py-3 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10"
                        whileHover={{ scale: 1.02 }}
                      >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 py-3 rounded-xl text-white font-medium ${
                          loading
                            ? "bg-green-600 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                      >
                        {loading ? (
                          <Loading/>
                        ) : (
                          "Confirm Booking"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClassBooking;
