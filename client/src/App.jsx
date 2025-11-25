import { useState } from "react";
import Header  from "./Components/Header/Header.jsx";
import Footer  from "./Components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function App() {

  return (
    <div className="app">
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  );
}