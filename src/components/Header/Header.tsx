import React from "react";
import useStyles from "./Header.styles";
import { Avatar } from "@mui/material";

export const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div></div>
      <div className={classes.logo}>Task Management</div>
      <div className={classes.avatar}>
        <Avatar>SS</Avatar>
      </div>
    </div>
  );
};
