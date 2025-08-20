import React from 'react';
import FooterLogo from './FooterLogo';
import FooterContact from './FooterContact';
// import FooterHours from './FooterHours';
import FooterPrograms from './FooterPrograms';
import FooterBottomBar from './FooterBottomBar';
import FooterForm from './FooterHours';

 
const Footer = () => {
  
  return (
    <footer className="bg-[#1e3a8a] text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-6">
            <FooterLogo />
            <FooterContact />
          </div>
          
          <div className="md:col-span-1">
            <FooterForm />
          </div>
          
          <div className="md:col-span-1 lg:col-span-2">
            <FooterPrograms />
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-700">
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
};

export default Footer;