export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  userAssociated: string;
};

export type TaskStatus = "Completed" | "Due";
