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
import { getCookie } from "./functions/cookies";
import { logIn } from "./functions/user";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = getCookie("ssTok");
      if (token) {
        throw "redirect to home";
      }
      return null;
    },
    errorElement: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      try {
        await logIn(username as string, password as string);
        // Crear cookie aqui
        return true;
      } catch (error) {
        console.log(error);
        throw redirect("/login?error=500");
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
