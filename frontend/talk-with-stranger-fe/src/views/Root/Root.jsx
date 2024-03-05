import { Outlet } from "react-router-dom";

const RootView = () => {
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
