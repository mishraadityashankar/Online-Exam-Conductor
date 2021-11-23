import { makeStyles } from "@mui/styles";
export const examDetailsStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
    height: "100vh",
    backgroundColor: "#f5f0e1",
    overflow: "auto",
  },
  box: {
    padding: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  heading1: {
    fontSize: "28px !important",
    marginBottom: "10px !important",
    padding: "5px !important",
    fontWeight: "bold !important",
    textAlign: "center",
  },
  heading2: {
    fontSize: "24px !important",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    paddingLeft: "20px !important",
    paddingRight: "20px !important",
    fontWeight: "bold !important",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px !important",
    fontSize: "16px !important",
    "& span": {
      fontSize: "16px !important",
      fontWeight: "bold !important",
    },
  },
  instructionsBox: {
    marginTop: "10px",
    padding: "10px",
    height: "400px",
    overflow: "auto",
  },
  typo: {
    marginBottom: "10px !important",
  },
});

export const createExamStyles = makeStyles({
  root: {
    backgroundColor: "#f5f0e1",
    height: "100vh",
    padding: "20px",
    overflow: "auto",
  },
  gridOuter: {
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  gridOuter2: {
    backgroundColor: "#ffc13b",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  questionList: {
    height: "400px",
    overflow: "auto",
    padding: "10px",
  },

  paragraph: {
    padding: "5px",
    "& span": {
      color: "black",
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  flexBox1: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  flexBox2: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
    justifyContent: "space-around",
  },
});

export const examWindowStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
    backgroundColor: "#1e3d59",
  },
  questionGrid: {
    height: "100vh",
    overflow: "auto",
  },
  questionBox: {
    margin: "10px",
    boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%)",
  },
  summary: {
    backgroundColor: "#f5f5f5 !important",
  },
  typo1: {
    padding: "5px !important",
    fontWeight: "bold !important",
    fontSize: "18px !important",
  },

  typo2: {
    textAlign: "right !important",
    padding: "5px !important",
    fontWeight: "bold !important",
  },
  typo3: {
    padding: "10px !important",
  },
  flexBox1: {
    display: "flex",
    justifyContent: "space-between",
  },
  err: {
    color: "red !important",
  },
  examDetailsBox: {
    marginBottom: "20px",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  headBox: {
    marginBottom: "20px",
  },
  testName: {
    fontSize: "24px !important",
    fontWeight: "bold !important",
  },
  typo4: {
    fontSize: "16px !important",
    fontWeight: "bold !important",
    marginBottom: "20px !important",
  },
  err2: {
    color: "red !important",
    marginTop: "20px !important",
  },
  buttonGrid: {
    marginTop: "20px !important",
  },
});

export const examListStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
    height: "100vh",
    backgroundColor: "#f5f0e1",
    overflow: "auto",
  },
  box: {
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
    padding: "20px",
  },
  heading1: {
    fontSize: "18px !important",
    marginBottom: "20px !important",
    fontWeight: "bold !important",
  },
  typo: {
    marginBottom: "20px !important",
    "& span": {
      fontWeight: "bold !important",
    },
  },
  notest: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    height: "60vh",
  },
  notestTypo: {
    fontSize: "28px !important",
    fontWeight: "bold !important",
    marginBottom: "20px !important",
  },
});
export const examWindowTeacherStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "left",
    height: "100vh",
    backgroundColor: "#f5f0e1",
    overflow: "auto",
  },
  box: {
    padding: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  heading1: {
    fontSize: "28px !important",
    padding: "10px !important",
    fontWeight: "bold !important",
    textAlign: "center !important",
  },
  heading2: {
    fontSize: "20px !important",
    fontWeight: "bold !important",
    padding: "10px !important",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px !important",
    fontSize: "16px !important",
    "& span": {
      fontSize: "16px !important",
      fontWeight: "bold",
    },
  },
  instructionsBox: {
    marginTop: "10px",
    padding: "10px",
    height: "400px",
    overflow: "auto",
  },
  typo: {
    marginBottom: "10px !important",
  },
  chatBox: {
    marginTop: "10px !important",
  },
  outerBox: {
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
    padding: "10px",
  },
  questionList: {
    height: "400px",
    overflow: "auto",
    padding: "10px",
  },
});

export const questionStyles = makeStyles({
  btn: {
    marginTop: "10px !important",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "right",
  },
  noQuestion: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
  },
  accordion: {
    margin: "5px",
    boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%) !important",
  },
  summary: {
    backgroundColor: "#f5f0e1 !important",
  },
  typo: {
    padding: "5px",
    fontWeight: "bold",
  },
  paragraph: {
    padding: "5px",
    "& span": {
      fontWeight: "bold",
    },
  },
});
