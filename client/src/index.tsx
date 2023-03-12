import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { style } from "./style/global";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const { GlobalStyle, theme } = style();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>
);
