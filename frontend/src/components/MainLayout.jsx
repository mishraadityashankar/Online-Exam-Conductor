import React, { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Register from "./Register";

function MainLayout(props) {
  const [layout, setLayout] = useState("home");
  const renderLayout = () => {
    if (layout === "home") {
      return <Home setLayout={setLayout} layout={layout}></Home>;
    } else if (layout === "register") {
      return <Register setLayout={setLayout} layout={layout}></Register>;
    } else {
      return <Navbar setLayout={setLayout} layout={layout}></Navbar>;
    }
  };
  return <div>{renderLayout()}</div>;
}

export default MainLayout;
