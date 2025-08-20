
import { useLanguage } from '../../Context/LanguageContext';

const FooterLogo = () => {
    const {t} = useLanguage()
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
      
        <img src="/images/logo-new.png" alt="logo" className="w-[200px]" />
      </div>
      <p className="text-gray-300 leading-relaxed salsa">
        {t.footer.paragraph}
      </p>
    </div>
  );
};

export default FooterLogo;