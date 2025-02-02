import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { IndexedDBProvider } from "./context/IndexedDBContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndexedDBProvider>
      <App />
    </IndexedDBProvider>
  </StrictMode>
);
