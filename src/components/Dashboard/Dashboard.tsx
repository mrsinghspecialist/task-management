import { useSelector } from "react-redux";
import { selectActingProfile } from "../../store/slices/profileSlice";
import { Navigate, redirect } from "react-router-dom";

const Dashboard = () => {
  const actingProfile = useSelector(selectActingProfile);
  if (actingProfile.email === "") {
    return <Navigate to={"/login"} />;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
