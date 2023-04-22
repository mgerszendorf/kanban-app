import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "../../services/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import Loader from "../../components/Loader";
import { GrClose } from "react-icons/gr";
import { setToastNotification } from "../../redux/features/toastNotificationSlice";
import { setAuth } from "../../redux/features/authSlice";
import Message from "../../components/ToastNotification";

const SignIn = () => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageState, setMessageState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInUserOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res: any) => {
          const { displayName, email, uid, refreshToken } = res.user;
          dispatch(
            setAuth({
              message: "Logged in successfully",
              user: {
                displayName,
                email,
                uid,
                refreshToken,
              },
            })
          );
          dispatch(
            setToastNotification({
              message: "Logged in successfully",
              type: "Success",
            })
          );
          setMessageState(true);
          setTimeout(() => {
            setMessageState(false);
          }, 1500);
        })
        .catch(() => {
          dispatch(
            setToastNotification({
              message: "Invalid login credentials",
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
        setToastNotification({
          message: "Invalid login credentials",
          type: "Error",
        })
      );
      setMessageState(true);
      setTimeout(() => {
        setMessageState(false);
      }, 1500);
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoader(true);
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          dispatch(
            setAuth({
              message: "Logged in successfully",
              user: res?.user,
            })
          );
          dispatch(
            setToastNotification({
              message: "Logged in successfully",
              type: "Success",
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
        setToastNotification({
          message: "Invalid login credentials",
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
    <section className="sign-in-wrapper">
      <div className="sign-in">
        <div className="close-btn" onClick={() => changeUrl("/welcome")}>
          <GrClose />
        </div>
        <h2>Welcome back</h2>
        <p className="welcome-txt">Welcome back! Please enter your details.</p>
        <form onSubmit={signInUserOnSubmit}>
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
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.placeholder = "")
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.placeholder = "Enter your password")
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </label>
          <div className="row">
            <p onClick={() => changeUrl("/forgot-password")}>Forgot password</p>
            <p onClick={() => changeUrl("/signup")}>Sign up</p>
          </div>

          <button>Sign in</button>
        </form>
        <button className="google-btn" onClick={() => signInWithGoogle()}>
          Sign in with Google
        </button>
      </div>
    </section>
  );
};

export default SignIn;
