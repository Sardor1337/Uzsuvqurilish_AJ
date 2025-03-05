import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Users, Truck } from "lucide-react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";
import Sidebar from "./layout/SideBar";

const stats = [
  {
    title: "Tashkilotlar soni",
    value: 4,
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-700",
  },
  {
    title: "Barcha texnikalar soni",
    value: 135,
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  {
    title: "Ishchilar soni",
    value: 205,
    bgColor: "bg-purple-200",
    textColor: "text-purple-700",
  },
];

const Card = ({
  mchj_name,
  instruments_count,
  xodimlar_count,
  ViloyatColor,
  onClick,
  ViloyatTextColor,
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl overflow-hidden shadow-md border border-gray-200 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div
        className={` text-white text-center py-2 font-semibold ${ViloyatColor}`}
      >
        {mchj_name}
      </div>
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <div className={`flex items-center gap-2 ${ViloyatTextColor}`}>
            <Users size={16} />
            <span className="text-sm">Ishchilar</span>
          </div>
          <span className={`text-sm font-medium ${ViloyatTextColor}`}>
            {xodimlar_count}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className={`flex items-center gap-2 ${ViloyatTextColor}`}>
            <Truck size={16} />
            <span className="text-sm">Texnikalar</span>
          </div>
          <span className={`text-sm font-medium ${ViloyatTextColor}`}>
            {instruments_count}
          </span>
        </div>
      </div>
    </div>
  );
};

const Viloyatlar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viloyatNomi = location.state?.user || "Nomalum viloyati";
  const ViloyatId = location.state?.id;
  const ViloyatColor = location.state?.color;
  const ViloyatTextColor = location.state?.textColor;

  const API_URL = import.meta.env.VITE_API_URL;
  const [viloyatMchj, setViloyatMchj] = useState([]);
  const [viloyatStats, setViloyatStats] = useState([]);

  const getViloyatStats = (id) => {
    fetch(`${API_URL}/api/counts/viloyat/${id}/`)
      .then((res) => res.json())
      .then((data) => setViloyatStats(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const getViloyatlarMchjlari = (id) => {
    fetch(`${API_URL}/api/get_all_mchj_all_infos/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setViloyatMchj(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getViloyatlarMchjlari(ViloyatId);
    getViloyatStats(ViloyatId);
  }, []);

  return (
    <div>
      <Sidebar/>
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">{viloyatNomi}</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {viloyatStats.map((stat, index) => {
          const statsColor = stats[index % stats.length];
          return (
            <div
              key={index}
              className={`p-6 rounded-lg ${statsColor.bgColor} shadow-md flex flex-col justify-start items-start h-32`}
            >
              <p className={`text-lg font-medium mb-2 ${statsColor.textColor}`}>
                {statsColor.title}
              </p>
              <p
                className={`text-4xl font-bold mt-auto ${statsColor.textColor}`}
              >
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-6">
        {viloyatMchj.map((item) => (
          <Card
            key={item.mchj_id}
            {...item}
            ViloyatColor={ViloyatColor}
            ViloyatTextColor={ViloyatTextColor}
            onClick={() => {
              dispatch(cartActions.addItem(item.mchj_id));
              navigate("/main");
            }}
          />
        ))}
      </div>
    </div>
    </div>

  );
};

export default Viloyatlar;
