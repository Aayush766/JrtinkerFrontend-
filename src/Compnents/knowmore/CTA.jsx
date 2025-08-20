
import { Link } from 'react-router-dom';
import { useLanguage } from '../../Context/LanguageContext';

export const CTA = () => {
  const {t} = useLanguage()
  return (
    <div className="mt-24 bg-gray-900 rounded-2xl overflow-hidden">
      <div className="px-8 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 md:mr-12">
          <h3 className="text-3xl font-bold text-white mb-4">{t.knowmore.mainheadingtwo}</h3>
          <p className="text-gray-300 text-lg max-w-xl">
           {t.knowmore.subheadingtwo}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/courses" className="px-8 py-4 bg-teal-500 text-white font-medium rounded-lg shadow-lg hover:bg-teal-600 transition-colors">
           {t.knowmore.bookclass}
          </Link>
          <Link to="/contact-us" className="px-8 py-4 bg-transparent border-2 border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors">
            {t.knowmore.contactus}
          </Link>
        </div>
      </div>
    </div>
  );
};