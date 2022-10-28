import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import NavigationBar from "../components/NavigationBar";
import Sidebar from "../components/Sidebar";
import { Store } from "../redux/types";
import ForgotPassword from "./Authentication/ForgotPassword";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Home from "./Home";
import MobileMenu from "./MobileMenu";

function Root() {
  const menuState = useSelector((state: Store) => state.menuState);
  const signInState = useSelector((state: Store) => state.signInState);
  const signUpState = useSelector((state: Store) => state.signUpState);
  const forgotPasswordState = useSelector(
    (state: Store) => state.forgotPasswordState
  );

  return (
    <>
      {menuState ? (
        <MobileMenu />
      ) : (
        <>
          <NavigationBar />
        </>
      )}
      <Sidebar />
      <Home />
      {signInState && !signUpState && !forgotPasswordState && <SignIn />}
      {signUpState && !signInState && !forgotPasswordState && <SignUp />}
      {forgotPasswordState && !signInState && !signUpState && (
        <ForgotPassword />
      )}
      <Message />
    </>
  );
}

export default Root;
