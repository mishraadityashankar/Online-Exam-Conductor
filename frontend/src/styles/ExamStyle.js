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
    fontSize: "28px",
    marginBottom: "10px",
    padding: "5px",
    fontWeight: "bold",
    textAlign: "center",
  },
  heading2: {
    fontSize: "24px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
    fontSize: "16px",
    "& span": {
      fontSize: "16px",
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
    marginBottom: "10px",
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
    fontSize: "18px",
    marginBottom: "20px",
  },
  typo: {
    marginBottom: "20px",
  },
  notest: {
    display: "flex",
    height: "60vh",
    justifyContent: "center",
    alignItems: "center",
  },
  notestTypo: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
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
    fontSize: "28px",
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  heading2: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "10px",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
    fontSize: "16px",
    "& span": {
      fontSize: "16px",
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
    marginBottom: "10px",
  },
  chatBox: {
    marginTop: "10px",
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
    marginTop: "10px",
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
    boxShadow: "0 4px 4px 0 rgb(0 0 0 / 20%)",
  },
  summary: {
    backgroundColor: "#f5f0e1",
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
