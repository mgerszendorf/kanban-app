import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Store } from "../../redux/types";

const AppLayout = () => {
  const authState = useSelector((state: Store) => state.authState.value);

  if (!authState?.user) {
    return <Navigate to="/welcome" />;
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default AppLayout;
