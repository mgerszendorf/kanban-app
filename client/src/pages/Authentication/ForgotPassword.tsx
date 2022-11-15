import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import firebase from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../../redux/features/messageSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function ForgotPassword() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [messageState, setMessageState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Reset password with Firebase
  const resetPassword = async () => {
    try {
      setLoader(true);
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          dispatch(
            setMessage({
              message: "Reset email sent. Go check your inbox.",
              type: "Success",
            })
          );
          setMessageState(true);
          setTimeout(() => {
            setMessageState(false);
          }, 1500);
        })
        .catch((err) => {
          dispatch(
            setMessage({
              message: "Password reset failed. Please try again",
              type: "Error",
            })
          );
          setMessageState(true);
          setTimeout(() => {
            setMessageState(false);
          }, 1500);
        })
        .finally(() => {
          setLoader(false);
        });
    } catch (err) {
      dispatch(
        setMessage({
          message: "Password reset failed. Please try again.",
          type: "Error",
        })
      );
      setMessageState(true);
      setTimeout(() => {
        setMessageState(false);
      }, 1500);
    }
  };

  const changeUrl = (link: string) => {
    navigate(`${link}`, { replace: true });
  };

  if (loader) return <Loader left={"50%"} />;
  if (messageState) return <Message />;

  return (
    <section className="forgot-password-wrapper">
      <div className="forgot-password">
        <div className="close-btn" onClick={() => changeUrl("/welcome")}>
          <GrClose />
        </div>
        <h2>Forgot password?</h2>
        <p className="welcome-txt">
          No worries, we'll send you reset instructions.
        </p>
        <form onSubmit={resetPassword}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.placeholder = "")
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.placeholder = "Enter your email")
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </label>
          <button>Reset password</button>
        </form>
        <div className="back" onClick={() => changeUrl("/signin")}>
          <BiLeftArrowAlt />
          <p>Back to sign in</p>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
