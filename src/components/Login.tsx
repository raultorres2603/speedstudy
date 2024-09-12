import { useEffect } from "react";
import toast from "react-hot-toast";
import { Form, useSearchParams } from "react-router-dom";

export const Login = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      switch (searchParams.get("error")) {
        case "402":
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
    }
  }, [searchParams]);
  return (
    <div className="logInComp">
      <div className="grid grid-rows-1">
        <div className="loginTitle my-5 text-center text-4xl font-semibold">
          <span className="text-red-500 text-6xl">S</span>peed
          <span className="text-red-500 text-6xl">S</span>tudy
        </div>
      </div>
      <div className="formToLogIn">
        <Form method="post" action="/home">
          <div className="grid grid-cols-2 gap-4 mx-5">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="inputLogIn text-xl rounded-lg text-center"
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              className="inputLogIn text-xl rounded-lg text-center"
            />
          </div>
          <div className="grid grid-rows-1 mx-10 my-5">
            <button
              type="submit"
              className="bg-red-500 transition hover:bg-red-600 duration-200 hover:scale-110 ring-red-200 ring-1"
            >
              Log In
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
