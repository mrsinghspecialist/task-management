import { useDispatch, useSelector } from "react-redux";
import { selectActingProfile } from "../../store/slices/profileSlice";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Task } from "../../interfaces/Task";
import { Box, Button, Modal } from "@mui/material";
import { CustomizedDialogBox } from "../../features/CustomizedDialogBox/CustomizedDialogBox";
import { deleteTask, selectAllTasks } from "../../store/slices/tasksSlice";
import { NewTask } from "../NewTask/NewTask";
import { DataGrid } from "@mui/x-data-grid";
import useStyles from "./Dashboard.styles";
import React from "react";

const Dashboard = () => {
  const actingProfile = useSelector(selectActingProfile);
  const tasksList = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const classes = useStyles();
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
    <div className={classes.dashboardContainer}>
      <h2 className={classes.heading}>Dashboard</h2>
      <Button
        variant="contained"
        className={classes.floatRight}
        onClick={() => setOpenNewTaskModal(true)}
      >
        Add New
      </Button>
      <div className={classes.tableContainer}>
        <br />
        <div style={{ marginTop: "60px" }}>
          <DataGrid
            rows={tasks}
            className={classes.dataGrid}
            rowSelection={false}
            columns={
              actingProfile.userType === "Regular"
                ? [
                    {
                      headerName: "Title",
                      field: "title",
                      width: 600,
                      align: "center",
                      headerAlign: "center",
                    },
                    {
                      headerName: "Status",
                      field: "status",
                      width: 500,
                      sortable: true,
                      align: "center",
                      headerAlign: "center",
                    },
                    {
                      headerName: "",
                      field: "id",
                      width: 500,
                      align: "center",
                      renderCell(params) {
                        return (
                          <>
                            <Box>
                              <Button
                                variant="contained"
                                style={{ marginRight: "20px" }}
                                onClick={() => {
                                  setSelectedTask(params.row);
                                  setOpenNewTaskModal(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setSelectedTask(params.row);
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
                      headerName: "Title",
                      field: "title",
                      width: 400,
                      align: "center",
                      headerAlign: "center",
                    },
                    {
                      headerName: "Status",
                      field: "status",
                      width: 300,
                      sortable: true,
                      align: "center",
                      headerAlign: "center",
                    },
                    {
                      headerName: "Users",
                      field: "userAssociated",
                      width: 500,
                      sortable: true,
                      align: "center",
                      headerAlign: "center",
                    },
                    {
                      headerName: "",
                      field: "id",
                      width: 500,
                      align: "center",
                      renderCell(params) {
                        return (
                          <>
                            <Box>
                              <Button
                                variant="contained"
                                style={{ marginRight: "20px" }}
                                onClick={() => {
                                  setSelectedTask(params.row);
                                  setOpenNewTaskModal(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  setSelectedTask(params.row);
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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
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
