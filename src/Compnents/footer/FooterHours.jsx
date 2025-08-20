import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useLanguage } from '../../Context/LanguageContext';

const FooterForm = () => {
  const {t} = useLanguage()
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({ email, description });
    // Optionally send to backend here

    try {

      const response = await fetch("https://jrtinker01.onrender.com/contact-us/form",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,description})
      })
      console.log("response is: ",response)

      if(response.ok){
        const data = await response.json()
        toast.success(data.message)
        setEmail("");
        setDescription("")
      }else{
        toast.error("Sorry form not submitted")
      }
      
    } catch (error) {
      console.log("eror: ",error)
      toast.error("Please try again later")
    }

  };

  return (
    <div className=" bg-opacity-20 rounded-lg p-6 h-full transform transition-transform duration-300 hover:scale-[1.02]">
      <h3 className="text-xl font-semibold mb-4 text-white">
        📬 {t.footer.contactus}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-200 mb-1" htmlFor="email">
             {t.footer.email}
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-3 py-2 rounded-md bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder= {t.footer.emailplaceholder}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-200 mb-1" htmlFor="description">
             {t.footer.description}
          </label>
          <textarea
            id="description"
            rows="4"
            required
            className="w-full px-3 py-2 rounded-md bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder= {t.footer.descriptionplaceholder}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {t.footer.submit}
        </button>
      </form>
    </div>
  );
};

export default FooterForm;
