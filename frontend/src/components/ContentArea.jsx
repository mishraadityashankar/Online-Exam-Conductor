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
import { commonStyles } from "../styles/CommonStyle";

function ContentArea(props) {
  const classes = commonStyles();
  const [userDetails, setUserDetails] = useState(null);
  const [currPage, setCurrPage] = useState("examList");
  const [curResponses, setCurResponses] = useState(null);
  const [responseHistory, setResponseHistory] = useState(null);
  const [editExamDetails, setEditExamDetails] = useState(null);
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
          editExamDetails={editExamDetails}
          setCurrPage={setCurrPage}
          setEditExamDetails={setEditExamDetails}
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
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
          setCurrPage={setCurrPage}
        ></ExamList>
      ) : (
        <ExamListTeacher
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
          setCurrPage={setCurrPage}
          responseHistory={responseHistory}
          setResponseHistory={setResponseHistory}
          editExamDetails={editExamDetails}
          setEditExamDetails={setEditExamDetails}
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
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
          setCurrPage={setCurrPage}
        ></ExamDetail>
      ) : (
        <ExamWindowTeacher
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          responsesId={props.responsesId}
          setResponsesId={props.setResponsesId}
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
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
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
          setCurrPage={setCurrPage}
          curResponses={curResponses}
          setCurResponses={setCurResponses}
        ></ResponsesList>
      ) : (
        <StudentsResultList
          setLayout={props.setLayout}
          userDetails={userDetails}
          token={token}
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
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
          selectedExam={props.selectedExam}
          setSelectedExam={props.setSelectedExam}
          setCurrPage={setCurrPage}
          curResponses={curResponses}
          setCurResponses={setCurResponses}
        ></ResultHistory>
      );
    } else return <></>;
  };

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
    } else return <div className={classes.loading}>Loading</div>;
  };
  return <>{content()}</>;
}

export default ContentArea;
