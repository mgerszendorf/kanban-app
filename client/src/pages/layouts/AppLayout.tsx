import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import Sidebar from "../../components/Sidebar";
import { Store } from "../../redux/types";
import MobileMenu from "../MobileMenu";

const AppLayout = () => {
  const authState = useSelector((state: Store) => state.authState.value);

  if (!authState?.user) {
    return <Navigate to="/welcome" />;
  }

  return (
    <>
      <NavigationBar />
      {/* <MobileMenu /> */}
      <Sidebar />
      <Outlet />
    </>
  );
};

export default AppLayout;
