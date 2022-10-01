import React from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../redux/actions/navigationElementsAction";

function NavigationBar() {
  const dispatch = useDispatch();

  return (
    <div className="navigation-bar">
      <div className="logo">Kanban App</div>
      <div className="menu-button" onClick={() => dispatch(toggleMenu(true))}>
        <input className="menu-button__cheeckbox" type="checkbox" />
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
