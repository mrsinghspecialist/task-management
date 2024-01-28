import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerProfile,
  selectAllUsers,
} from "../../store/slices/profileSlice";

type FormFields = {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
};

export const RegistrationForm = (props: { handleClose: () => void }) => {
  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<FormFields>({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
  });
  const handleRegister = () => {
    const existingUser = allUsers.find(
      (value) => value.email === formFields.email
    );
    if (existingUser) {
      alert("User already exists");
    } else {
      dispatch(
        registerProfile({
          email: formFields.email,
          name: formFields.name,
          password: formFields.password,
          userType: "Regular",
        })
      );
      alert("User has been registered successfully.");
      props.handleClose();
    }
  };

  const validateForm = () => {
    return Boolean(
      formFields.name &&
        formFields.email &&
        formFields.confirmEmail &&
        formFields.password &&
        formFields.email === formFields.confirmEmail
    );
  };

  const handleChange = (key: keyof FormFields, value: string) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

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
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Email"
                type="email"
                variant="standard"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Confirm email"
                type="email"
                variant="standard"
                onChange={(e) => handleChange("confirmEmail", e.target.value)}
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Password"
                type="password"
                variant="standard"
                onChange={(e) => handleChange("password", e.target.value)}
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
                disabled={!validateForm()}
                onClick={handleRegister}
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
