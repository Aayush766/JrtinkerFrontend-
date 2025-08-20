import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/Auth.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import CourseProvider from "./Context/CourseProvider.jsx";
import { HelmetProvider } from "react-helmet-async"; // ✅ Import this
import { LanguageProvider } from "./Context/LanguageContext.jsx";
// import { LanguageProvider } from "./Context/LanguageContext.jsx";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <LanguageProvider>
    <BrowserRouter>
      <HelmetProvider>
        {/* <LanguageProvider> */}
        <AuthProvider>
          <CourseProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </CourseProvider>
        </AuthProvider>
        {/* </LanguageProvider> */}
      </HelmetProvider>
    </BrowserRouter>

  </LanguageProvider>
  // </StrictMode>
);
