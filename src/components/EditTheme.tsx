import { useLoaderData } from "react-router-dom";
import { Theme } from "../functions/themes";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { SubTheme } from "./NewTheme";
import toast from "react-hot-toast";

export const EditTheme = () => {
  const { theme } = useLoaderData() as { theme: Theme };
  const [subThemes, setSubThemes] = useState<Array<SubTheme>>(theme.subThemes);
  return (
    <div className="theme mx-5">
      <div className="grid grid-rows-1 text-center text-3xl font-semibold">
        <div className="titleFull">
          <span className="text-red-500 text-4xl">
            {theme.name[0].toUpperCase()}
          </span>
          {theme.name.slice(1)}
        </div>
      </div>
      <div className="unityEdit text-xl mt-2 font-semibold grid grid-rows-1">
        <div className="title flex items-center">
          <span className="text-red-500 text-2xl">D</span>iseño de unidades
          <div
            className="addButton ml-2"
            onClick={() => {
              setSubThemes([...subThemes, { name: "Nueva unidad", carts: [] }]);
            }}
          >
            <PlusCircleIcon className="w-7 h-auto text-slate-100" />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 mt-3 gap-4">
        {subThemes.map((subTheme, i) => (
          <div className="subTheme grid grid-rows-1 flex" key={i}>
            <div className="inputGroup">
              <div className="nameSubTheme">
                {subTheme.name == "Nueva unidad" ? (
                  <input
                    type="text"
                    name="subTheme"
                    className="text-md font-semibold rounded-lg w-full bg-slate-100 text-slate-800 text-center"
                    placeholder="Titulo (Enter para confirmar)"
                    onKeyDownCapture={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.currentTarget.value.trim() !== ""
                      ) {
                        subTheme.name = e.currentTarget.value;
                        setSubThemes([...subThemes]);
                        toast.success("Tema guardado");
                      }
                    }}
                  />
                ) : (
                  <div className="nameConfirmed bg-sky-500 rounded-lg text-center text-md font-semibold">
                    {subTheme.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
