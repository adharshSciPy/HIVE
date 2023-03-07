import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SnackBar from "./components/snackbar/Snackbar";

function App() {
  return (
    <>
      <Navbar />
      <SnackBar />
      <Outlet />
    </>
  );
}

export default App;
