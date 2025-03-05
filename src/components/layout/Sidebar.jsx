import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux state-ni olish uchun
import { FileText, Home, List, MapPin, MessageCircle, Users } from "lucide-react";

const Sidebar = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
   const mchjId = useSelector((state) => state.cart.mchj);
  


  const isLoggedIn = useSelector((state) => state.cart.isLoggedIn);
  const xabarlarSoni = useSelector((state) => state.cart.xabarlarSoni); 
   const role = +sessionStorage.getItem("role");
   
      const getMchjXabarSoni = () => {
          fetch(`${API_URL}/api/unread-messages-for-mchj/${mchjId}/`)
              .then((res) => res.json())
              .then((data) => {
                sessionStorage.setItem('mchjXabarlarSoni', +data.unread_message_count);
              })
              .catch((error) => console.error('Error fetching data:', error));
      };
  
      
      useEffect(() => {
        if (mchjId !== 0) {  // Faqat mchjId 0 bo'lmasa so'rov yuboriladi
          const timer = setTimeout(() => {
            getMchjXabarSoni();
          }, 200);
      
          const timer2 = setInterval(() => {
            getMchjXabarSoni();
          }, 1000 * 60 * 5);
      
          return () => {
            clearTimeout(timer);
            clearInterval(timer2);
          };
        }
      }, [mchjId]); // mchjId o'zgarsa qayta ishlaydi
      

        const mchjXabarlarSoni = +sessionStorage.getItem('mchjXabarlarSoni');
        
 
  const handleLogout = () => {
    localStorage.removeItem("loginTimestamp");
    localStorage.removeItem("role"); 
    dispatch(cartActions.setIsLoggedIn(false));
    dispatch(cartActions.addRole(0)); 
    navigate("/login");
  };

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
    getXabarlarSoni(role);
  }, [xabarlarSoni]);

  let menuItems = [];

  if (role === 1) {
    menuItems = [
      { name: "Dashboard", icon: <Home size={20} />, path: "/" },
      { name: "Hujjatlar", icon: <FileText size={20} />, path: "/xujjatlar" },
      { name: "Xabarlar", Xabar: true, icon: <MessageCircle size={20} />, path: "/xabarlar" },
      { name: "Loyihalar ro'yxati", icon: <List size={20} />, path: "/loyihalar" },
      { name: "MCHJ xodimlar raqamlari", icon: <Users size={20} />, path: "/mchjRaqamlari" },
    ];
  } else if (role === 2) {
    menuItems = [
      { name: "Dashboard", icon: <Home size={20} />, path: "/" },
      { name: "Hujjatlar", icon: <FileText size={20} />, path: "/xujjatlar" },
      { name: "Loyihalar ro'yxati", icon: <List size={20} />, path: "/loyihalar" },
      { name: "MCHJ xodimlar raqamlari", icon: <Users size={20} />, path: "/mchjRaqamlari" },
    ];
  } else if (role === 3) {
    menuItems = [
      { name: "Hujjatlar", icon: <FileText size={20} />, path: "/xujjatlar" },
      { name: "Xabarlar", Xabar: true, icon: <MessageCircle size={20} />, path: "/xabarlarMchj" },
      { name: "Loyihalar ro'yxati", icon: <List size={20} />, path: "/loyihalar" },
    ];
  }
  


  return (
    <div>
      {/* Sidebar ochish tugmasi */}
      <div className="sticky top-0 flex py-[1rem] px-[3rem] justify-between shadow">
        <button>
          <FiMenu className="w-8 h-8 cursor-pointer" onClick={() => setIsOpen(true)} />
        </button>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="px-5 py-2 text-white cursor-pointer bg-[#010082] rounded-[8px]"
          >
            Log out
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-[20%] h-screen p-4 overflow-y-auto bg-[#010082] transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold text-white uppercase">Menu</h5>
          <button
            className="cursor-pointer text-white  hover:bg-[#667A8A] rounded-lg text-sm p-1.5"
            onClick={() => setIsOpen(false)}
          >
            <FiX className="w-5 h-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center justify-between text-white hover:bg-[#667A8A] p-3 rounded-lg"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </div>
                  {item.Xabar && xabarlarSoni > 0 && (
                    <span className="bg-white text-[#010082] text-xs px-2 py-0.5 rounded-[5px]">{xabarlarSoni}</span>
                  )}
                  {mchjXabarlarSoni > 0 && item.name === "Xabarlar" && role === 3 && (
                    <span className="bg-white text-[#010082] text-xs px-2 py-0.5 rounded-[5px]">{mchjXabarlarSoni}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
