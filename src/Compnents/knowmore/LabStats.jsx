import React from 'react';

export const LabStats = ({ stats }) => {
  return (
    <div className="mt-20">
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-2xl overflow-hidden shadow-lg">
        <div className="py-10 px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center">
                <div className="text-4xl md:text-5xl font-bold text-white">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  {stat.value}
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
              </div>
              <div className="mt-2 text-teal-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};