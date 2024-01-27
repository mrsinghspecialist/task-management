import React from "react";
import useStyles from "./Footer.styles";

export const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>Task Management Pvt. Ltd. &copy; 2024</div>
  );
};
