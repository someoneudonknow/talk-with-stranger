import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { isJWTExpired } from "../../utils";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
