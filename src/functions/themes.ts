import { SubTheme } from "../components/NewTheme";
import cfg from "../config/config.json";
import { getCookie } from "./cookies";

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
  return await req.json();
};
