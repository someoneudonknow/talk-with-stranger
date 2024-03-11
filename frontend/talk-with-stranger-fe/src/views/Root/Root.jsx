import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AuthService from "../../services/auth.service";
import { isJWTExpired } from "../../utils";

const authService = new AuthService();

const RootView = () => {
  const { currentUser, userToken } = useSelector((state) => state.user);
  const { type, message } = useSelector((state) => state.toast);

  useEffect(() => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
  }, [type, message]);

  return (
    <main
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </main>
  );
};

export default RootView;
