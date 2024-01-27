import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import React from "react";

export const RegistrationForm = (props: { handleClose: () => void }) => {
  return (
    <div
      style={{
        background: "whitesmoke",
        display: "flex",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "50px",
      }}
    >
      <Card
        sx={{
          width: "500px",
          paddingX: "20px",
          paddingY: "10px",
        }}
      >
        <Button
          sx={{ position: "absolute", top: "15px", right: "20px" }}
          onClick={props.handleClose}
        >
          X
        </Button>
        <CardContent>
          <h2>Registration Form</h2>
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
                label="Name"
                type="text"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                type="text"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Confirm email"
                type="text"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Password"
                type="password"
                variant="standard"
              />
            </div>
            <div
              style={{
                marginTop: 8,
                alignSelf: "self-start",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  //   dispatch(
                  //     setActiveProfile({
                  //       email: "mrsinghspecialist@gmail.com",
                  //       name: "Sarabjeet Singh",
                  //       password: "Agbdlcid",
                  //       userType: "Regular",
                  //     })
                  //   );
                }}
              >
                Register
              </Button>
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
