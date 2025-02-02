import { useEffect, useState } from "react";
import useIndexedDB from "../hooks/useIndexedDB";
import { getTasks } from "../libs/indexDB";
import { TaskStatusTypes, TaskTypes } from "../types/TaskTypes";
import TaskItem from "./TaskItem";

type TaskListTypes = {
  filterTypes: TaskStatusTypes | "all";
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskList({ filterTypes, rerender, setRerender }: TaskListTypes) {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);
  const db = useIndexedDB();

  useEffect(() => {
    if (db) {
      getTasks(db, filterTypes).then(setTasks).catch(console.error);
    }

    setRerender(false);
  }, [db, filterTypes, rerender]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 5,
        width: "100vh",
        marginTop: 10,
      }}
    >
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} setRerender={setRerender} />
      ))}
    </div>
  );
}
