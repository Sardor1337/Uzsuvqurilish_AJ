import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/layout/SideBar';
import CrudTable from '../../components/CRUD/CrudTable';
import Home from '../Home';



const AboutUs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const mchjDatas = useSelector((state) => state.cart.mchj); 
  const typeId = useSelector((state) => state.cart.typeId);
  const [miniRef,setMiniRef] = useState(false)
  const search = useSelector((state) => state.cart.query);

  // const getData = () => {
  //   fetch("http://192.168.0.195:8000/api/instruments/")
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // };

  const getTypeData = () => {
    fetch(`${API_URL}/api/types/`)
      .then((res) => res.json())
      .then((data) => {
        setTypeData(data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  };


  const handleMchjData = (mchjId) => {
    if (mchjId) {
      fetch(`${API_URL}/api/instruments/mchj/${mchjId}/`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        }
          
      )
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  const handleMchjDataAndTypeId = (mchjId , typeId) => {
    
      fetch(`${API_URL}/api/instruments/mchj/${mchjId}/?type__id=${typeId}`)
        .then((res) => res.json())
        .then((data) => 
          {
            setData(data)
            
          }
      )
        .catch((error) => console.error("Error fetching data:", error));
    
  };

  const getSearchedData = (mchjId,search,typeId) => {
    fetch(`${API_URL}/api/instruments/mchj/${mchjId}/?type__id=${typeId}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.error("Qidiruv xatosi:", error));
  }

  
  useEffect(() => {
    getTypeData();
  
    if (search && typeId) {
      getSearchedData(mchjDatas, search, typeId.id);
    } else if (search) {
      getSearchedData(mchjDatas, search, ""); // Agar typeId bo‘lmasa, uni bo‘sh qoldiramiz
    } else if (typeId && typeId.id) {
      handleMchjDataAndTypeId(mchjDatas, typeId.id);
    } else {
      handleMchjData(mchjDatas);
    }
  
    setMiniRef(false);
  }, [mchjDatas, typeId?.id, miniRef, search]);
  
  

  return (
      <>
        <Sidebar />
        <CrudTable typeData={typeData} data={data} setMiniRef={setMiniRef} />
      </>
  );
};

export default AboutUs;
