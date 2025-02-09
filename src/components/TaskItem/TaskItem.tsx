import { useState } from "react";
import { TaskTypes } from "../../types/TaskTypes";
import { formatDate } from "../../utils/formatDate";
import PomodoroTimer from "../PomodoroTimer";
import TaskItemActionButtons from "./TaskItemActionButtons";
import TaskItemEditForm from "./TaskItemEditForm";

type TaskItemTypes = {
  task: TaskTypes;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskItem({ task, setRerender }: TaskItemTypes) {
  const [isEditing, setIsEditing] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);

  return (
    <div style={{ backgroundColor: "rgb(27, 25, 25)", borderRadius: 10, padding: 10 }}>
      {isEditing ? (
        <TaskItemEditForm setRerender={setRerender} setIsEditing={setIsEditing} task={task} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>{task.name}</h3>
            <PomodoroTimer
              task={task}
              setStopTimer={setStopTimer}
              status={task.status}
              stopTimer={stopTimer}
              secondsLeft={task.secondsLeft}
            />
          </div>
          <p style={{ opacity: 0.8 }}>{task.description}</p>
          <p style={{ opacity: 0.7 }}>{formatDate(task.deadline)}</p>
        </div>
      )}
      <TaskItemActionButtons
        setStopTimer={setStopTimer}
        stopTimer={stopTimer}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setRerender={setRerender}
        task={task}
      />
    </div>
  );
}
