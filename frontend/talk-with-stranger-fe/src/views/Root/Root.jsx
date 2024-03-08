import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RootView = () => {
  return (
    <main
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        transition="Bounce"
      />
      <ToastContainer />
    </main>
  );
};

export default RootView;
