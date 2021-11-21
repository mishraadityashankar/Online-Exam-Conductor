import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateExam from "./CreateExam";
import CreateQuestion from "./CreateQuestion";
import EditProfile from "./EditProfile";
import ExamDetail from "./ExamDetail";
import ExamList from "./ExamList";
import ExamListTeacher from "./ExamListTeacher";
import Navbar from "./Navbar";
import ResponsesList from "./ResponsesList";
import ResultHistory from "./ResultHistory";
import toast from "react-simple-toasts";
import StudentsResultList from "./StudentsResultList";
import ExamWindowTeacher from "./ExamWindowTeacher";
function ContentArea(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [currPage, setCurrPage] = useState("createExam");
  const [curResponses, setCurResponses] = useState(null);
  const [responseHistory, setResponseHistory] = useState(null);
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
          props.setUsername(res.data.result.name);
        } else {
          toast(res.data.message);
        }
      })
      .then(() => console.log(props.username))
      .catch((err) => {
        toast(err.message);
        console.log(err);
        props.setLayout("home");
      });
  }, []);
  const renderPage = () => {
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
          setUserDetails={setUserDetails}
          token={token}
          currPage={currPage}
          setCurrPage={setCurrPage}
        ></EditProfile>
      );
    } else if (currPage === "examList") {
      return userDetails.role === "Student" ? (
        <ExamList
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
        ></ExamList>
      ) : (
        <ExamListTeacher
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
          responseHistory={responseHistory}
          setResponseHistory={setResponseHistory}
        ></ExamListTeacher>
      );
    } else if (currPage === "examDetails") {
      return userDetails.role === "Student" ? (
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
      ) : (
        <ExamWindowTeacher
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          responsesId={props.responsesId}
          setResponsesId={props.setResponsesId}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
          responseHistory={responseHistory}
          setResponseHistory={setResponseHistory}
        ></ExamWindowTeacher>
      );
    } else if (currPage === "resultHistory") {
      return userDetails.role === "Student" ? (
        <ResponsesList
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
          curResponses={curResponses}
          setCurResponses={setCurResponses}
        ></ResponsesList>
      ) : (
        <StudentsResultList
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
          responseHistory={responseHistory}
          setResponseHistory={setResponseHistory}
        ></StudentsResultList>
      );
    } else if (currPage === "singleResponses") {
      return (
        <ResultHistory
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedTest={props.selectedTest}
          setSelectedTest={props.setSelectedTest}
          setCurrPage={setCurrPage}
          curResponses={curResponses}
          setCurResponses={setCurResponses}
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
          {renderPage()}
        </div>
      );
    } else return <div>Loading</div>;
  };
  return <>{content()}</>;
}

export default ContentArea;
