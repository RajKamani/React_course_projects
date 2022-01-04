import React, { useCallback, useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  changePass: (token) => {},
});
let logoutTimer;

const calRemaningTime = (expTime) => {
  const currTime = new Date().getTime();
  const futureTime = new Date(expTime).getTime();
  const remTime = futureTime - currTime;
  return remTime;
};

const prevToken = () => {
  const token = localStorage.getItem("token");
  const expTime = localStorage.getItem("exp");

  const remTime = calRemaningTime(expTime);

  if (remTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    return null;
  }
  return {
    token: token,
    time: remTime,
  };
};
export const AuthContextProvider = (props) => {
  const tokenData = prevToken();
  let initToken;
  if (tokenData) {
    initToken = tokenData.token;
  }
  const [token, setToken] = useState(initToken);

  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("exp", expTime);
    const remTime = calRemaningTime(expTime);

    logoutTimer = setTimeout(logoutHandler, remTime);
  };

  const changePassHandler = (token) => {
    localStorage.removeItem("token");
    setToken(token);
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.time);
      logoutTimer = setTimeout(logoutHandler, tokenData.time);
    }
    return () => {};
  }, [tokenData, logoutHandler]);
  const contextvalue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    changePass: changePassHandler,
  };

  return (
    <AuthContext.Provider value={contextvalue}>
      {props.children}
    </AuthContext.Provider>
  );
}; // Wrapper Function for provide AuthContext to other Components

export default AuthContext;
