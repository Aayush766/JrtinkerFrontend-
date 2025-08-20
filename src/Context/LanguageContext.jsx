import { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en/translation.json";
import ar from "../locales/ar/translation.json";


const LanguageContext = createContext();
 
const translations = {
  en,
  ar
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    setT(translations[language]);
    // document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
