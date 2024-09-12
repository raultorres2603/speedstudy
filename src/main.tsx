import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { getCookie } from "./functions/cookies";

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
    errorElement: <Home />,
  },
  {
    path: "/",
    element: <Home />,
    loader: () => {
      const token = getCookie("ssTok");
      if (!token) {
        throw "redirect to login";
      }
      return null;
    },
    errorElement: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
