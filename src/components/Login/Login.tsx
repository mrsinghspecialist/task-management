import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActingProfile,
  selectAllUsers,
  setActiveProfile,
} from "../../store/slices/profileSlice";
import { useState } from "react";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { Navigate } from "react-router";
import useStyles from "./Login.styles";

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const allUsers = useSelector(selectAllUsers);
  const actingProfile = useSelector(selectActingProfile);

  const [formFields, setFormFields] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

  if (actingProfile.email && actingProfile.userType) {
    return <Navigate to={"/"} />;
  }

  const handleLogin = () => {
    const user = allUsers.find(
      (value) =>
        value.email === formFields?.email &&
        value.password === formFields.password
    );
    if (user) {
      dispatch(setActiveProfile(user));
    } else {
      alert("Please check the details.");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className={classes.container}>
        <Card className={classes.cardContainer}>
          <CardContent>
            <h2>Login</h2>
            <Box className={classes.formControl}>
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={(e) => {
                    setFormFields({ ...formFields, email: e.target.value });
                  }}
                />
              </div>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Password"
                  type="password"
                  variant="standard"
                  onChange={(e) => {
                    setFormFields({ ...formFields, password: e.target.value });
                  }}
                />
              </Box>
              <div
                style={{
                  marginTop: 5,
                  alignSelf: "self-start",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  disabled={!Boolean(formFields?.email && formFields.password)}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </Box>
            <Box mt={2}>
              Don't have an account ?{" "}
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setOpenModal(true)}
              >
                Register now !!
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
      <Modal open={openModal}>
        <RegistrationForm handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default Login;
