import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./register.tsx";
import Refer from "./refer.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/register" element={<Register />} />

        <Route path="/refer" element={<Refer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
