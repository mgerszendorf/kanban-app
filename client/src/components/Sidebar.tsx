import React from "react";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top-area">
        <h2 className="logo">Kanban App</h2>
        <div className="favourites">
          <div className="header">
            <p>Favourites</p>
          </div>
        </div>
        <div className="private">
          <div className="header">
            <p>Private</p>
            <FaPlus />
          </div>
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
    </div>
  );
}

export default Sidebar;
