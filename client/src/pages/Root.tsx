import React from "react";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import Sidebar from "../components/Sidebar";
import { Store } from "../redux/types";
import MobileMenu from "./MobileMenu";

function Root() {
  const menuState = useSelector((state: Store) => state.menuState);

  return (
    <>
      {menuState ? (
        <MobileMenu />
      ) : (
        <>
          <NavigationBar />
          <Sidebar />
        </>
      )}
    </>
  );
}

export default Root;
