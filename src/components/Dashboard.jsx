import React, { useEffect, useState } from "react";
import { Building, Tractor } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";

const stats = [
  {
    title: "Tashkilotlar soni",
    value: 55,
    color: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    title: "Barcha texnikalar soni",
    value: 1265,
    color: "bg-blue-200",
    textColor: "text-blue-700",
  },
  {
    title: "Ishchilar soni",
    value: 1205,
    color: "bg-purple-200",
    textColor: "text-purple-700",
  },
];

const regions = [
  { name: "Toshkent shahri", color: "bg-[#1BBCB7]", textColor: "text-[#1BBCB7]", cartColor: "fill-[#1BBCB7]" },
  { name: "Andijon", color: "bg-[#1BBCB7]", textColor: "text-[#1BBCB7]", cartColor: "fill-[#1BBCB7]" },
  { name: "Buxoro", color: "bg-[#2B7CC6]", textColor: "text-[#2B7CC6]", cartColor: "fill-[#2B7CC6]" },
  { name: "Farg'ona", color: "bg-[#3264C9]", textColor: "text-[#3264C9]", cartColor: "fill-[#3264C9]" },
  { name: "Jizzax", color: "bg-[#2856C8]", textColor: "text-[#2856C8]", cartColor: "fill-[#2856C8]" },
  { name: "Xorazm", color: "bg-[#2B7CC6]", textColor: "text-[#2B7CC6]", cartColor: "fill-[#2B7CC6]" },
  { name: "Namangan", color: "bg-[#2C2A9A]", textColor: "text-[#2C2A9A]", cartColor: "fill-[#2C2A9A]" },
  { name: "Navoiy", color: "bg-[#9012B1]", textColor: "text-[#9012B1]", cartColor: "fill-[#9012B1]" },
  { name: "Qashqadaryo", color: "bg-[#3AAA59]", textColor: "text-[#3AAA59]", cartColor: "fill-[#3AAA59]" },
  { name: "Samarqand", color: "bg-[#0E3A9F]", textColor: "text-[#0E3A9F]", cartColor: "fill-[#0E3A9F]" },
  { name: "Sirdaryo", color: "bg-[#1D5EDB]", textColor: "text-[#1D5EDB]", cartColor: "fill-[#1D5EDB]" },
  { name: "Surxondaryo", color: "bg-[#071574]", textColor: "text-[#071574]", cartColor: "fill-[#071574]" },
  { name: "Qoraqalpog'iston", color: "bg-[#1E51A4]", textColor: "text-[#1E51A4]", cartColor: "fill-[#1E51A4]" },
  { name: "Toshkent viloyati", color: "bg-[#0E3A9F]", textColor: "text-[#0E3A9F]", cartColor: "fill-[#0E3A9F]" },
];







const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [viloyatlar, setViloyatlar] = useState([]);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const dispatch = useDispatch();

  dispatch(cartActions.addRegions(regions));

  const getViloyatlar = () => {
    fetch(`${API_URL}/api/counts/all/`)
      .then((res) => res.json())
      .then((data) => {
        setViloyatlar(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  const BarchaTashkilotlar = () => {
    fetch(`${API_URL}/api/ALLCOUNTS/`)
      .then((res) => res.json())
      .then((data) => {
        setTashkilotlar(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const navigate = useNavigate();

  useEffect(() => {
    getViloyatlar();
    BarchaTashkilotlar();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Barcha tashkilotlar</h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {tashkilotlar.map((stat, index) => {
          const statsColor = stats[index % stats.length];
          return (
            <div
              key={index}
              className={`p-6 rounded-lg ${statsColor.color} shadow-md flex flex-col justify-start items-start h-32`}
            >
              <p className={`text-lg font-medium mb-2 ${statsColor.textColor}`}>
                {statsColor.title}
              </p>
              <p
                className={`text-4xl font-bold mt-auto ${statsColor.textColor}`}
              >
                {stat}
              </p>
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        Viloyatlardagi tashkilotlar
      </h2>
      <div className="grid grid-cols-4 gap-6 cursor-pointer">
        {viloyatlar.map((region, index) => {
          const regionColor = regions[index % regions.length];
          return (
            <div
              key={index}
              onClick={() =>
                navigate("/viloyatlar", {
                  state: {
                    user: region.viloyat_name,
                    id: region.viloyat_id,
                    color: regionColor.color,
                    textColor: regionColor.textColor,
                  },
                })
              }
              className={`rounded-lg shadow-lg overflow-hidden ${regionColor.color} cursor-pointer hover:opacity-90 transition-transform transform hover:scale-105`}
            >
              <div className={`p-4 font-bold text-lg text-white text-center`}>
                {region.viloyat_name}
              </div>
              <div className="p-4 bg-white">
                <p
                  className={`flex items-center text-lg font-semibold ${regionColor.textColor} mb-1`}
                >
                  <Building className="mr-2" /> Tashkilotlar:{" "}
                  <span className="ml-auto">{region.mchj_count}</span>
                </p>
                <p
                  className={`flex items-center text-lg font-semibold ${regionColor.textColor}`}
                >
                  <Tractor className="mr-2" /> Texnikalar:{" "}
                  <span className="ml-auto">{region.instruments_count}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
