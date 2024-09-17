import cfg from "../config/config.json";
import { setCookie } from "./cookies";
import { googleLogout } from "@react-oauth/google";

export const logIn = async (username: string, password: string) => {
  const reqLogin = await fetch(cfg.domain + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!reqLogin.ok) {
    throw reqLogin.status;
  }

  setCookie("ssTok", (await reqLogin.json()).token, 1);
  return reqLogin;
};

export const logInWithGoogle = async (token: string) => {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw res.status;
  }

  const data = await res.json();
  const reqLogin = await fetch(cfg.domain + "/api/loginWithGoogle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: data.email }),
  });

  if (!reqLogin.ok) {
    throw reqLogin.status;
  }
  setCookie("ssTok", (await reqLogin.json()).token, 1);
  return reqLogin;
};

export const register = async (username: string, password: string) => {
  const reqRegister = await fetch(cfg.domain + "/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!reqRegister.ok) {
    throw reqRegister.status;
  }
  return reqRegister;
};

export const getInfo = async (token: string) => {
  const reqInfo = await fetch(cfg.domain + "/api/user/info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  if (!reqInfo.ok) {
    throw reqInfo.status;
  }
  return reqInfo;
};

export const logOut = () => {
  setCookie("ssTok", "", 0);
  googleLogout();
  return (window.location.pathname = "/login");
};
