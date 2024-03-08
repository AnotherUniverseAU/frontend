import { BrowserRouter } from "react-router-dom";
import MainRouter from "./mainRouter.tsx";
import { GlobalStyle } from "src/styles/globalStyle.ts";
import { useEffect } from "react";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <MainRouter />
    </BrowserRouter>
  );
};
