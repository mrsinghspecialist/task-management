import { lazy } from "react";
import { UserType } from "../interfaces/User";

const LoginPage = lazy(() => import("../components/Login/Login"));
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const Unauthorized = lazy(
  () => import("../components/Unauthorized/Unauthorized")
);

export type RouteConfig = {
  name: string;
  path: string;
  secure: boolean;
  component: React.FC;
  authorizedUsers: UserType[];
};

export const AppRoutes: RouteConfig[] = [
  {
    name: "",
    path: "/",
    secure: true,
    authorizedUsers: ["Admin", "Regular"],
    component: Dashboard,
  },
  {
    name: "",
    path: "/login",
    secure: true,
    authorizedUsers: ["Admin", "Regular"],
    component: LoginPage,
  },
  {
    name: "",
    path: "*",
    secure: true,
    authorizedUsers: [],
    component: Unauthorized,
  },
];
