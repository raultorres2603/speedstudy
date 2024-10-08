import {
  ArrowLeftEndOnRectangleIcon,
  BackwardIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Layout = ({
  children,
  title,
  goBack,
}: {
  children: React.ReactNode;
  title: string;
  goBack?: string;
}) => {
  return (
    <div className="layout">
      <div className="grid grid-rows-1">
        <div className="flex justify-center">
          {goBack && (
            <Link
              to={goBack}
              onClick={() =>
                toast.loading("Volviendo, espera...", { duration: 1500 })
              }
            >
              <BackwardIcon className="w-10 h-10 mr-1 mt-5 hover:cursor-pointer rounded-full dark:text-red-500 text-sky-500" />
            </Link>
          )}
          <div className="homeTitle mt-5 text-center text-4xl font-semibold">
            <span className="dark:text-red-500 text-sky-500 text-5xl">S</span>
            peed
            <span className="dark:text-red-500 text-sky-500 text-5xl">S</span>
            tudy
          </div>
          <Link to="/logout">
            <ArrowLeftEndOnRectangleIcon className="w-10 h-10 ml-1 mt-5 hover:cursor-pointer rounded-full dark:text-red-500 text-sky-500" />
          </Link>
        </div>

        <div className="homeSubtitle text-center mb-5 text-md dark:font-light">
          ({title})
        </div>
      </div>
      {children}
    </div>
  );
};
