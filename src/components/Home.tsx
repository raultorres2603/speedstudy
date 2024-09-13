import { useLoaderData } from "react-router-dom";

export const Home = () => {
  const data = useLoaderData() as { user: object };
  console.log(data.user);

  return (
    <div className="home">
      <div className="grid grid-rows-1">
        <div className="homeTitle mt-5 text-center text-4xl font-semibold">
          <span className="text-red-500 text-6xl">S</span>peed
          <span className="text-red-500 text-6xl">S</span>tudy
        </div>
        <div className="homeSubtitle text-center mb-5 text-md font-light">
          (Home)
        </div>
      </div>
    </div>
  );
};
