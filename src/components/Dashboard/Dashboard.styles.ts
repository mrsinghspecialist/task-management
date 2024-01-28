import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dashboardContainer: {
      padding: "40px",
      width: "100%",
    },
    heading: {
      float: "left",
      marginBottom: "15px",
    },
    floatRight: {
      float: "right",
    },
    tableContainer: {
      width: "100%",
    },
  })
);
export default useStyles;
