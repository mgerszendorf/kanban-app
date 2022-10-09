import React from "react";
import { FaPlus, FaRegUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../redux/types";
import {
  showSignIn,
  showSignUp,
} from "../redux/actions/authenticationPopupsAction";

const Sidebar = ({ signout }: any) => {
  const authState = useSelector((state: Store) => state.authState);
  const dispatch = useDispatch();

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
      <div className="user-options">
        {authState?.user?.displayName ? (
          <div className="user-wrapper">
            <div className="user">
              <FaRegUser />
              <p>{authState?.user?.displayName}</p>
            </div>
            <div className="signout-icon">
              <FiLogOut />
            </div>
          </div>
        ) : (
          <>
            <div className="sign-in" onClick={() => dispatch(showSignIn())}>
              <FaSignInAlt />
              <p>Sign In</p>
            </div>
            <div className="sign-up" onClick={() => dispatch(showSignUp())}>
              <FaUserPlus />
              <p>Sign Up</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
