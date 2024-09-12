export const logIn = async (username: string, password: string) => {
  const reqLogin = await fetch("/api/login", {
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
