import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActingProfile,
  selectAllUsers,
} from "../../store/slices/profileSlice";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../../interfaces/Task";
import { addNewTask, updateTask } from "../../store/slices/tasksSlice";
import { User } from "../../interfaces/User";

type FormFields = {
  taskTitle: string;
  status: TaskStatus;
  associatedUser: string;
};
export const NewTask = ({
  handleClose,
  data,
}: {
  handleClose: () => void;
  data?: Task;
}) => {
  const dispatch = useDispatch();
  const actingProfile: User = useSelector(selectActingProfile);
  const allUsers = useSelector(selectAllUsers);
  const [formFields, setFormFields] = useState<FormFields>({
    taskTitle: "",
    status: "Due",
    associatedUser: actingProfile.email,
  });

  useEffect(() => {
    if (data) {
      setFormFields({
        taskTitle: data.title,
        associatedUser: data.userAssociated,
        status: data.status,
      });
    } else {
      if (actingProfile.userType === "Regular") {
        setFormFields({
          ...formFields,
          associatedUser: actingProfile.email,
        });
      } else {
        setFormFields({
          ...formFields,
          associatedUser: "",
        });
      }
    }
  }, [actingProfile.userType, data]);

  const handleChange = (key: keyof FormFields, value: string) => {
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const validateForm = () => {
    return Boolean(
      formFields.taskTitle.trim() &&
        formFields.status &&
        formFields.associatedUser
    );
  };

  const handleSave = () => {
    dispatch(
      addNewTask({
        status: formFields.status,
        title: formFields.taskTitle,
        userAssociated: formFields.associatedUser,
      })
    );
    handleClose();
  };

  const handleUpdate = () => {
    if (data)
      dispatch(
        updateTask({
          id: data?.id,
          status: formFields.status,
          title: formFields.taskTitle,
          userAssociated: formFields.associatedUser,
        })
      );
    handleClose();
  };
  return (
    <Box
      style={{
        minWidth: "500px",
        background: "white",
        position: "absolute",
        padding: "30px",
        borderRadius: "10px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Button
        onClick={handleClose}
        style={{ position: "absolute", top: "20px", right: "20px " }}
      >
        Close
      </Button>
      <h2>{data ? "Update Task" : "Add New Task"}</h2>
      <Box>
        <TextField
          sx={{ width: "100%" }}
          label="Task Title"
          type="type"
          variant="standard"
          value={formFields.taskTitle}
          onChange={(e) => {
            handleChange("taskTitle", e.target.value);
          }}
        />
      </Box>
      <Box mt={3}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            value={formFields.status}
            label="Status"
            onChange={(e) => {
              handleChange("status", String(e.target.value ?? ""));
            }}
          >
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Due">Due</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {actingProfile.userType === "Admin" && (
        <Box mt={3}>
          <FormControl fullWidth>
            <InputLabel id="status">Users</InputLabel>
            <Select
              labelId="status"
              label="Status"
              value={formFields.associatedUser}
              onChange={(e) => {
                handleChange("associatedUser", String(e.target.value ?? ""));
              }}
            >
              {allUsers.map((value) => (
                <MenuItem key={value.email} value={value.email}>
                  {value.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: "10px", marginTop: "30px" }}>
        {data ? (
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!validateForm()}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!validateForm()}
          >
            Save
          </Button>
        )}
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
