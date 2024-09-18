import { useEffect } from "react";
import toast from "react-hot-toast";
import { Form, useSearchParams, Link } from "react-router-dom";

export const Register = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      switch (searchParams.get("error")) {
        case "501":
          toast.error("Error en la base de datos");
          break;

        case "500":
          toast.error("Error en el servidor");
          break;

        case "418":
          toast.error("El usuario ya existe");
          break;

        default:
          break;
      }
    }
  }, [searchParams]);
  return (
    <div className="registerCont">
      <div className="grid grid-rows-1">
        <div className="registerTitle mt-5 text-center text-4xl font-semibold">
          <span className="dark:text-red-500 text-sky-500 text-6xl">S</span>peed
          <span className="dark:text-red-500 text-sky-500 text-6xl">S</span>tudy
        </div>
        <div className="registerSub text-center mb-5 text-md font-light">
          (Register)
        </div>
      </div>
      <div className="formToLogIn">
        <Form method="post" action="/register">
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
              Register
            </button>
            <Link to="/login">
              <button
                type="submit"
                className="bg-sky-500 transition hover:bg-sky-600 duration-200 hover:scale-110 ring-sky-200 ring-1 w-full text-white"
              >
                Login
              </button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
