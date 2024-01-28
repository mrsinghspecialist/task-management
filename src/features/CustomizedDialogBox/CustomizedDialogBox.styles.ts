import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() =>
  createStyles({
    dialogTitleBox: {
      flexDirection: "row",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    dialogTitle: {
      backgroundColor: "#0F1929",
      color: "white",
      marginBottom: "24px",
    },
    dialogContent: {
      backgroundColor: "white",
      color: "#263238",
      fontWeight: "400",
      marginTop: "10px",
    },
    dialogActions: {
      padding: "24px",
      gap: "12px",
    },
  })
);
export default useStyles;
