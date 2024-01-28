import React from "react";
import { useSelector } from "react-redux";
import { selectActingProfile } from "../../store/slices/profileSlice";
import {
  IndexRouteProps,
  LayoutRouteProps,
  Navigate,
  PathRouteProps,
  Route,
  RouteProps,
} from "react-router-dom";
import { UserType } from "../../interfaces/User";

interface SecureRouteProps extends PathRouteProps {
  name: string;
  path: string;
  component: React.FC;
  authorizedUsers: UserType[];
}

export const SecureRoute = ({
  name,
  path,
  component,
  authorizedUsers,
  ...props
}: SecureRouteProps) => {
  const allUsers = [];
  const actingProfile = useSelector(selectActingProfile);

  if (actingProfile.email === "") {
    return <Navigate to={"/login"}></Navigate>;
  }
  return <Route {...props} path={path} Component={component}></Route>;
};
