import { useLoaderData } from "react-router-dom";
import { Theme } from "../functions/themes";

export const EditTheme = () => {
  const { theme } = useLoaderData() as { theme: Theme };
  return (
    <div>
      <h1>{theme.name}</h1>
    </div>
  );
};
