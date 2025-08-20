import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

const FooterContact= () => {
  const {t} = useLanguage()
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3 group">
        <MapPin className="h-5 w-5 text-[#3b82f6] mt-1 flex-shrink-0 group-hover:text-[#60a5fa] transition-colors duration-300" />
        <p className="text-gray-300 group-hover:text-white transition-colors duration-300 salsa">{t.footer.address}</p>
      </div>
      
      <div className="flex items-center space-x-3 group">
        <Mail className="h-5 w-5 text-[#3b82f6] flex-shrink-0 group-hover:text-[#60a5fa] transition-colors duration-300" />
        <a 
          href="mailto:contact@jrtinker.com" 
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          contact@jrtinker.com
        </a>
      </div>
      
      <div className="flex items-center space-x-3 group">
        <Phone className="h-5 w-5 text-[#3b82f6] flex-shrink-0 group-hover:text-[#60a5fa] transition-colors duration-300" />
        <a 
          href="tel:+919990054003" 
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          +91 9990-80-2009
        </a>
      </div>
    </div>
  );
};

export default FooterContact;