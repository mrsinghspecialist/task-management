import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";

export const Login = () => {
  return (
    <div
      style={{
        height: "100%",
        background: "red",
        display: "flex",
      }}
    >
      <Card>
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
              <TextField label="Email" type="text" variant="standard" />
            </div>
            <div>
              <TextField label="Password" type="password" variant="standard" />
            </div>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Login</Button>
        </CardActions>
      </Card>
    </div>
  );
};
