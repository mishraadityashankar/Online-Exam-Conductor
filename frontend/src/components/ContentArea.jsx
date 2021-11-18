import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateExam from "./CreateExam";
import CreateQuestion from "./CreateQuestion";
import EditProfile from "./EditProfile";
import ExamDetail from "./ExamDetail";
import ExamList from "./ExamList";
import Navbar from "./Navbar";
import ResultHistory from "./ResultHistory";

function ContentArea(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [currPage, setCurrPage] = useState("createExam");
  const token = localStorage.getItem("OEC_token");
  useEffect(() => {
    axios
      .get("/user/details", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.message === "Success") {
          setUserDetails(res.data.result);
          console.log(userDetails);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        props.setLayout("home");
      });
  }, []);
  const facultyPage = () => {
    if (currPage === "createQuestion") {
      return (
        <CreateQuestion
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
        ></CreateQuestion>
      );
    } else if (currPage === "createExam") {
      return (
        <CreateExam
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
        ></CreateExam>
      );
    } else if (currPage === "editProfile") {
      return (
        <EditProfile
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
        ></EditProfile>
      );
    } else if (currPage === "examList") {
      return (
        <ExamList
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
        ></ExamList>
      );
    } else if (currPage === "examDetails") {
      return (
        <ExamDetail
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          responsesId={props.responsesId}
          setResponsesId={props.setResponsesId}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
        ></ExamDetail>
      );
    } else if (currPage === "resultHistory") {
      return (
        <ResultHistory
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
        ></ResultHistory>
      );
    } else return <></>;
  };
  console.log(currPage);
  const content = () => {
    if (userDetails) {
      return (
        <div>
          <Navbar
            userDetails={userDetails}
            setLayout={props.setLayout}
            layout={props.layout}
            currPage={currPage}
            setCurrPage={setCurrPage}
          ></Navbar>
          {facultyPage()}
        </div>
      );
    } else return <div>Loading</div>;
  };
  return <>{content()}</>;
}

export default ContentArea;
