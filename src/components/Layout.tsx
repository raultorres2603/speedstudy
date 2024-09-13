import { logOut } from "../functions/user";
import {
  ArrowLeftEndOnRectangleIcon,
  BackwardIcon,
} from "@heroicons/react/24/outline";
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
            <Link to={goBack}>
              <BackwardIcon className="w-10 h-10 mr-1 mt-5 hover:cursor-pointer rounded-full text-red-600" />
            </Link>
          )}
          <div className="homeTitle mt-5 text-center text-4xl font-semibold">
            <span className="text-red-500 text-5xl">S</span>peed
            <span className="text-red-500 text-5xl">S</span>tudy
          </div>
          <div className="buttonLogOut" onClick={() => logOut()}>
            <ArrowLeftEndOnRectangleIcon className="w-10 h-10 ml-1 mt-5 hover:cursor-pointer rounded-full text-red-600" />
          </div>
        </div>

        <div className="homeSubtitle text-center mb-5 text-md font-light">
          ({title})
        </div>
      </div>
      {children}
    </div>
  );
};
