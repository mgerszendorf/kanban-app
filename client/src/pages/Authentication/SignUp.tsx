import { useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import firebase from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { setAuth } from "../../redux/features/authSlice";
import { setMessage } from "../../redux/features/messageSlice";
import Message from "../../components/Message";

const SignUp = () => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [messageState, setMessageState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpUserOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((dataBeforeEmail) => {
          firebase.auth().onAuthStateChanged(function (user: any) {
            user.sendEmailVerification();
            user.updateProfile({
              displayName: name,
            });

            dispatch(
              setAuth({
                message: "Your account was successfully created!",
                user: user,
              })
            );
            dispatch(
              setMessage({
                message: "Your account was successfully created!",
                type: "Success",
              })
            );
            setMessageState(true);
            setTimeout(() => {
              setMessageState(false);
            }, 1500);
          });
        })
        .catch(function (err) {
          dispatch(
            setMessage({
              message:
                "Something went wrong, we couldn't create your account. Please try again.",
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
          message:
            "Something went wrong, we couldn't create your account. Please try again.",
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
            setMessage({
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
        setMessage({
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
    <section className="sign-up-wrapper">
      <div className="sign-up">
        <div className="close-btn" onClick={() => changeUrl("/welcome")}>
          <GrClose />
        </div>
        <h2>Create an account</h2>
        <p className="welcome-txt">
          Create an account and stay with us for longer.
        </p>
        <form onSubmit={signUpUserOnSubmit}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="text"
              placeholder="Enter your name"
              onFocus={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.placeholder = "")
              }
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                (e.target.placeholder = "Enter your name")
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </label>
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
          <p className="sign-in-btn" onClick={() => changeUrl("/signin")}>
            Sign in
          </p>
          <button>Create account</button>
        </form>
        <button className="google-btn" onClick={() => signInWithGoogle()}>
          Sign up with Google
        </button>
      </div>
    </section>
  );
};

export default SignUp;
