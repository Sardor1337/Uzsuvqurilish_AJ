import React from 'react';

const UserBizHaqimizda = () => {
  return (
    <div className="bg-gradient-to-r from-[#2CF8A2] to-[#565CFD] p-10 text-center text-white font-sans">
      <h1 className="text-3xl font-bold mb-8">Butun dunyo bo'ylab barqaror qurilish harakatiga qo'shilamiz.</h1>
      <div className="flex justify-center gap-6 flex-wrap">
        <div className="bg-white/10 rounded-lg p-6 w-40 text-center">
          <span className="text-2xl font-bold block mb-2">4,251,885</span>
          <span className="text-lg">Energy Savings<br />MWh/year</span>
        </div>
        <div className="bg-white/10 rounded-lg p-6 w-40 text-center">
          <span className="text-2xl font-bold block mb-2">122,136,165</span>
          <span className="text-lg">Water Savings<br />m³/year</span>
        </div>
        <div className="bg-white/10 rounded-lg p-6 w-40 text-center">
          <span className="text-2xl font-bold block mb-2">131,316,059</span>
          <span className="text-lg">Embodied Energy In Materials<br />GJ</span>
        </div>
        <div className="bg-white/10 rounded-lg p-6 w-40 text-center">
          <span className="text-2xl font-bold block mb-2">2,344,853</span>
          <span className="text-lg">CO₂ Savings<br />tCO₂/year</span>
        </div>
        <div className="bg-white/10 rounded-lg p-6 w-40 text-center">
          <span className="text-2xl font-bold block mb-2">105,867,153</span>
          <span className="text-lg">Floor Space Certified<br />m²</span>
        </div>
      </div>
    </div>
  );
};

export default UserBizHaqimizda;
