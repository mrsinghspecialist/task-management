// import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ReactNode } from "react";

import error from "../../assets/icons/error.svg";
import useStyles from "./CustomizedDialogBox.styles";

export type CustomizedDialogButtons = {
  title: string;
  action: () => void;
  variant: "contained" | "outlined";
  loading?: boolean;
  disabled?: boolean;
};

export const CustomizedDialogBox = (props: {
  openDialogBox: boolean;
  handleClose: () => void;
  dialogContent: string | ReactNode;
  buttons: CustomizedDialogButtons[];
  dialogTitle?: string;
  showCloseIcon?: boolean;
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.openDialogBox}
      onClose={props.handleClose}
      fullWidth
      scroll="paper"
    >
      <DialogTitle className={classes.dialogTitle}>
        <Box className={classes.dialogTitleBox}>
          <img src={error} width={32} height={32} />
          {props.dialogTitle ? props.dialogTitle : "Confirmation"}
        </Box>
        {props.showCloseIcon ? (
          <IconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
            Close
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {props.dialogContent}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {props.buttons.map((value, index) => (
          <Button
            key={index}
            disabled={value.disabled ?? false}
            variant={value.variant}
            size="medium"
            color="primary"
            onClick={value.action}
            sx={{ textTransform: "none" }}
          >
            {value.title}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
