import React, { useState } from "react";
import ContentArea from "./ContentArea";
import Home from "./Home";
import Navbar from "./Navbar";
import Register from "./Register";

function MainLayout(props) {
  const initialPage = localStorage.getItem("OEC_token") ? "main" : "home";

  const [layout, setLayout] = useState(initialPage);
  const renderLayout = () => {
    if (layout === "home") {
      return <Home setLayout={setLayout} layout={layout}></Home>;
    } else if (layout === "register") {
      return <Register setLayout={setLayout} layout={layout}></Register>;
    } else if (layout === "main") {
      return <ContentArea setLayout={setLayout} layout={layout}></ContentArea>;
    }
  };
  return <div>{renderLayout()}</div>;
}

export default MainLayout;
