import React, { useEffect, useState } from 'react';

const Mchjlar = ({ selectMchj, selectedMchj }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [mchjlar, setMchjlar] = useState([]);
    const [mchjColors, setMchjColors] = useState({});
    const [xabarlar, setXabarlar] = useState([]);

    const getMchjXabarlarSoni = () => {
        fetch(`${API_URL}/api/UnreadMessagesForMCHJView/`)
            .then((res) => res.json())
            .then((data) => {
                setXabarlar(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    
      useEffect(() => {
        const timer = setTimeout(() => {
            getMchjXabarlarSoni();
        }, 200);
      
        const timer2 = setInterval(() => {
            getMchjXabarlarSoni();
        }, 1000 );
      
        return () => {
          clearTimeout(timer); 
          clearInterval(timer2); 
        };
      }, [selectedMchj]);

    useEffect(() => {
        fetch(`${API_URL}/api/mchjs/`)
            .then((res) => res.json())
            .then((data) => {
                setMchjlar(data);
                assignColors(data);
            })
            .catch((error) => console.error("Error fetching data:", error));

        getMchjXabarlarSoni();
    }, []);

    const assignColors = (data) => {
        const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"];
        const newColors = {};
        data.forEach((mchj) => {
            newColors[mchj.id] = colors[mchj.id % colors.length];
        });
        setMchjColors(newColors);
    };

    return (
        <div className="w-1/4 h-[90vh] overflow-auto bg-white p-4">
            <h2 className="text-lg font-bold mb-4">Mchjlar</h2>
            {mchjlar.map((mchj) => {
                const xabar = xabarlar.find(x => x.mchj_id === mchj.id); // To'g'ri xabarni topish
                return (
                    <div
                        key={mchj.id}
                        onClick={() => selectMchj(mchj)}
                        className={`my-2 flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-200 ${
                            selectedMchj?.id === mchj.id ? "bg-gray-300" : ""
                        }`}
                    >
                        <div
                            className={`w-10 h-10 px-5 flex items-center justify-center rounded-full text-white font-bold ${mchjColors[mchj.id]}`}
                        >
                            {mchj.name.charAt(0) === `"` ? mchj.name.charAt(1).toUpperCase() : mchj.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center justify-between w-full gap-2">
                            <h3 className="font-medium">{mchj.name}</h3>
                            {xabar && xabar.message_count_for_mchj_that_is_not_readed > 0 && (
                                <p className="text-[0.8rem] text-[#010082] bg-amber-300 rounded-full px-[0.4rem]">
                                    {xabar.message_count_for_mchj_that_is_not_readed}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Mchjlar;



