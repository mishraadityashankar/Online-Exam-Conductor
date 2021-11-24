import { makeStyles } from "@mui/styles";
export const commonStyles = makeStyles({
  root: {
    backgroundColor: "#f5f0e1",
    display: "flex",
    justifyContent: "space-between",
    height: "100vh",
    padding: "20px",
    overflow: "auto",
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
    marginleft: "10px !important",
    marginTop: "10px !important",
    marginRight: "10px !important",
  },
  paragraph: {
    padding: "5px !important",
    "& span": {
      color: "black !important",
      fontSize: "18px !important",
      fontWeight: "bold !important",
    },
  },
  headingLeft: {
    fontSize: "28px !important",
    fontWeight: "bold !important",
    textAlign: "left",
    marginLeft: "5px !important",
    marginRight: "5px !important",
    marginBottom: "10px !important",
  },
  subHeadingCenter: {
    fontSize: "24px !important",
    fontWeight: "bold !important",
    textAlign: "center",
    margin: "5px !important",
  },
  normalParaRight: {
    fontSize: "18px !important",
    textAlign: "right !important",
    margin: "5px !important",
  },
  err: {
    padding: "2px !important",
    textAlign: "center !important",
    color: "red !important",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "bold",
    height: "60vh",
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
    fontSize: "16px !important",
    fontWeight: "bold !important",
  },
  typo2: {
    fontSize: "16px !important",
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
    padding: "20px",
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
    textAlign: "center",
    margin: "5px",
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
    padding: "10px !important",
    marginBottom: "20px !important",
    fontWeight: "bold !important",
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
    height: "65%",
    overflow: "auto",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  formElement: {
    padding: "10px !important",
  },
  head1: {
    fontSize: "32px !important",
    fontWeight: "bold !important",
    marginBottom: "20px !important",
  },
  typo1: {
    fontSize: "18px !important",
    padding: "5px !important",
  },
});
