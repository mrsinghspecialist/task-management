import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      fontSize: "x-large",
      minHeight: "50px",
      height: "6vh",
      width: "100%",
    },
    logo: {
      color: "white",
      position: "absolute",
      left: "45%",
      alignSelf: "center",
    },
    avatar: {
      paddingRight: "20px",
      display: "flex",
      flexDirection: "row",
      gap: "10px",
    },
  })
);
export default useStyles;
