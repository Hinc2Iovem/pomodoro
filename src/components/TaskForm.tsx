import { useState } from "react";
import { AffirmativeButton } from "./ui/Button";
import { Input } from "./ui/Input";
import useIndexedDB from "../hooks/useIndexedDB";
import { addTask } from "../libs/indexDB";

type TaskFormTypes = {
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskForm({ setRerender }: TaskFormTypes) {
  const db = useIndexedDB();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim().length || !taskDescription.trim().length || !deadline.trim().length) {
      console.log("fill all the fields, dude");
      return;
    }
    addTask(db, {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: "done",
      deadline,
      secondsLeft: 25 * 60,
    });
    setTaskName("");
    setTaskDescription("");
    setDeadline("");
    setRerender(true);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        borderWidth: 1,
        border: "solid rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        padding: 5,
        width: "100%",
      }}
      onSubmit={handleSubmit}
    >
      <Input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Название" />
      <Input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Описание"
      />
      <Input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="Set a deadline"
      />
      <AffirmativeButton>Add Task</AffirmativeButton>
    </form>
  );
}
