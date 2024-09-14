import { Form } from "react-router-dom";
import { useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

interface SubTheme {
  name: string;
  carts: object[];
}

export const NewTheme = () => {
  const [subThemes, setSubThemes] = useState<Array<SubTheme>>([]);

  const eliminarElemento = (index: number) => {
    // Usamos filter para crear un nuevo array sin el elemento en el índice especificado
    const newSubThemes = subThemes.filter((_, i) => i !== index);
    console.log(newSubThemes);
    setSubThemes(newSubThemes);
    console.log(newSubThemes);
  };

  return (
    <div className="createTheme mx-3">
      <Form method="post" action="/api/theme/new">
        <div className="grid grid-cols-2 gap-4">
          <div className="inputGroup">
            <label htmlFor="name" className="font-semibold text-xl">
              <span className="text-red-500 text-2xl">N</span>ombre
            </label>
            <input
              type="text"
              id="name"
              name="nameTheme"
              placeholder="Introdúcelo aqui"
              className="text-md bg-transparent rounded-lg"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="imgTheme" className="font-semibold text-xl">
              <span className="text-red-500 text-2xl">I</span>magen
            </label>
            <input
              type="text"
              id="imgTheme"
              name="imgTheme"
              placeholder="Introduce la URL"
              className="text-md bg-transparent rounded-lg"
            />
          </div>
        </div>
        <hr className="my-5" />
        <div className="flex justify-center mb-5">
          <div className="titleUnities text-2xl font-semibold text-center">
            <span className="text-red-500 text-3xl">U</span>
            nidades
          </div>
          <div
            className="addButton ml-2"
            onClick={() => {
              if (subThemes.length > 0) {
                if (subThemes[subThemes.length - 1].name.trim() !== "") {
                  setSubThemes([...subThemes, { name: "", carts: [] }]);
                }
              } else {
                setSubThemes([...subThemes, { name: "", carts: [] }]);
              }
            }}
          >
            <PlusCircleIcon className="w-8 h-auto text-slate-100" />
          </div>
        </div>
        <div className="grid grid-rows-1">
          <div className="contSubThemes h-60 overflow-y-auto border-2 rounded-lg border-slate-100">
            <div className="listSubThemes grid grid-rows-auto gap-4 items-center m-4">
              {subThemes.map((subTheme, index) => (
                <div className="subTheme grid grid-rows-1" key={index}>
                  <div className="inputGroup grid grid-cols-4 gap-4">
                    <div className="nameSubTheme col-span-3">
                      {subTheme.name.trim() !== "" ? (
                        <div className="nameConfirmed bg-sky-500 rounded-lg text-center text-md font-semibold">
                          {subTheme.name}
                        </div>
                      ) : (
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
                              console.log(subThemes);
                            }
                          }}
                        />
                      )}
                    </div>
                    {subTheme.name.trim() !== "" && (
                      <MinusCircleIcon
                        className="w-8 h-auto text-red-500"
                        onClick={() => {
                          eliminarElemento(index);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
