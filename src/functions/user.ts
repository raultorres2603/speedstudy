import cfg from "../config/config.json";

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
