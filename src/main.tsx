import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// TODO: rewrite index.css when control the entire theme.
import "./index.css";
//  我是测试
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
