import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store'; // Redux store-dan actionlarni import qilamiz

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 


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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: username, password: password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json(); // Role_id kelguncha kutamiz
  
      localStorage.setItem('loginTimestamp', Date.now().toString());
  
      // Session storage set qilishni kutish
      await new Promise((resolve) => {
        sessionStorage.setItem('role', data.role_id);
        sessionStorage.setItem('userId', data.user_id);
        dispatch(cartActions.addUserId(data.user_id));
        
        dispatch(cartActions.addRole(data.role_id));
        if (data.role_id === 3) {
          sessionStorage.setItem('mchj', data.mchj_id);
          dispatch(cartActions.addItem(data.mchj_id));
        }
        resolve();
      });
  
      dispatch(cartActions.setIsLoggedIn(true));
  
      // Role aniq qo‘yilganidan keyin keyingi harakatlar
      if (data.role_id === 1 || data.role_id === 2) {
        navigate('/');
      } else if (data.role_id === 3) {
        navigate('/main');
      }
  
      // Xabarlar sonini olish
      await getXabarlarSoni(data.role_id);
  
    } catch (error) {
      console.error('Error:', error.message);
      alert('Noto‘g‘ri login yoki parol');
    }
  };

  useEffect(() => {
    const mchjId = sessionStorage.getItem('mchj'); // MCHJ ID sessionStorage orqali olinadi
    if (!mchjId) return;
  
    const getMchjXabarSoni = () => {
      fetch(`${API_URL}/api/unread-messages-for-mchj/${mchjId}/`)
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('mchjXabarlarSoni', data.unread_message_count);
        })
        .catch((error) => console.error('Error fetching data:', error));
    };
  
    getMchjXabarSoni(); // Birinchi marta chaqirish
  
    const timer = setInterval(() => {
      getMchjXabarSoni();
    }, 1000 ); // Har 5 daqiqada xabarlar sonini yangilash
  
    return () => clearInterval(timer);
  }, []);
  
  
  
  

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h1 className="text-2xl font-bold mb-6">Xush kelibsiz</h1>

        <div className="w-full max-w-sm">
          <label className="block text-gray-700 mb-1">Login</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#010082] mb-4"
          />

          <label className="block text-gray-700 mb-1">Parol</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#010082] mb-6"
          />

          <button
            onClick={handleSubmit}
            className="cursor-pointer w-full bg-[#010082] text-white py-2 rounded-md hover:bg-[#010082]/70 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Hidden on screens < 1000px */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/image.png"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
