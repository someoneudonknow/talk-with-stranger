import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/auth/signin" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
