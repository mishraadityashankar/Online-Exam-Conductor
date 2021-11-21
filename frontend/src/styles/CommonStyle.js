import { makeStyles } from "@mui/styles";
export const commonStyles = makeStyles({
  root: {
    backgroundColor: "#F5F5F5",
    display: "flex",
    justifyContent: "space-between",
    height: "90vh",
    padding: "20px",
  },
  card: {
    width: "45%",
    padding: "10px",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "10px",
  },
  btn: {
    marginleft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  },
  paragraph: {
    padding: "5px",
    "& span": {
      color: "black",
      fontSize: "18px",
      fontWeight: "bold",
    },
  },
  headingLeft: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "10px",
  },
  subHeadingCenter: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "5px",
  },
  normalParaRight: {
    fontSize: "18px",
    textAlign: "right",
    margin: "5px",
  },
  err: {
    padding: "2px",
    textAlign: "center",
    color: "red",
  },
});

export const createExamStyles = makeStyles({
  root: {
    backgroundColor: "#F5F5F5",
    height: "100vh",
    padding: "20px",
    overflow: "auto",
  },
  gridOuter: {
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  questionList: {
    height: "400px",
    overflow: "auto",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "10px",
  },
  btn: {
    marginleft: "10px",
    marginTop: "10px",
    marginRight: "10px",
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
