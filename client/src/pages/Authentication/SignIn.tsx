import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { signin, signInWithGoogle } from "../../redux/actions/authAction";
import {
  hideForgotPassword,
  hideSignIn,
  hideSignUp,
  showForgotPassword,
  showSignUp,
} from "../../redux/actions/authenticationPopupsAction";
import { connect } from "react-redux";

const SignIn = ({ signin, signInWithGoogle }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleForgotPassword() {
    dispatch(showForgotPassword());
    dispatch(hideSignIn());
    dispatch(hideSignUp());
  }

  function handleSignUp() {
    dispatch(showSignUp());
    dispatch(hideSignIn());
    dispatch(hideForgotPassword());
  }

  function signInUserOnSubmit(e: any) {
    e.preventDefault();
    signin(email, password);
  }

  return (
    <section className="sign-in-wrapper">
      <div className="sign-in">
        <div className="close-btn" onClick={() => dispatch(hideSignIn())}>
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
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Enter your email")}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Enter your password")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="row">
            <p onClick={() => handleForgotPassword()}>Forgot password</p>
            <p onClick={() => handleSignUp()}>Sign up</p>
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

function mapDispatchToProps(dispatch: any) {
  return {
    signin: (email: string, password: string) =>
      dispatch(signin(email, password)),
    signInWithGoogle: () => dispatch(signInWithGoogle()),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
