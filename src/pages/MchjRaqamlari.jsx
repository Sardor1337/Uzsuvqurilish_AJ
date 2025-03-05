import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/SideBar';

const MchjRaqamlari = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [data, setData] = useState([]);

    useEffect(() => {
        const getMchjRaqamlari = () => {
            fetch(`${API_URL}/api/mchj_boshliqlar_raqamlari/`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setData(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
        };

        getMchjRaqamlari();
    }, []); 

    return (
        <div>
            <Sidebar/>
            <div className="w-[90rem] m-auto p-8">
                <div className="overflow-x-auto">
                    <table className=" min-w-full bg-white border border-gray-100  shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-[#010082] text-white uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">MCHJ nomi</th>
                                <th className="py-3 px-6 text-left">Rahbar</th>
                                <th className="py-3 px-6 text-left">Telefon raqami</th>
                                <th className="py-3 px-6 text-left">Viloyat</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm ">
                            {data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.mchj_name}</td>
                                    <td className="py-3 px-6 text-left">{item.user_name_or_full_name}</td>
                                    <td className="py-3 px-6 text-left">{item.phone ? item.phone : "Mavjud emas"}</td>
                                    <td className="py-3 px-6 text-left">{item.viloyat}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MchjRaqamlari;