import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { getCookie, setCookie } from "./functions/cookies";
import { logIn, register } from "./functions/user";
import { Register } from "./components/Register";
import toast, { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = getCookie("ssTok");
      if (token) {
        throw redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/home",
    element: <Home />,
    loader: () => {
      const token = getCookie("ssTok");
      if (!token) {
        throw redirect("/login");
      }
      return null;
    },
    action: async ({ request }) => {
      const loadingToast = toast.loading("Entrando...");
      const formData = await request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      try {
        const logReq = await logIn(username as string, password as string);
        const token = (await logReq.json()).token;
        console.log(token);
        setCookie("ssTok", token, 1);
        return redirect("/home");
      } catch (error) {
        throw redirect("/login?error=" + error);
      } finally {
        toast.dismiss(loadingToast);
      }
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      const token = getCookie("ssTok");
      if (token) {
        throw redirect("/home");
      }
      return null;
    },
    action: async ({ request }) => {
      const loadingToast = toast.loading("Registrando...");
      const formData = await request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      try {
        await register(username as string, password as string);
        return redirect("/login?success=200");
      } catch (error) {
        throw redirect("/register?error=" + error);
      } finally {
        toast.dismiss(loadingToast);
      }
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
