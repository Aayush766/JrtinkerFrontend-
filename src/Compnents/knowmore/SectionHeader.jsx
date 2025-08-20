
export const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-6">
        <Beaker className="w-8 h-8 text-teal-600" />
      </div> */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h2>
      <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
      {/* <div className="mt-8 w-24 h-1 bg-teal-500 mx-auto rounded-full"></div> */}
    </div>
  );
};