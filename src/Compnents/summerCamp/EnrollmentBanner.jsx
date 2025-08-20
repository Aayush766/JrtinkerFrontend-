const EnrollmentBanner = () => {
    return (
      <div className="w-full flex justify-center my-6 px-4">
        <div className="flex items-center bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white rounded-full px-6 py-3 shadow-xl gap-3 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-[1.02]">
          <span className="text-xl sm:text-2xl">🎯</span>
          <span className="font-bold tracking-wide">Spots Filling Fast!</span>
          <span className="mx-1 text-white/60">|</span>
          <span className="font-medium">
            <span className="font-semibold text-yellow-300">1410+</span> students enrolled in the last 24 hours!
          </span>
        </div>
      </div>
    );
  };
  
  export default EnrollmentBanner;
  