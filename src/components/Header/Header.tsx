import { useMemo } from "react";
import useStyles from "./Header.styles";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectActingProfile } from "../../store/slices/profileSlice";
import { getShortName } from "../../utils/utils";

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actingProfile = useSelector(selectActingProfile);
  const shortName = useMemo(
    () => getShortName(actingProfile.name),
    [actingProfile.name]
  );

  return (
    <div className={classes.container}>
      <div></div>
      <div className={classes.logo}>Task Management</div>
      <div className={classes.avatar}>
        {actingProfile.email && (
          <>
            <Avatar>{shortName}</Avatar>
            <Button onClick={() => dispatch(logout())}>Logout</Button>
          </>
        )}
      </div>
    </div>
  );
};
