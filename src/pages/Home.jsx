import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/SideBar';
import Dashboard from '../components/Dashboard';
import Karta from '../components/Karta';

const Home = () => {


  return (
    <div>
      <Sidebar />

      {/* Carousel wrapper */}
      <Dashboard/>
      <Karta/>

    </div>
  );
};

export default Home;
