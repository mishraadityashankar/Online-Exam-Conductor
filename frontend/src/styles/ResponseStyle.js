import { makeStyles } from "@mui/styles";
export const studentResultStyles = makeStyles({
  root: {
    overflow: "auto",
    padding: "20px",
    height: "100vh",
    backgroundColor: "#f5f0e1",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
    padding: "10px",
  },
  table: {
    height: "500px",
    overflow: "auto",
  },
  typo: {
    padding: "10px",
    textAlign: "left",
    fontSize: "18px",
    "& span": {
      fontWeight: "bold",
    },
  },
});

export const responseListStyles = makeStyles({
  root: {
    overflow: "auto",
    padding: "20px",
    height: "100vh",
    backgroundColor: "#f5f0e1",
    display: "flex",
    justifyContent: "center",
  },
  table: {
    height: "500px",
    width: "950px",
    overflow: "auto",
  },
});

export const resultHistoryStyles = makeStyles({
  root: {
    padding: "20px",
    backgroundColor: "#f5f0e1",
    height: "100vh",
    overflow: "auto",
  },
  box: {
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
  },
  head: {
    fontSize: "26px !important",
    fontWeight: "bold !important",
    marginBottom: "10px !important",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  formElement: {
    margin: "2px !important",
    padding: "5px !important",

    "& span": {
      fontWeight: "bold !important",
    },
  },
  flexBox2: {
    height: "400px",
    overflow: "auto",
    padding: "10px",
  },
});
