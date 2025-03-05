import React, { useState, useEffect } from 'react'
import AdminChat from '../components/AdminChat'
import AdminChatProfile from '../components/AdminChatProfile'
import Sidebar from '../components/layout/SideBar';

const XabarlarMchj = () => {
  const [selectedMchj, setSelectedMchj] = useState('admin');

  useEffect(() => {
    if (!selectedMchj) {
      setSelectedMchj('admin');
    }
  }, [selectedMchj]);

  return (
    <>
      <Sidebar />
      <div className="flex h-[87vh]">
        <AdminChat selectMchj={setSelectedMchj} selectedMchj={selectedMchj} />
        <AdminChatProfile selectedMchj={selectedMchj} />
      </div>
    </>
  )
}

export default XabarlarMchj;
