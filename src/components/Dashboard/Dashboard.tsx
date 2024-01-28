import { useDispatch, useSelector } from "react-redux";
import { selectActingProfile } from "../../store/slices/profileSlice";
import { Navigate } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { useEffect, useState } from "react";
import { Task } from "../../interfaces/Task";
import { Box, Button, Modal } from "@mui/material";
import { CustomizedDialogBox } from "../../features/CustomizedDialogBox/CustomizedDialogBox";
import { deleteTask, selectAllTasks } from "../../store/slices/tasksSlice";
import { NewTask } from "../NewTask/NewTask";

const Dashboard = () => {
  const actingProfile = useSelector(selectActingProfile);
  const tasksList = useSelector(selectAllTasks);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (actingProfile.userType !== "Admin") {
      setTasks(
        tasksList.filter(
          (value) => value.userAssociated === actingProfile.email
        )
      );
    } else {
      setTasks(tasksList);
    }
  }, [actingProfile, tasksList]);

  if (actingProfile.email === "") {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      style={{
        padding: "40px",
        width: "100%",
      }}
    >
      <h2 style={{ float: "left", marginBottom: "15px" }}>Dashboard</h2>
      <Button
        variant="contained"
        style={{ float: "right" }}
        onClick={() => setOpenNewTaskModal(true)}
      >
        Add New
      </Button>
      <div
        style={{
          width: "100%",
        }}
      >
        <DataTable
          sortDataBy="status"
          columns={
            actingProfile.userType === "Regular"
              ? [
                  {
                    title: "Title",
                    field: "title",
                  },
                  {
                    title: "Status",
                    field: "status",
                    sortable: true,
                  },
                  {
                    title: "",
                    field: "id",
                    render(row) {
                      return (
                        <>
                          <Box>
                            <Button
                              variant="contained"
                              style={{ marginRight: "20px" }}
                              onClick={() => {
                                setSelectedTask(row);
                                setOpenNewTaskModal(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSelectedTask(row);
                                setOpenModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </>
                      );
                    },
                  },
                ]
              : [
                  {
                    title: "Title",
                    field: "title",
                  },
                  {
                    title: "Status",
                    field: "status",
                    sortable: true,
                  },
                  {
                    title: "Users",
                    field: "userAssociated",
                  },
                  {
                    title: "",
                    field: "id",
                    render(row) {
                      return (
                        <>
                          <Box>
                            <Button
                              variant="contained"
                              style={{ marginRight: "20px" }}
                              onClick={() => {
                                setSelectedTask(row);
                                setOpenNewTaskModal(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSelectedTask(row);
                                setOpenModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </>
                      );
                    },
                  },
                ]
          }
          data={tasks}
        />
      </div>
      <CustomizedDialogBox
        openDialogBox={openModal}
        handleClose={() => setOpenModal(false)}
        dialogContent={"Are you sure ?"}
        buttons={[
          {
            title: "OK",
            variant: "contained",
            action() {
              if (selectedTask) dispatch(deleteTask(selectedTask?.id));
              setOpenModal(false);
              setSelectedTask(undefined);
            },
          },
          {
            title: "Cancel",
            variant: "outlined",
            action() {
              setSelectedTask(undefined);
              setOpenModal(false);
            },
          },
        ]}
      />
      <Modal open={openNewTaskModal}>
        <NewTask
          data={selectedTask}
          handleClose={() => {
            setOpenNewTaskModal(false);
            setSelectedTask(undefined);
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
