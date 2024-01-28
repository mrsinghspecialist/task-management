import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveProfile } from "../../store/slices/profileSlice";
import { useState } from "react";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

const Login = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div
        style={{
          height: "90vh",
          background: "whitesmoke",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Card sx={{ width: "500px", paddingX: "20px" }}>
          <CardContent>
            <h2>Login</h2>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  type="text"
                  variant="standard"
                />
              </div>
              <Box>
                <TextField
                  sx={{ width: "100%" }}
                  label="Password"
                  type="password"
                  variant="standard"
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
                  onClick={() => {
                    dispatch(
                      setActiveProfile({
                        email: "mrsinghspecialist@gmail.com",
                        name: "Sarabjeet Singh",
                        password: "Agbdlcid",
                        userType: "Regular",
                      })
                    );
                  }}
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
