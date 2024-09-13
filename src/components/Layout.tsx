export const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="layout">
      <div className="grid grid-rows-1">
        <div className="homeTitle mt-5 text-center text-4xl font-semibold">
          <span className="text-red-500 text-5xl">S</span>peed
          <span className="text-red-500 text-5xl">S</span>tudy
        </div>
        <div className="homeSubtitle text-center mb-5 text-md font-light">
          ({title})
        </div>
      </div>
      {children}
    </div>
  );
};
