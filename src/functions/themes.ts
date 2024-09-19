import { SubTheme } from "../components/NewTheme";
import cfg from "../config/config.json";
import { getCookie, setCookie } from "./cookies";

export interface Theme {
  _id?: string;
  name: string;
  subThemes: SubTheme[];
  creator?: string;
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

export const updateTheme = async (themeId: string, subThemes: SubTheme[]) => {
  const req = await fetch(cfg.domain + "/api/themes/edit/" + themeId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("ssTok"),
    },
    body: JSON.stringify({ subThemes: subThemes }),
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

export const deleteTheme = async (themeId: string) => {
  const req = await fetch(cfg.domain + "/api/themes/remove/" + themeId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("ssTok"),
    },
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

export const getTheme = async (themeId: string) => {
  const req = await fetch(cfg.domain + "/api/themes/edit/" + themeId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("ssTok"),
    },
  });
  if (!req.ok) {
    throw req.status;
  }
  return await req.json();
};

export const getThemeInfo = async (themeId: string) => {
  const req = await fetch(cfg.domain + "/api/themes/info/" + themeId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("ssTok"),
    },
  });
  if (!req.ok) {
    throw req.status;
  }
  return await req.json();
};
