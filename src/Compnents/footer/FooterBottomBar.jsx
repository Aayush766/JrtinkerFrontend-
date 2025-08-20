import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

const FooterBottomBar = () => {
  // const currentYear = new Date().getFullYear();
  const {t} = useLanguage()
  const socialLinks = [
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/profile.php?id=61576350248516", label: "Facebook" },
    // { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/jrtinker_stem", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/jr-tinker", label: "LinkedIn" },
    // { icon: <Youtube size={18} />, href: "#", label: "YouTube" }
  ];
  
  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Contact", href: "#" }
  ];
  
  return (
    <div className="flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
      <div className="text-center md:text-left text-gray-300 text-sm lg:text-xl">
        © 2025 <span className="font-semibold text-red-400">JRtinker</span>. {t.footer.allrightsreserve} 
      </div>
      
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              aria-label={link.label}
              target='_blank'
              className="bg-red-400 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              {link.icon}
            </a>
          ))}
        </div>
        
      
      </div>
    </div>
  );
};

export default FooterBottomBar;