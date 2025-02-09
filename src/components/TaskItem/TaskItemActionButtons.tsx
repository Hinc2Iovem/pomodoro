import useIndexedDB from "../../hooks/useIndexedDB";
import { deleteTask, updateTask } from "../../libs/indexDB";
import { TaskStatusTypes, TaskTypes } from "../../types/TaskTypes";
import { Button, DangerButton, EditButton } from "../ui/Button";

type TaskItemActionButtonsTypes = {
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setStopTimer: React.Dispatch<React.SetStateAction<boolean>>;
  task: TaskTypes;
  isEditing: boolean;
  stopTimer: boolean;
};

export default function TaskItemActionButtons({
  setIsEditing,
  setRerender,
  setStopTimer,
  task,
  isEditing,
  stopTimer,
}: TaskItemActionButtonsTypes) {
  const db = useIndexedDB();
  const update = (status?: TaskStatusTypes) => {
    updateTask(db, {
      id: task.id,
      name: task.name,
      description: task.description,
      deadline: task.deadline,
      status: status?.trim().length ? status : task.status,
      secondsLeft: 25 * 60,
    });
    setRerender(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {!isEditing ? (
        <>
          <div
            style={{
              display: "flex",
              width: isEditing ? "auto" : "100%",
              gap: 5,
            }}
          >
            <Button
              style={{ flexGrow: 1 }}
              onClick={() => {
                if (task.status === "done") {
                  setStopTimer(false);
                }
                update(task.status === "doing" ? "done" : "doing");
              }}
            >
              {task.status === "doing" ? "Завершить" : "Начать"}
            </Button>

            <Button
              style={{ display: task.status === "doing" ? "block" : "none", flexGrow: 1 }}
              onClick={() => setStopTimer((prev) => !prev)}
            >
              {stopTimer ? "Возобновить" : "Пауза"}
            </Button>
          </div>
          <div style={{ display: task.status === "doing" ? "none" : "flex", gap: 5 }}>
            <DangerButton
              style={{ width: "50%" }}
              onClick={() => {
                deleteTask(db, task.id);
                setRerender(true);
              }}
            >
              Удалить
            </DangerButton>
            <EditButton style={{ width: "50%" }} onClick={() => setIsEditing(true)}>
              Изменить
            </EditButton>
          </div>
        </>
      ) : null}
    </div>
  );
}
