import cfg from "../config/config.json";
import { setCookie } from "./cookies";
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
  return (window.location.pathname = "/login");
};
