import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "../Context/LanguageContext";

const SchoolContactForm = () => {
const {t} = useLanguage()


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    designation: "",
    city: "",
    schoolName: "",
    preferredDate: "",
    preferredTime: "", 
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://jrtinker01.onrender.com/school/add-school-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          designation: "",
          city: "",
          schoolName: "",
          preferredDate: "",
          preferredTime: "",
          requirements: "",
        });
      } else {
        toast.error("Please try again later.");
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-16" id="school-contact-form">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 leading-tight">
          {t.forschoolspage.schoolform.mainheading}
        </h2>
        <p className="text-lg md:text-xl mt-2 text-gray-600">
          {t.forschoolspage.schoolform.subheading}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-7xl mx-auto">
        <img
          src="/images/school-img-1.webp"
          alt="Contact illustration"
          className="w-full max-w-md lg:max-w-xl object-cover rounded-xl shadow-md"
          loading="lazy"
        />

        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#27548A] text-white rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: t.forschoolspage.schoolform.name, name: "name", placeholder: t.forschoolspage.schoolform.placeholdername },
              { label: t.forschoolspage.schoolform.email, name: "email", type: "email", placeholder: t.forschoolspage.schoolform.placeholderemail },
              { label: t.forschoolspage.schoolform.phonenumber, name: "contactNumber", type: "tel", placeholder: t.forschoolspage.schoolform.placeholderphonenunber },
              { label: t.forschoolspage.schoolform.designation, name: "designation", placeholder: t.forschoolspage.schoolform.placeholderdesignation },
              { label: t.forschoolspage.schoolform.city, name: "city", placeholder: t.forschoolspage.schoolform.placeholdercity },
              { label: t.forschoolspage.schoolform.schoolname, name: "schoolName", placeholder: t.forschoolspage.schoolform.placeholderschoolname },
            ].map(({ label, name, type = "text", placeholder }) => (
              <div key={name}>
                <label className="block font-medium mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-pink-300 focus:outline-none"
                />
              </div>
            ))}

            <div>
              <label className="block font-medium mb-2">{t.forschoolspage.schoolform.date}</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-pink-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">{t.forschoolspage.schoolform.time}</label>
              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-pink-300 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium mb-2">{t.forschoolspage.schoolform.requirements}</label>
            <textarea
              name="requirements"
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              placeholder={t.forschoolspage.schoolform.placeholderrequirements}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-pink-300 focus:outline-none"
            ></textarea>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="px-10 py-3 bg-pink-500 hover:bg-pink-600 rounded-full font-semibold text-white shadow-lg transition-all duration-300"
            >
              {t.forschoolspage.schoolform.submitbtn}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SchoolContactForm;
