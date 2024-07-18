import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Route from "./Route";
import AuthContextProvider from "./contexts/AuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Route />
    </AuthContextProvider>
  </React.StrictMode>
);
