import React from 'react';

const UserEkologiya = () => {
  return (
    <div className="mt-[25rem] bg-[#A7C7C7] pl-[4rem] py-[2rem] shadow-lg flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1 text-black">
        <h1 className="text-lg font-bold mb-2">
          O‘zSuvQurilish bilan Barqaror Kelajakni Quramiz:
          <br /> Zamonaviy va Ekologik Toza Suv Tizimlarini Barpo Etamiz
        </h1>
        <hr className="my-4 border-black w-2/3" />
        <p className="text-lg max-w-lg">
          O‘zSuvQurilish texnologiyasi jadal rivojlanib, dunyo bo‘ylab 100 million kvadrat metrdan ortiq ekologik barqaror suv ta’minoti infratuzilmasini qamrab olmoqda
          va dekarbonizatsiya jarayoniga o‘z ta’sirini ko‘rsatmoqda. O‘zSuvQurilish bilan siz ham barqaror suv ta’minoti qurilishining bir qismi bo‘lishni xohlaysizmi?
        </p>
        <button className="mt-4 px-4 py-2  text-white font-semibold shadow bg-gradient-to-r from-[#2CF8A2] to-[#2CA2DB]">
          O‘zsuvQurilishga qo‘shiling
        </button>
      </div>
      <div className="flex-1 flex justify-end">
        <img src="/ekologiya.png" alt="Ekologiya" className="w-full md:w-auto" />
      </div>
    </div>
  );
};

export default UserEkologiya;
