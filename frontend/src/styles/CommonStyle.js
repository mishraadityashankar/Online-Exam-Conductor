import { makeStyles } from "@mui/styles";
export const commonStyles = makeStyles({
  root: {
    backgroundColor: "#f5f0e1",
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
    backgroundColor: "#f5f0e1",
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
    backgroundColor: "#F8F8F8",
  },
  typo1: {
    padding: "5px",
    fontWeight: "bold",
    fontSize: "18px",
  },

  typo2: {
    textAlign: "right",
    padding: "5px",
    fontWeight: "bold",
  },
  typo3: {
    padding: "10px",
  },
  flexBox1: {
    display: "flex",
    justifyContent: "space-between",
  },
  err: {
    color: "red",
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
    fontSize: "24px",
    fontWeight: "bold",
  },
  totalMarks: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subject: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  err2: {
    color: "red",
    marginTop: "20px",
  },
  buttonGrid: {
    marginTop: "20px",
  },
});

export const chatWindowStyles = makeStyles({
  root: {
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  chatBox: {
    height: "270px",
    overflow: "auto",
  },
  msgBox: {
    padding: "10px",
    margin: "5px",
    backgroundColor: "#F5F5F5",
  },
  typo1: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  typo2: {
    fontSize: "16px",
  },
});

export const homeStyle = makeStyles({
  root: {
    backgroundColor: "#1e3d59",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  box: {
    height: "80%",
    overflow: "auto",
    width: "40%",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: "25px",
  },
  head: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  para: {
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
  btn: {
    padding: "5px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  typo: {
    padding: "10px",
    textAlign: "center",
  },
  link: {
    cursor: "pointer",
    textDecoration: "underline",
    color: "blue",
  },
});

export const registerStyle = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "#1e3d59",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    height: "100vh",
  },
  card: {
    width: "60%",
    padding: "10px",
    height: "85%",
    overflow: "auto",
    alignContent: "left",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  btn: {
    width: "50%",
    marginTop: "20px",
  },
  head: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  err: {
    color: "red",
  },
  box: {
    marginTop: "40px",
  },
});
export const navbarStyle = makeStyles({
  root: {
    padding: "10px",
    backgroundColor: "#1e3d59",
    color: "white",
    cursor: "pointer",
  },
  navHead: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  navItem: {
    "&:hover": {
      fontWeight: "bold",
    },
  },
  headBox: {
    width: "350px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  outerBox: {
    width: "70%",
    height: "300px",
    overflow: "auto",
  },
  head: {
    padding: "10px",
    marginBottom: "20px",
  },
  typo: {
    padding: "5px",
    "& span": {
      fontWeight: "bold",
    },
  },
  btnGrp: {
    width: "80%",
    marginTop: "10px",
  },
});

export const editProfileStyle = makeStyles({
  root: {
    overflow: "auto",
    padding: "20px",
    height: "100vh",
    backgroundColor: "#f5f0e1",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    padding: "20px",
    height: "60%",
    overflow: "auto",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    padding: "10px",
  },
  head1: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  typo1: {
    fontSize: "18px",
    padding: "5px",
  },
});
