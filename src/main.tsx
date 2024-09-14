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
import { NewTheme } from "./components/NewTheme";
import { getCookie, setCookie } from "./functions/cookies";
import { logIn, register, getInfo } from "./functions/user";
import { Register } from "./components/Register";
import toast, { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";

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
  {
    path: "/home",
    element: (
      <Layout title="Inicio">
        <Home />
      </Layout>
    ),
    loader: async () => {
      const token = getCookie("ssTok");
      if (!token) {
        throw redirect("/login");
      }
      try {
        const userInfo = await getInfo(token);
        return await userInfo.json();
      } catch (error) {
        switch (error) {
          case "401":
            setCookie("ssTok", "", 0);
            throw redirect("/login");
            break;
          default:
            break;
        }
      }
    },
    action: async ({ request }) => {
      const loadingToast = toast.loading("Entrando...");
      const formData = await request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      try {
        const logReq = await logIn(username as string, password as string);
        const token = (await logReq.json()).token;
        setCookie("ssTok", token, 1);
        return redirect("/home");
      } catch (error) {
        throw redirect("/login?error=" + error);
      } finally {
        toast.dismiss(loadingToast);
      }
    },
  },
  // THEMES ROUTES
  {
    path: "/theme",
    children: [
      {
        path: "new",
        loader: () => {
          const token = getCookie("ssTok");
          if (!token) {
            throw redirect("/login");
          }
          return null;
        },
        element: (
          <Layout title="Nuevo tema" goBack="/home">
            <NewTheme />
          </Layout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>
);
