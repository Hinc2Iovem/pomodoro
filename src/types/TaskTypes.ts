export type TaskStatusTypes = "done" | "doing";
export type TaskStatusRusTypes = "Закончен" | "В процессе";

export type TaskTypes = {
  id: number;
  status: TaskStatusTypes;
  name: string;
  description: string;
  deadline: string;
  secondsLeft: number;
};
