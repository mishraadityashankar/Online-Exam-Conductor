import React, { useState } from "react";
import ContentArea from "./ContentArea";
import ExamWindow from "./ExamWindow";
import Home from "./Home";
import Register from "./Register";

function MainLayout(props) {
  const initialPage = localStorage.getItem("OEC_token") ? "main" : "home";

  const [layout, setLayout] = useState(initialPage);
  const [selectedExam, setSelectedExam] = useState(null);
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
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
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
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
          setLayout={setLayout}
          responsesId={responsesId}
          setResponsesId={setResponsesId}
          layout={layout}
        ></ExamWindow>
      );
    }
  };
  return <div>{renderLayout()}</div>;
}

export default MainLayout;
