import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Store } from "../redux/types";
import ForgotPassword from "./Authentication/ForgotPassword";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Dashboard from "./Dashboard";
import HeroBanner from "./HeroBanner";
import Home from "./Home";
import AppLayout from "./layouts/AppLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import MobileMenu from "./MobileMenu";

function Root() {
  const menuState = useSelector(
    (state: Store) => state.navigationElementState.active
  );
  if (menuState) return <MobileMenu />;

  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="welcome" element={<HeroBanner />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboards" element={<Home />} />
        <Route path="dashboards/:dashboardId" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default Root;
