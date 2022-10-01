import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { Store } from "../redux/types";
import { toggleMenu } from "../redux/actions/navigationElementsAction";
import { FiLogOut } from "react-icons/fi";

function MobileMenu() {
  const menuState = useSelector((state: Store) => state.menuState);
  const dispatch = useDispatch();

  return (
    <section className="mobile-menu">
      <div className="nav-bar">
        <div className="logo">Kanban App</div>
        <div
          className="menu-button"
          onClick={() => dispatch(toggleMenu(false))}
        >
          {menuState ? (
            <input
              className="menu-button__cheeckbox"
              type="checkbox"
              readOnly
              checked
            />
          ) : (
            <input
              className="menu-button__cheeckbox"
              type="checkbox"
              readOnly
            />
          )}

          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="categories">
        <div className="favourites">
          <div className="header">
            <p>Favourites</p>
          </div>
          <div className="content"></div>
        </div>
        <div className="private">
          <div className="header">
            <p>Private</p>
            <FaPlus />
          </div>
          <div className="content"></div>
        </div>
      </div>

      <div className="user-wrapper">
        <div className="user">
          <FaRegUser />
          <p>m_gerszendorf</p>
        </div>
        <div className="icon">
          <FiLogOut />
        </div>
      </div>
    </section>
  );
}

export default MobileMenu;
