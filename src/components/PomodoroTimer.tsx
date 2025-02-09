import { useEffect, useState } from "react";
import useIndexedDB from "../hooks/useIndexedDB";
import { updateTaskSecondsLeft } from "../libs/indexDB";
import { TaskStatusTypes, TaskTypes } from "../types/TaskTypes";
import { ResetButton } from "./ui/Button";

type PomodoroTimerTypes = {
  status: TaskStatusTypes;
  secondsLeft: number;
  stopTimer: boolean;
  task: TaskTypes;
  setStopTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PomodoroTimer({ status, task, secondsLeft, stopTimer, setStopTimer }: PomodoroTimerTypes) {
  const [minutes, setMinutes] = useState(secondsLeft / 60 || 25);
  const [seconds, setSeconds] = useState(secondsLeft % 60 || 0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const db = useIndexedDB();
  const update = (secondsLeft?: number) => {
    updateTaskSecondsLeft({ db, secondsLeft: secondsLeft || 60 * 25, taskId: task.id });
  };

  console.log("s: ", secondsLeft);

  useEffect(() => {
    if (typeof secondsLeft === "number" && secondsLeft < 25 * 60) {
      setMinutes(Math.floor(secondsLeft / 60));
      setSeconds(secondsLeft % 60);
    }
  }, [secondsLeft]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5);
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, isBreak]);

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
    setStopTimer(true);
    // update();
  };

  useEffect(() => {
    if (status === "doing") {
      setIsActive(true);
    } else {
      resetTimer();
    }
  }, [status]);

  useEffect(() => {
    if (stopTimer) {
      setIsActive(false);
      const secondsLeft = minutes * 60 + seconds;
      update(secondsLeft);
    } else {
      if (status !== "done") {
        setIsActive(true);
      }
    }
  }, [stopTimer]);

  return (
    <div>
      <h2 style={{ whiteSpace: "nowrap", fontSize: 13, lineHeight: 0.5, textAlign: "center" }}>
        {isBreak ? "Break Time" : "Work Time"}
      </h2>
      <p
        style={{
          fontSize: 12,
          textAlign: "center",
          opacity: 0.8,
        }}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <div style={{ display: minutes === 25 ? "none" : "flex", gap: 5 }}>
        <ResetButton onClick={resetTimer}>Сбросить</ResetButton>
      </div>
    </div>
  );
}
