import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { redirect, RouterProvider, createHashRouter } from "react-router-dom";
import { Login } from "./components/Login";
import { Play } from "./components/Play";
import { Home } from "./components/Home";
import { NewTheme } from "./components/NewTheme";
import { getCookie, setCookie } from "./functions/cookies";
import { logIn, register, getInfo } from "./functions/user";
import { Register } from "./components/Register";
import toast, { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { deleteTheme, getTheme, getThemeInfo } from "./functions/themes";
import { EditTheme } from "./components/EditTheme";
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google";

const router = createHashRouter([
  {
    path: "/",
    loader: () => {
      const token = getCookie("ssTok");
      if (token) {
        return redirect("/home");
      }
      return redirect("/login");
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = getCookie("ssTok");
      if (token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/logout",
    loader: async () => {
      setCookie("ssTok", "", 0);
      googleLogout();
      return redirect("/login");
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      const token = getCookie("ssTok");
      if (token) {
        return redirect("/home");
      }
      return null;
    },
    action: async ({ request }) => {
      const loadingToast = toast.loading("Registrando...");
      const formData = await request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      if (!username || !password) {
        throw toast.error("Rellena todos los datos", { id: loadingToast });
      }
      try {
        await register(username as string, password as string);
        return redirect("/login?success=200");
      } catch (error) {
        return redirect("/register?error=" + error);
      } finally {
        toast.dismiss(loadingToast);
      }
    },
    errorElement: <Register />,
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
        return redirect("/login");
      }
      try {
        const userInfo = await getInfo(token);
        return await userInfo.json();
      } catch (error) {
        switch (error) {
          case "401":
            setCookie("ssTok", "", 0);
            return redirect("/login");
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
      if (!username || !password) {
        throw toast.error("Rellena todos los datos", { id: loadingToast });
      }
      try {
        await logIn(username as string, password as string);
        return redirect("/home");
      } catch (error) {
        return redirect("/login?error=" + error);
      } finally {
        toast.dismiss(loadingToast);
      }
    },
    errorElement: <Login />,
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
            return redirect("/login");
          }
          return null;
        },
        element: (
          <Layout title="Nuevo tema" goBack="/home">
            <NewTheme />
          </Layout>
        ),
      },
      {
        path: "remove/:themeId",
        loader: async ({ params }) => {
          const token = getCookie("ssTok");
          if (!token) {
            return redirect("/login");
          }
          const loadingToast = toast.loading("Eliminando...");
          try {
            await deleteTheme(params.themeId as string);
            toast.success("Tema eliminado", { id: loadingToast });
            return redirect("/home?success=200&action=remove");
          } catch (error) {
            toast.error(`Error al eliminar el tema (${error})`, {
              id: loadingToast,
            });
            return redirect("/home?error=" + error + "&action=remove");
          }
        },
      },
      {
        path: "edit/:themeId",
        loader: async ({ params }) => {
          const token = getCookie("ssTok");
          if (!token) {
            return redirect("/login");
          }
          const loadingToast = toast.loading("Cargando...");
          try {
            const theme = await getTheme(params.themeId as string);
            toast.success("Tema cargado", { id: loadingToast });
            return theme;
          } catch (error) {
            toast.error(`Error al cargar el tema (${error})`, {
              id: loadingToast,
            });
            return redirect("/home?error=" + error + "&action=edit");
          }
        },
        element: (
          <Layout title="Editar tema" goBack="/home">
            <EditTheme />
          </Layout>
        ),
        errorElement: (
          <Layout title="Inicio">
            <Home />
          </Layout>
        ),
      },
      {
        path: "play/:themeId",
        loader: async ({ params }) => {
          console.log(params.themeId);
          const token = getCookie("ssTok");
          if (!token) {
            return redirect("/login");
          }
          const loadingToast = toast.loading("Cargando...");
          try {
            const theme = await getThemeInfo(params.themeId as string);
            toast.success("Tema cargado", { id: loadingToast });
            return theme;
          } catch (error) {
            toast.error(`Error al cargar el tema (${error})`, {
              id: loadingToast,
            });
            return redirect("/home?error=" + error + "&action=play");
          }
        },
        element: (
          <Layout title="Jugar" goBack="/home">
            <Play />
          </Layout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <GoogleOAuthProvider clientId={import.meta.env.VITE_SKG}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
