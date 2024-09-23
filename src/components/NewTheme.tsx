import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { createTheme } from "../functions/themes";
import { useTransition, animated } from "@react-spring/web";

export interface SubTheme {
  name: string;
  carts: Cart[];
}

export interface Cart {
  question: string;
  answer: string;
}

export const NewTheme = () => {
  const [subThemes, setSubThemes] = useState<Array<SubTheme>>([]);
  const navigate = useNavigate();
  const [canCreate, setCanCreate] = useState(false);
  const transitions = useTransition(subThemes, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const eliminarElemento = (index: number) => {
    // Usamos filter para crear un nuevo array sin el elemento en el índice especificado
    if (
      confirm(`¿Seguro que quieres eliminar el tema ${subThemes[index].name}?`)
    ) {
      const newSubThemes = subThemes.filter((_, i) => i !== index);
      setSubThemes(newSubThemes);
      toast.error("Tema eliminado");
    }
  };

  const findEmptyUnity = () => {
    if (subThemes.length === 0) {
      toast.error("Debes introducir al menos un tema");
      return false;
    }

    const findEmpty = subThemes.find((subTheme, i) => {
      if (subTheme.name.trim() === "") {
        toast.error(`El tema número ${i + 1} no tiene nombre`);
        return true;
      }
    });

    if (findEmpty) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nameTheme = formData.get("nameTheme");
    const newTheme = {
      name: nameTheme as string,
      subThemes: subThemes,
      carts: [],
    };
    if (canCreate && nameTheme?.toString().trim() !== "") {
      const loadingToast = toast.loading("Enviando tema a la BD...");
      try {
        await createTheme(newTheme);
        toast.success("Tema creado", { id: loadingToast });
        return navigate("/home");
      } catch (error) {
        toast.error(`Error al crear el tema (${error})`, { id: loadingToast });
      }
    } else {
      toast.error(
        "Tienes que crear mínimo 1 unidad y ponerle un nombre al tema"
      );
    }
  };

  return (
    <div className="createTheme mx-3">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-4">
          <label htmlFor="name" className="font-semibold text-xl">
            <span className="text-red-500 text-2xl">N</span>ombre
          </label>
          <input
            type="text"
            id="name"
            name="nameTheme"
            placeholder="Introdúcelo aqui"
            className="text-md bg-slate-100 rounded-lg col-span-3 text-center border-2 border-black text-zinc-900"
          />
        </div>
        <hr className="my-5" />
        <div className="flex justify-center mb-5">
          <div className="titleUnities text-2xl font-semibold text-center">
            <span className="text-red-500 text-3xl">U</span>
            nidades
          </div>
          <div
            className="addButton ml-2 items-center"
            onClick={() => {
              if (subThemes.length > 0) {
                if (subThemes[subThemes.length - 1].name.trim() !== "") {
                  setSubThemes([...subThemes, { name: "", carts: [] }]);
                  setCanCreate(false);
                }
              } else {
                setSubThemes([...subThemes, { name: "", carts: [] }]);
                setCanCreate(false);
              }
            }}
          >
            <PlusCircleIcon className="w-8 h-auto text-slate-50" />
          </div>
        </div>
        <div className="grid grid-rows-1">
          <div className="listSubThemes grid grid-rows-auto gap-4 items-center m-4">
            {transitions((style, subTheme, _, i) => (
              <animated.div
                className="subTheme grid grid-rows-1"
                key={i}
                style={style}
              >
                <div className="inputGroup grid grid-cols-4 gap-4">
                  <div className="nameSubTheme col-span-3">
                    {subTheme.name.trim() !== "" ? (
                      <div className="nameConfirmed bg-sky-500 rounded-lg text-center text-md font-semibold border-2 border-black">
                        {subTheme.name}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="subTheme"
                        className="text-md font-semibold rounded-lg w-full bg-slate-100 text-slate-800 text-center border-2 border-black"
                        placeholder="Titulo (Enter para confirmar)"
                        onKeyDownCapture={(e) => {
                          if (
                            e.key === "Enter" &&
                            e.currentTarget.value.trim() !== ""
                          ) {
                            subTheme.name = e.currentTarget.value;
                            setSubThemes([...subThemes]);
                            toast.success("Tema guardado");
                            if (findEmptyUnity()) {
                              setCanCreate(false);
                            } else {
                              setCanCreate(true);
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                  {subTheme.name.trim() !== "" && (
                    <MinusCircleIcon
                      className="w-8 h-auto text-red-500"
                      onClick={() => {
                        eliminarElemento(i);
                      }}
                    />
                  )}
                </div>
              </animated.div>
            ))}
          </div>
          <hr className="my-5" />
          <div className="grid grid-rows-1 createButton">
            <button
              type="submit"
              className="transition ease-in-out hover:scale-105 active:scale-90 hover:bg-red-600 items-start bg-red-500"
            >
              Crear
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};
