import React, { useEffect, useState } from 'react'
import Mchjlar from '../components/Mchjlar'
import Chat from '../components/Chat'
import Sidebar from '../components/layout/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store';

const Xabarlar = () => {
  const [selectedMchj, setSelectedMchj] = useState(null);
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;
  const role = useSelector((state) => state.cart.role);

  const getXabarlarSoni = (id) => {
    if(id === 1){
      fetch(`${API_URL}/api/CountUnreadMessagesForAdminView/`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(cartActions.setXabarlarSoni(data.unread_message_count))
      })
      .catch((error) => console.error('Error fetching data:', error));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getXabarlarSoni(role);
    }, 200);
  
    const timer2 = setInterval(() => {
      getXabarlarSoni(role);
    }, 1000 * 60 * 5);
  
    return () => {
      clearTimeout(timer); 
      clearInterval(timer2); // Intervalni ham tozalash kerak
    };
  }, [selectedMchj]);
  
  

  return (
    <>
    <Sidebar/>
        <div className="flex">
      <Mchjlar selectMchj={setSelectedMchj} selectedMchj={selectedMchj} />
      <Chat selectedMchj={selectedMchj} />
    </div>
    </>

  );
};

export default Xabarlar;