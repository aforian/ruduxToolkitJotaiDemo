import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Routes from "./Routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
