import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
