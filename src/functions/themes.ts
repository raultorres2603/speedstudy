import { SubTheme } from "../components/NewTheme";
import cfg from "../config/config.json";
import { getCookie, setCookie } from "./cookies";

interface Theme {
  name: string;
  img: string;
  subThemes: SubTheme[];
}

export const createTheme = async (newTheme: Theme) => {
  const req = await fetch(cfg.domain + "/api/themes/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("ssTok"),
    },
    body: JSON.stringify({ theme: newTheme }),
  });
  if (!req.ok) {
    throw req.status;
  }
  const refreshToken = await fetch(cfg.domain + "/api/user/refresh", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("ssTok"),
    },
  });

  if (!refreshToken.ok) {
    throw refreshToken.status;
  }

  const { token } = await refreshToken.json();

  setCookie("ssTok", token, 1);

  return true;
};
