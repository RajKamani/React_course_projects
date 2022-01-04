import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { API_KEY } from "../../secure";

import classes from "./AuthForm.module.css";
const fetchAPI = (url, setIsFetching, emailText, passwordText, auth) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: emailText,
      password: passwordText,
      returnSecureToken: true,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const expTime = new Date(new Date().getTime() + +data.expiresIn * 100);
      auth.login(data.idToken, expTime.toISOString());
      setIsFetching(false);
      if (data.error) {
        alert(data.error.errors[0].message);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsFetching(false);
    });
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFething, setIsFetching] = useState(false);
  const email = useRef();
  const password = useRef();
  const auth = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formHandler = (event) => {
    event.preventDefault();
    const emailText = email.current.value;
    const passwordText = password.current.value;
    if (emailText.length === 0 || !(passwordText.length >= 6)) {
      // return alert("Fill first");
    }
    setIsFetching(true);
    if (isLogin) {
      fetchAPI(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          API_KEY,
        setIsFetching,
        emailText,
        passwordText,
        auth
      );
    } else {
      fetchAPI(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          API_KEY,
        setIsFetching,
        emailText,
        passwordText,
        auth
      );
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={password} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          {isFething && (
            <p style={{ color: "white", marginBottom: 0 }}>Wait..</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
