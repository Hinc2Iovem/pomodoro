import { useState } from "react";
import useIndexedDB from "../hooks/useIndexedDB";
import { deleteTask, updateTask } from "../libs/indexDB";
import { TaskStatusTypes, TaskTypes } from "../types/TaskTypes";
import { formatDate } from "../utils/formatDate";
import { AffirmativeButton, Button, DangerButton, EditButton } from "./ui/Button";
import { Input } from "./ui/Input";

type TaskItemTypes = {
  task: TaskTypes;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskItem({ task, setRerender }: TaskItemTypes) {
  const db = useIndexedDB();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newDeadline, setNewDeadline] = useState(task.deadline);

  const update = (status?: TaskStatusTypes) => {
    updateTask(db, {
      id: task.id,
      name: newName,
      description: newDescription,
      deadline: newDeadline,
      status: status?.trim().length ? status : task.status,
    });
    setRerender(true);
  };

  const handleSaveEdit = () => {
    if (!db && !newName.trim().length && !newDeadline.trim().length && !newDeadline.trim().length) {
      console.log("имя, описание и дедлайн обязательны");
      return;
    }

    update();
    setIsEditing(false);
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(27, 25, 25)",
        borderRadius: 10,
        padding: 10,
      }}
    >
      {isEditing ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
          <Input type="datetime-local" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
          <AffirmativeButton onClick={handleSaveEdit}>Save</AffirmativeButton>
        </form>
      ) : (
        <>
          <h3>{task.name}</h3>
          <p
            style={{
              opacity: 0.8,
            }}
          >
            {task.description}
          </p>
          <p
            style={{
              opacity: 0.7,
            }}
          >
            {formatDate(task.deadline)}
          </p>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {!isEditing ? (
          <>
            <Button
              style={{
                width: isEditing ? "auto" : "100%",
              }}
              onClick={() => update(task.status === "doing" ? "done" : "doing")}
            >
              {task.status === "doing" ? "Завершить" : "Возобновить"}
            </Button>
            <div
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <DangerButton
                style={{
                  width: "50%",
                }}
                onClick={() => {
                  deleteTask(db, task.id);
                  setRerender(true);
                }}
              >
                Удалить
              </DangerButton>
              <EditButton
                style={{
                  width: "50%",
                }}
                onClick={() => setIsEditing(true)}
              >
                Изменить
              </EditButton>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
