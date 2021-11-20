import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ContentArea from "./ContentArea";
import ExamWindow from "./ExamWindow";
import Home from "./Home";
import Navbar from "./Navbar";
import Register from "./Register";

function MainLayout(props) {
  const initialPage = localStorage.getItem("OEC_token") ? "main" : "home";

  const [layout, setLayout] = useState(initialPage);
  const [selectedTest, setSelectedTest] = useState(null);
  const [responsesId, setResponsesId] = useState(null);

  const [username, setUsername] = useState(null);

  const renderLayout = () => {
    if (layout === "home") {
      return <Home setLayout={setLayout} layout={layout}></Home>;
    } else if (layout === "register") {
      return <Register setLayout={setLayout} layout={layout}></Register>;
    } else if (layout === "main") {
      return (
        <ContentArea
          selectedTest={selectedTest}
          setSelectedTest={setSelectedTest}
          setLayout={setLayout}
          layout={layout}
          username={username}
          setUsername={setUsername}
          responsesId={responsesId}
          setResponsesId={setResponsesId}
        ></ContentArea>
      );
    } else if (layout === "examWindow") {
      return (
        <ExamWindow
          username={username}
          setUsername={setUsername}
          selectedTest={selectedTest}
          setSelectedTest={setSelectedTest}
          setLayout={setLayout}
          responsesId={responsesId}
          setResponsesId={setResponsesId}
          layout={layout}
        ></ExamWindow>
      );
    }
  };
  // return (
  //   <div>
  //     <ChatWindow></ChatWindow>
  //   </div>
  // );
  return <div>{renderLayout()}</div>;
}

export default MainLayout;
