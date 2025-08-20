
import { SectionHeader } from './SectionHeader';
import { LabStats } from './LabStats';
import { CTA } from './CTA';
// import { labInfo } from '../data/labInfo';

import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../Context/LanguageContext';

export const KnowMoreSection = () => {
   const {t} = useLanguage()

   const stats= [
      {
        value: '156',
        suffix: '+',
        label: t.knowmore.stats[0].label,
      },
      {
        value: '568', 
        suffix: '+',
        label:t.knowmore.stats[1].label
      },
      {
        value: '40',
        suffix: '+',
        label: t.knowmore.stats[2].label
      },
      {
        value: '6',
        suffix: '+',
        label: t.knowmore.stats[3].label
      },
    ]

  const researchAreas= [
    
      {
        title: t.knowmore.researchAreas[0].title,
        description:  t.knowmore.researchAreas[0].description,
        imageUrl: '/images/feature-4.jpg',
        
      },
      {
        title:  t.knowmore.researchAreas[1].title,
        description: t.knowmore.researchAreas[1].description,
        imageUrl: '/images/feature-5.jpg',
      
      },
      {
        title:  t.knowmore.researchAreas[2].title,
        description: t.knowmore.researchAreas[2].description,
        imageUrl: '/images/feature-1.jpg',
    
      },
      {
        title:  t.knowmore.researchAreas[3].title,
        description:  t.knowmore.researchAreas[3].description,
        imageUrl: '/images/feature-2.jpg',
       
      },
    ]
  return (
    <>
    <Helmet>
      <title>Know more</title>
    </Helmet>
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 md:pt-56 pt-24">
      <SectionHeader 
        title={t.knowmore.mainheading}
        subtitle={t.knowmore.subheading}
      />
      

      <img src="/images/iitk-workshop.webp" alt="IIT Kanpur Workshop" className='w-full h-auto object-cover mt-9'/>
    

      <LabStats stats={stats} />
      
      <div className="mt-20">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8">{t.knowmore.featurearea}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {researchAreas.map((area, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: `url(${area.imageUrl})` }}
              />
              <div className="p-6">
                <h4 className="text-xl font-medium text-gray-800 mb-2">{area.title}</h4>
                <p className="text-gray-600 mb-4 nunito" >{area.description}</p>
              
              </div>
            </div>
          ))}
        </div>
      </div>

     

      <CTA />
    </div>
    </>
  );
};