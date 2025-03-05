import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const AdminChat = ({ selectMchj, selectedMchj }) => {
  const API_URL = import.meta.env.VITE_API_URL;
 const mchjId = useSelector((state) => state.cart.mchj);
 const [MchjXabarlarSoni, setMchjXabarlarSoni] = useState(0);

      const getMchjXabarSoni = () => {
          fetch(`${API_URL}/api/unread-messages-for-mchj/${mchjId}/`)
              .then((res) => res.json())
              .then((data) => {
                setMchjXabarlarSoni(data);
                console.log(data);
                
              })
              .catch((error) => console.error('Error fetching data:', error));
      };

      useEffect(() => {
        if (!selectedMchj) {
          selectMchj('admin');
        }
      }, [selectedMchj]);
      
  
      
        useEffect(() => {
          const timer = setTimeout(() => {
            getMchjXabarSoni(mchjId);
          }, 200);
        
          const timer2 = setInterval(() => {
            getMchjXabarSoni(mchjId);
          }, 1000 * 60 * 5);
        
          return () => {
            clearTimeout(timer); 
            clearInterval(timer2); 
          };
        }, [selectedMchj]);

  return (
    <div className="w-1/4 h-[86vh] overflow-auto bg-white p-4 border-r-2 border-gray-200">
      <h2 className="text-lg font-bold mb-4">Admin</h2>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-200 
          ${selectedMchj === 'admin' ? 'bg-gray-300' : ''}`}
        onClick={() => selectMchj('admin')}
      >
        <div className="w-10 h-10 p-4 flex items-center justify-center rounded-full text-white font-bold bg-fuchsia-500">
          A
        </div>
        <div className='flex items-center justify-between w-full gap-2'> 
          <h3 className="font-medium">MCHJLAR RAHBARI</h3>
          {MchjXabarlarSoni.unread_message_count > 0 &&
            <p className="text-[0.8rem] text-[#010082] bg-amber-300 rounded-full px-[0.4rem]">{MchjXabarlarSoni.unread_message_count}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminChat
