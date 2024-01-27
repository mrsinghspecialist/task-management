import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      fontSize: "x-large",
      minHeight: "50px",
      height: "6vh",
      justifyContent: "space-between",
      width: "100%",
    },
    logo: {
      color: "white",
    },
    avatar: {
      paddingRight: "20px",
    },
  })
);
export default useStyles;
