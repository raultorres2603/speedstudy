import { useEffect } from "react";
import toast from "react-hot-toast";
import { Form, useSearchParams, Link, redirect } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { logInWithGoogle } from "../functions/user";

export const Login = () => {
  const [searchParams] = useSearchParams();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const loadingResponse = toast.loading("Iniciando sesión...");
      try {
        await logInWithGoogle(tokenResponse.access_token);
        toast.success("Sesion iniciada");
        return redirect("/home");
      } catch (error) {
        switch (error) {
          case "404":
            toast.error("Error al iniciar sesión");
            break;

          case "401":
            toast.error("Error al iniciar sesión");
            break;

          case "500":
            toast.error("Error de servidor");
            break;

          case "501":
            toast.error("Error de servidor");
            break;

          default:
            break;
        }
      } finally {
        toast.dismiss(loadingResponse);
      }
    },
    onError: (error) => toast.error(error.error_description as string),
  });

  useEffect(() => {
    if (searchParams.get("error")) {
      switch (searchParams.get("error")) {
        case "418":
          toast.error("Password erróneo");
          break;

        case "404":
          toast.error("Usuario no encontrado");
          break;

        case "501":
          toast.error("Error en la base de datos");
          break;

        case "500":
          toast.error("Error en el servidor");
          break;

        default:
          break;
      }
    } else if (searchParams.get("success")) {
      toast.success("Cuenta registrada!");
    }
  }, [searchParams]);
  return (
    <div className="logInComp">
      <div className="grid grid-rows-1">
        <div className="loginTitle mt-5 text-center text-4xl font-semibold">
          <span className="dark:text-red-500 text-sky-500 text-6xl">S</span>peed
          <span className="dark:text-red-500 text-sky-500 text-6xl">S</span>tudy
        </div>
        <div className="loginSubtitle text-center mb-5 text-md font-light">
          (LogIn)
        </div>
      </div>
      <div className="formToLogIn">
        <Form method="post" action="/home">
          <div className="grid grid-cols-2 gap-4 mx-5">
            <input
              type="email"
              name="username"
              id="username"
              placeholder="Email"
              className="inputLogIn text-xl rounded-lg text-center bg-sky-200 border-2 border-black"
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              className="inputLogIn text-xl rounded-lg text-center bg-sky-200 border-2 border-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mx-10 my-5">
            <button
              type="submit"
              className="bg-red-500 transition hover:bg-red-600 duration-200 hover:scale-110 ring-red-200 ring-1"
            >
              LogIn
            </button>
            <Link to="/register">
              <button
                type="submit"
                className="bg-sky-500 transition hover:bg-sky-600 duration-200 hover:scale-110 ring-sky-200 ring-1 w-full text-white"
              >
                Register
              </button>
            </Link>
          </div>
          <div className="grid grid-rows-1 mt-5 mx-10">
            <button
              type="button"
              className="bg-yellow-500 transition hover:bg-yellow-600 duration-200 hover:scale-110 ring-yellow-200 ring-1"
              onClick={() => login()}
            >
              Entra con Google
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
