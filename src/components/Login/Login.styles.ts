import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "90vh",
      background: "whitesmoke",
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
    },
    cardContainer: {
      width: "500px",
      paddingX: "20px",
    },
    formControl: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  })
);
export default useStyles;
