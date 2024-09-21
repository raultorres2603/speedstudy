import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Theme } from "../functions/themes";
import { Game } from "./subPlay/Game";
import { SubTheme } from "./NewTheme";

export const Play = () => {
  const { theme } = useLoaderData() as { theme: Theme };
  const [selectedSubThemes, setSelectedSubThemes] = useState<Array<SubTheme>>(
    []
  );
  const [start, setStart] = useState(false);

  const selectTheme = (subTheme: SubTheme) => {
    if (selectedSubThemes.includes(subTheme)) {
      setSelectedSubThemes(selectedSubThemes.filter((st) => st !== subTheme));
      return false;
    } else {
      setSelectedSubThemes([...selectedSubThemes, subTheme]);
      return true;
    }
  };

  if (!start) {
    return (
      <div className="playCont font-semibold mx-5">
        <div className="grid grid-rows-1 text-center">
          <div className="titlePlay text-2xl">
            <span className="text-red-500 text-3xl">P</span>lay {theme.name}
          </div>
        </div>
        <div className="grid grid-rows-1 mt-5 text-center text-xl">
          <div className="selectSubThemesTitle">
            <span className="text-red-500 text-2xl">S</span>elección de temas
          </div>
        </div>
        <div className="grid grid-rows-1 mt-5 gap-4">
          {theme.subThemes.map((subTheme, i) => (
            <div
              className="subTheme bg-slate-50 text-xl text-center rounded-lg border-2 border-black"
              key={i}
              onClick={(e) => {
                if (selectTheme(subTheme) === true) {
                  (e.target as HTMLDivElement).classList.add(
                    "bg-sky-500",
                    "text-slate-50",
                    "animate-pulse"
                  );
                } else {
                  (e.target as HTMLDivElement).classList.remove(
                    "bg-sky-500",
                    "text-slate-50",
                    "animate-pulse"
                  );
                }
              }}
            >
              <div className="title text-zinc-900">
                <span className="text-red-500 text-2xl">
                  {subTheme.name.slice(0, 1)}
                </span>
                {subTheme.name.slice(1)}
              </div>
            </div>
          ))}
        </div>
        {selectedSubThemes.length > 0 && (
          <>
            {" "}
            <hr className="my-5" />
            <div className="grid grid-rows-1">
              <button
                type="button"
                className="transition ease-in-out text-xl font-semibold text-slate-100 bg-sky-500 rounded-lg border-2 border-black hover:scale-110 active:scale-90"
                onClick={() => setStart(true)}
              >
                <span className="text-red-500 text-2xl">J</span>
                ugar
              </button>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <Game subThemes={selectedSubThemes} />;
  }
};
