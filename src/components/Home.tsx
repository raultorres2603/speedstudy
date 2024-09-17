import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  PlayCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { SubTheme } from "./NewTheme";

interface User {
  username: string;
  _id: string;
  themes?: { name: string; _id: string; subThemes: SubTheme[] }[];
}

export const Home = () => {
  const data = useLoaderData() as { user: User };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      switch (searchParams.get("error")) {
        case "404":
          if (searchParams.get("action") === "edit") {
            toast.error("El tema no existe o no se puede editar.");
          } else {
            toast.error("Error al borrar el tema");
          }
          break;

        case "500":
          toast.error("Error de servidor.");
          break;

        case "401":
          toast.error("No autorizado.");
          break;

        default:
          break;
      }
    }
  }, [searchParams]);

  return (
    <div className="home">
      <div className="themesTitle text-xl font-semibold mx-5">
        <div className="flex">
          <div className="title">
            <span className="text-red-500 text-3xl">T</span>emas
          </div>
          <Link
            to={"/theme/new"}
            className="transition ease-in-out w-9 h-9 ml-1 hover:scale:110 active:scale-90 items-start"
          >
            <PlusCircleIcon stroke="red" />
          </Link>
        </div>
      </div>
      <div className="themesSubtitle text-xs font-light mx-10">
        (Consulta tus temas creados)
      </div>
      {data.user.themes && data.user.themes.length > 0 ? (
        <div className="grid grid-rows-1 gap-2 mt-5 mx-5">
          {data.user.themes.map((theme) => (
            <div
              className="transition ease-in-out themesCont bg-slate-50 rounded-lg flex relative overflow-hidden border-4 border-zinc-900"
              key={theme._id}
            >
              <div className="grid grid-cols-3">
                <div className="nameTheme text-lg font-semibold text-slate-800 m-1 overflow-scroll col-span-2">
                  {theme.name}
                </div>
                <div className="grid grid-cols-3 absolute right-0 top-0 gap-1">
                  <Link
                    to={`/theme/edit/${theme._id}`}
                    className="transition ease-in-out"
                  >
                    <PencilSquareIcon
                      className="transition ease-in-out w-8 h-8 hover:scale:110 active:scale-90 text-sky-500"
                      stroke="black"
                    />
                  </Link>
                  {theme.subThemes[0].carts.length > 0 ? (
                    <Link
                      to={`/theme/play/${theme._id}`}
                      className="transition ease-in-out"
                    >
                      <PlayCircleIcon
                        className={`transition ease-in-out w-8 h-8 hover:scale:110 active:scale-90 text-green-500`}
                        stroke="black"
                      />
                    </Link>
                  ) : (
                    <PlayCircleIcon
                      className={`transition ease-in-out w-8 h-8 hover:scale:110 active:scale-90 text-zinc-500`}
                      stroke="black"
                    />
                  )}

                  <Link
                    to={`/theme/remove/${theme._id}`}
                    className="transition ease-in-out"
                  >
                    <TrashIcon
                      className="transition ease-in-out w-8 h-8 hover:scale:110 active:scale-90 text-red-500"
                      stroke="black"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="themesCont">
          <div className="themeTitle grid grid-rows-1 text-md text-center my-5 bg-slate-50">
            <div className="title font-semibold text-slate-800">
              <span className="text-red-500 text-2xl">N</span>o tienes{" "}
              <span className="text-red-500 text-2xl">T</span>emas creados aún
            </div>
          </div>
        </div>
      )}
      <hr className="my-5" />
    </div>
  );
};
