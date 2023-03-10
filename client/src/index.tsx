import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { style } from "./style/global";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const { GlobalStyle, Theme } = style();
root.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
    <Theme />
  </React.StrictMode>
);
