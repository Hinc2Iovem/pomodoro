import { useState } from "react";
import useIndexedDB from "../../hooks/useIndexedDB";
import { updateTask } from "../../libs/indexDB";
import { TaskTypes } from "../../types/TaskTypes";
import { AffirmativeButton } from "../ui/Button";
import { Input } from "../ui/Input";

type TaskItemEditFormTypes = {
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskTypes;
};

export default function TaskItemEditForm({ setRerender, setIsEditing, task }: TaskItemEditFormTypes) {
  const db = useIndexedDB();

  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDeadline, setNewDeadline] = useState(task.deadline);

  const update = () => {
    updateTask(db, {
      id: task.id,
      name: newName,
      description: newDescription,
      deadline: newDeadline,
      status: task.status,
      secondsLeft: task.secondsLeft || 25 * 60,
    });
    setRerender(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db && !newName.trim().length && !newDeadline.trim().length && !newDeadline.trim().length) {
      console.log("имя, описание и дедлайн обязательны");
      return;
    }

    console.log("here: ", newName);
    console.log("here: ", newDescription);
    console.log("here: ", newDeadline);
    update();
    setIsEditing(false);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 5 }} onSubmit={handleSaveEdit}>
      <Input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
      <Input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      <Input type="datetime-local" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
      <AffirmativeButton onClick={handleSaveEdit}>Save</AffirmativeButton>
    </form>
  );
}
