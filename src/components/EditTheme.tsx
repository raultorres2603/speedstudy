import { useLoaderData } from "react-router-dom";
import { Theme } from "../functions/themes";
import { useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
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
          <div
            className="subTheme grid grid-rows-1 flex bg-sky-200 rounded-lg"
            key={i}
          >
            <div className="inputGroup">
              <div className="nameSubTheme">
                {subTheme.name == "Nueva unidad" ? (
                  <input
                    type="text"
                    name="subTheme"
                    className="text-md font-semibold rounded-lg w-full bg-sky-50 text-slate-800 text-center"
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
                  <div className="nameConfirmed bg-sky-500 rounded-lg text-center text-md font-semibold grid grid-rows-1 gap-4">
                    <div className="titleActions flex items-center justify-center">
                      <MinusCircleIcon
                        className="w-7 h-auto text-slate-100 ml-1"
                        onClick={() => {
                          const newSubThemes = subThemes.filter(
                            (_, index) => index !== i
                          );
                          setSubThemes(newSubThemes);
                        }}
                      />
                      {subTheme.name}
                      <PlusCircleIcon
                        className="w-7 h-auto text-slate-100 ml-1"
                        onClick={() => {
                          subTheme.carts.push({
                            question: "Pregunta",
                            answer: "Respuesta",
                          });
                          setSubThemes([...subThemes]);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="cartsCont rounded-lg grid grid-rows-1 gap-2">
              {subTheme.carts.length === 0 &&
                subTheme.carts.push({
                  question: "Pregunta",
                  answer: "Respuesta",
                })}

              {subTheme.carts.map((cart, i) => (
                <div
                  className="cart grid grid-rows-1 bg-sky-200 rounded-lg gap-4 m-1"
                  key={i}
                >
                  <div className="cartTitle grid grid-cols-8 gap-2">
                    <input
                      type="text"
                      name="question"
                      id="question"
                      className="rounded-lg bg-slate-200 text-zinc-900 text-center col-span-4 border-2 border-black"
                      placeholder="Pregunta"
                      value={cart.question !== "Pregunta" ? cart.question : ""}
                      onChange={(e) => {
                        cart.question = e.currentTarget.value;
                        setSubThemes([...subThemes]);
                        console.log(cart.question);
                      }}
                    />
                    <input
                      type="text"
                      name="answer"
                      id="answer"
                      className="rounded-lg bg-slate-200 text-zinc-900 text-center col-span-3 border-2 border-black"
                      placeholder="Respuesta"
                      value={cart.answer !== "Respuesta" ? cart.answer : ""}
                      onChange={(e) => {
                        cart.answer = e.currentTarget.value;
                        setSubThemes([...subThemes]);
                        console.log(cart.answer);
                      }}
                    />
                    <MinusCircleIcon
                      className="w-7 h-auto text-red-500"
                      onClick={() => {
                        const newSub = subTheme.carts.filter(
                          (_, index) => index !== i
                        );
                        subTheme.carts = newSub;
                        setSubThemes([...subThemes]);
                        console.log(subTheme.carts);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <hr className="my-5" />
      <div className="grid grid-rows-1">
        <button
          type="button"
          className="transition ease-in-out hover:scale-105 active:scale-90 bg-red-500 rounded-lg text-slate-100 p-2 w-full hover:bg-red-600"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
