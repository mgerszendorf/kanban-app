import { FaRegUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../redux/features/authSlice";
import { setToastNotification } from "../redux/features/toastNotificationSlice";
import { Store } from "../redux/types";
import firebase from "../services/firebase";

function UserOptions() {
  const authState = useSelector((state: Store) => state.authState.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeUrl = (link: string) => {
    navigate(`${link}`, { replace: true });
    window.location.reload();
  };

  const signout = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch(
            setAuth({
              message: "Logged out successfully",
              user: {},
            })
          );
          dispatch(
            setToastNotification({
              message: "Logged out successfully",
              type: "Success",
            })
          );
          navigate("/signin", { replace: true });
          window.location.reload();
        })
        .catch((err) => {
          dispatch(
            setToastNotification({
              message: "Signout failed. Please try again",
              type: "Error",
            })
          );
        });
    } catch (err) {
      dispatch(
        setToastNotification({
          message: "Signout failed. Please try again",
          type: "Error",
        })
      );
    }
  };

  return (
    <div className="user-options">
      {authState?.user?.displayName ? (
        <div className="user-wrapper">
          <div className="user">
            <FaRegUser />
            <p>{authState?.user?.displayName}</p>
          </div>
          <div className="signout-icon" onClick={signout}>
            <FiLogOut />
          </div>
        </div>
      ) : (
        <div className="login-wrapper">
          <div className="sign-in" onClick={() => changeUrl("/signin")}>
            <FaSignInAlt />
            <p>Sign In</p>
          </div>
          <div className="sign-up" onClick={() => changeUrl("/signup")}>
            <FaUserPlus />
            <p>Sign Up</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOptions;
