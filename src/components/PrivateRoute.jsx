import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.cart.isLoggedIn); // Redux-dan login holatini olish

  return isLoggedIn ? <Outlet /> : <Navigate to="/user" replace />;
};

export default PrivateRoute;
