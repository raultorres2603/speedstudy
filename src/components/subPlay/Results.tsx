import {
  ArrowPathRoundedSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Cart } from "../NewTheme";
import { Link } from "react-router-dom";

export const Results = (props: {
  successCarts: Cart[];
  failedCarts: Cart[];
  mustSeeCarts: Cart[];
}) => {
  return (
    <div className="results mx-5 font-semibold">
      <div className="grid grid-rows-1 text-center title text-2xl">
        <div className="title">
          {" "}
          <span className="text-red-500 text-3xl">R</span>esultados
        </div>
      </div>
      <div className="grid grid-rows-1 mt-5 text-center">
        <div className="grid grid-cols-3">
          <div className="successCards grid grid-rows-2">
            <div className="title">
              <span className="text-red-500 text-3xl">B</span>ien
            </div>
            <div className="count text-3xl mt-2 dark:text-slate-200 text-zinc-800">
              {props.successCarts.length}
            </div>
          </div>
          <div className="mustSeeCards grid grid-rows-2">
            <div className="title">
              <span className="text-red-500 text-3xl">R</span>egular
            </div>
            <div className="count text-3xl mt-2 dark:text-slate-200 text-zinc-800">
              {props.mustSeeCarts.length}
            </div>
          </div>
          <div className="failedCards grid grid-rows-2">
            <div className="title">
              <span className="text-red-500 text-3xl">M</span>al
            </div>
            <div className="count text-3xl mt-2 dark:text-slate-200 text-zinc-800">
              {props.failedCarts.length}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="grid grid-rows-1">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="transition ease-in-out bg-sky-500 border-2 border-black hover:scale-110 active:scale-90"
          >
            <ArrowPathRoundedSquareIcon
              className="w-8 h-8 m-auto"
              stroke="white"
              onClick={() => window.location.reload()}
            />
          </button>
          <button
            type="button"
            className="transition ease-in-out bg-red-500 border-2 border-black text-zinc-900 font-semibold text-md hover:scale-110 active:scale-90"
          >
            <Link to="/home">
              <HomeIcon className="w-8 h-8 m-auto" stroke="white" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
