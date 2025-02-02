import { useEffect, useState } from "react";
import { AffirmativeButton, StopButton, ResetButton } from "./ui/Button";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

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

  const startPauseTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  return (
    <div>
      <h2
        style={{
          whiteSpace: "nowrap",
          margin: 0,
          lineHeight: 1,
        }}
      >
        {isBreak ? "Break Time" : "Work Time"}
      </h2>
      <p>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <div
        style={{
          display: "flex",
          gap: 5,
        }}
      >
        {isActive ? (
          <StopButton onClick={startPauseTimer}>Pause</StopButton>
        ) : (
          <AffirmativeButton onClick={startPauseTimer}>Start</AffirmativeButton>
        )}
        <ResetButton onClick={resetTimer}>Reset</ResetButton>
      </div>
    </div>
  );
}
