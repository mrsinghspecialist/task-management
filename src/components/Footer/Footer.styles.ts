import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      minHeight: "30px",
      height: "4vh",
      fontSize: "large",
      justifyContent: "center",
      textAlign: "center",
      background: "#282c34",
      color: "white",
    },
  })
);
export default useStyles;
