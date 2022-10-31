import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Store } from "../../redux/types";

const ProtectedLayout = () => {
  const authState = useSelector((state: Store) => state.authState.value);

  if (authState?.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
