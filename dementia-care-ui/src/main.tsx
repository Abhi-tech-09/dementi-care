import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Route from "./Route";
import AuthContextProvider from "./contexts/AuthContextProvider";
import AlertContextProvider from "./contexts/AlertContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <AlertContextProvider>
      <Route />
    </AlertContextProvider>
  </AuthContextProvider>
);
