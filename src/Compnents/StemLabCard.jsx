



const getColorClasses = (color) => {
  switch (color) {
    case 'blue':
      return { bg: 'bg-blue-100', text: 'text-blue-600' };
    case 'green':
      return { bg: 'bg-green-100', text: 'text-green-600' };
    case 'purple':
      return { bg: 'bg-purple-100', text: 'text-purple-600' };
    case 'amber':
      return { bg: 'bg-amber-100', text: 'text-amber-600' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' };
  }
};

const FeatureCard = ({ title, description, icon, color }) => {


  const colorClasses = getColorClasses(color);
  
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-100 hover:-translate-y-1">
      <div className={`${colorClasses.bg} ${colorClasses.text} h-14 w-14 flex items-center justify-center rounded-xl mb-5 transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      
      <p className="text-gray-600 leading-relaxed">{description}</p>
      
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 group-hover:border-current group-hover:border-opacity-10" style={{ border:`1px solid ${color}`, boxShadow:`0px 0px 5px 0px ${color}`}}></div>
    </div>
  );
};

export default FeatureCard;