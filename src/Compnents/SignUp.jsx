import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../Context/LanguageContext";
import { useAuth } from "../Context/Auth";
import Loading from "./Loading";

const SignUp = () => {
  const {t} = useLanguage()
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login,loginWithGoogle } = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://jrtinker01.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, contactNumber }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful!");
        setUserName("");
        setEmail("");
        setPassword("");
        setContactNumber("");
        navigate("/login");
      } else {
        toast.error(`Signup failed: ${data.message}`);
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err.message}`);
    }
    setLoading(false);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    // implement Google signup flow
  };

  const handleLoginWithGoogleSubmit = (e) => {
    e.preventDefault();
    loginWithGoogle();
  }; 

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>

      <section className="relative flex pt-28 bg-none  md:pt-64 items-center justify-center w-full min-h-screen lg:bg-gradient-to-br from-indigo-50 via-white to-pink-50 overflow-hidden">
        {/* Soft glow background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 to-yellow-100/30 blur-2xl"></div>

        <div className="relative w-full max-w-lg p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
             {t.signuppage.mainheading}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
             {t.signuppage.subheading}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {t.signuppage.form.username}
              </label>
              <input
                type="text"
                required
                minLength="3"
                maxLength="30"
                placeholder={t.signuppage.form.usernameplaceholder}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {t.signuppage.form.email}
              </label>
              <input
                type="email"
                required
                placeholder={t.signuppage.form.emailplaceholder}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {t.signuppage.form.password}
              </label>
              <input
                type="password"
                required
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="8+ chars, including uppercase, lowercase & number"
                placeholder={t.signuppage.form.passwordplaceholder}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
               {t.signuppage.form.contactnumber}
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder={t.signuppage.form.contactplaceholder}
                maxLength="10"
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Submit */} 
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition shadow-lg flex justify-center items-center"
            >
              {loading ? (
                <Loading/>
              ) : ( t.signuppage.form.signbtn
              )}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">{t.signuppage.or}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
 
          {/* Social & Login */}
          <div className="space-y-3">
            <button
               onClick={handleLoginWithGoogleSubmit}
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            >
              <FcGoogle size={20} />
              <span className="text-gray-700 font-medium">
               {t.signuppage.google}
              </span>
            </button>
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-gray-700 font-medium"
            >
              <LogIn size={20} />
              {t.signuppage.alreadyaccount}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
