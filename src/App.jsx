import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import AboutUs from "./pages/MCHJ/AboutUs";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store";
import Viloyatlar from "./components/Viloyatlar";
import UserHome from "./UserInterface/UserHome";
import Xabarlar from "./pages/Xabarlar";
import XabarlarMchj from "./pages/XabarlarMchj";
import MchjRaqamlari from "./pages/MchjRaqamlari";
import Xujjatlar from "./pages/Xujjatlar";
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.cart.isLoggedIn);

  useEffect(() => {
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    if (loginTimestamp) {
      const elapsed = Date.now() - parseInt(loginTimestamp, 10);
      if (elapsed > 1 * 60 * 60 * 1000) {
        localStorage.removeItem("loginTimestamp");
        dispatch(cartActions.setIsLoggedIn(false));
      } else {
        dispatch(cartActions.setIsLoggedIn(true));
      }
    }
  }, [dispatch]);

  return (
    <Router>
          <Routes>
          <Route path="/user" element={<UserHome/>}/>

            <Route path="/login" element={<Login />} />

            <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/" element={<Home />} />
              <Route path="/main" element={<AboutUs />} />
              <Route path="/viloyatlar" element={<Viloyatlar />} />
              <Route path="/xabarlar" element={<Xabarlar/>}/>
              <Route path="/mchjRaqamlari" element={<MchjRaqamlari/>}/>
              <Route path="/xabarlarMchj" element={<XabarlarMchj/>}/>
              <Route path="/xujjatlar" element={<Xujjatlar/>}/>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
    </Router>
  );
}

export default App;
