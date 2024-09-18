import { Cart, SubTheme } from "../NewTheme";
import { useEffect, useState } from "react";
import {
  ArrowsRightLeftIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import ProgressBar from "@ramonak/react-progress-bar";

export const Game = (props: { subThemes: SubTheme[] }) => {
  const subThemes = props.subThemes;
  const [carts, setCarts] = useState<Array<Cart>>([]);
  const [actualCart, setActualCart] = useState(0);
  const [faceCart, setFaceCart] = useState(0);
  const [failedCarts, setFailedCarts] = useState<Array<Cart>>([]);
  const [successCarts, setSuccessCarts] = useState<Array<Cart>>([]);
  const [mustSee, setMustSee] = useState<Array<Cart>>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const a: Cart[] = [];
    for (let i = 0; i < subThemes.length; i++) {
      const subTheme = subThemes[i];
      for (let j = 0; j < subTheme.carts.length; j++) {
        const cart = subTheme.carts[j];
        a.push(cart);
      }
    }

    a.sort(() => Math.random() - 0.5);
    setCarts(a);
  }, [subThemes]);

  const nextCard = (action: string) => {
    switch (action) {
      case "success":
        setSuccessCarts([...successCarts, carts[actualCart]]);
        toast.success("Muy bien! 😁");
        break;

      case "failed":
        setFailedCarts([...failedCarts, carts[actualCart]]);
        toast.error("Hay que repasarla... 🙂‍↕️");
        break;

      case "mustSee":
        setMustSee([...mustSee, carts[actualCart]]);
        toast.error("Casi... Peeero... 😅");
        break;
      default:
        break;
    }

    if (actualCart < carts.length - 1) {
      setActualCart(actualCart + 1);
    } else {
      setFinished(true);
    }
  };

  const turnFace = () => {
    if (faceCart == 0) {
      setFaceCart(1);
    } else {
      setFaceCart(0);
    }
  };

  if (finished) {
    return <div className="finished">ACABAO</div>;
  } else {
    return (
      <div className="subGame">
        <div className="grid grid-rows-1">
          <ProgressBar
            completed={actualCart + 1}
            maxCompleted={carts.length}
            customLabel={"🤓"}
            bgColor="red"
            className="mx-5"
            labelAlignment="center"
            animateOnRender={true}
            baseBgColor="black"
          />
        </div>
        <div
          className={`cart text-center border-4 border-black h-96 my-5 mx-5 rounded-lg ${
            faceCart == 0 ? "bg-zinc-900" : "bg-slate-400"
          } font-semibold drop-shadow-lg relative`}
        >
          <ArrowsRightLeftIcon
            className={`w-10 h-auto text-red-500 absolute top-2 right-2 rounded-full`}
            stroke="black"
            onClick={() => {
              turnFace();
            }}
          />
          {carts.length > 0 && (
            <div className="contentOfTheCart overflow-y-auto">
              <div className="text items-center grid grid-rows-1 text-2xl my-24 mx-5 h-full">
                {faceCart == 0 ? (
                  <div className="text-slate-100">
                    {carts[actualCart].question}
                  </div>
                ) : (
                  <div className="text-zinc-900">
                    {carts[actualCart].answer}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-rows-1">
          <div className="emotes flex items-center justify-center gap-5">
            <FaceFrownIcon
              className="w-16 h-auto text-red-500"
              stroke="black"
              onClick={() => {
                nextCard("failed");
              }}
            />
            <ArrowPathIcon
              className="w-16 h-auto text-orange-400"
              stroke="black"
              onClick={() => {
                nextCard("mustSee");
              }}
            />
            <FaceSmileIcon
              className="w-16 h-auto text-green-500"
              stroke="black"
              onClick={() => {
                nextCard("success");
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};
