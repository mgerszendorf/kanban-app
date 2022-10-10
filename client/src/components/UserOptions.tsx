import { FaRegUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { ConnectedProps, useDispatch, useSelector, connect } from "react-redux";
import { Store } from "../redux/types";
import { signout } from "../redux/actions/authAction";
import {
  showSignIn,
  showSignUp,
} from "../redux/actions/authenticationPopupsAction";

const UserOptions = ({ signout }: UserOptionsProps) => {
  const authState = useSelector((state: Store) => state.authState);
  const dispatch = useDispatch();

  return (
    <div className="user-options">
      {authState?.user?.displayName ? (
        <div className="user-wrapper">
          <div className="user">
            <FaRegUser />
            <p>{authState?.user?.displayName}</p>
          </div>
          <div className="signout-icon" onClick={() => signout()}>
            <FiLogOut />
          </div>
        </div>
      ) : (
        <div className="login-wrapper">
          <div className="sign-in" onClick={() => dispatch(showSignIn())}>
            <FaSignInAlt />
            <p>Sign In</p>
          </div>
          <div className="sign-up" onClick={() => dispatch(showSignUp())}>
            <FaUserPlus />
            <p>Sign Up</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatch = {
  signout,
};

const connector = connect(null, mapDispatch);

type UserOptionsProps = ConnectedProps<typeof connector>;

export default connector(UserOptions);
