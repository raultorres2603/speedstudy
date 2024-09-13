import { useLoaderData, Link, redirect } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

interface User {
  username: string;
  _id: string;
  themes?: { name: string; _id: string }[];
}

export const Home = () => {
  const [cookies] = useCookies(["ssTok"]);
  const data = useLoaderData() as { user: User };
  console.log(data.user);

  useEffect(() => {
    if (!cookies.ssTok) {
      redirect("/login");
    }
  }, [cookies.ssTok]);

  return (
    <div className="home">
      <div className="themesTitle text-xl font-semibold mx-5">
        <div className="flex">
          <div className="title">
            <span className="text-red-500 text-3xl">T</span>emas
          </div>
          <Link
            to={"/createTheme"}
            className="transition ease-in-out w-9 h-9 ml-1 hover:scale:110 active:scale-90 items-start"
          >
            <PlusCircleIcon stroke="red" />
          </Link>
        </div>
      </div>
      <div className="themesSubtitle text-xs font-light mx-10">
        (Consulta tus temas creados)
      </div>
      {data.user.themes ? (
        data.user.themes.map((theme) => (
          <div className="themesCont" key={theme._id}>
            <Link
              to={`/theme/${theme._id}`}
              className="themeTitle text-xl font-semibold mx-5"
            >
              {theme.name}
            </Link>
          </div>
        ))
      ) : (
        <div className="themesCont">
          <div className="themeTitle grid grid-rows-1 text-md text-center my-5 bg-slate-50">
            <div className="title font-semibold text-slate-800">
              <span className="text-red-500 text-2xl">N</span>o tienes temas
              creados aún
            </div>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};
