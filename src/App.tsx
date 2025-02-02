import { useState } from "react";
import Filter from "./components/Filter";
import PomodoroTimer from "./components/PomodoroTimer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskStatusTypes } from "./types/TaskTypes";

function App() {
  const [filter, setFilterState] = useState<TaskStatusTypes | "all">("all");
  const [rerender, setRerender] = useState(false);
  return (
    <section
      style={{
        maxWidth: 1480,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          alignSelf: "start",
          fontSize: 30,
          borderBottom: 1,
          borderColor: "white",
          textDecoration: "underline",
          marginBottom: 10,
        }}
      >
        Task Manager
      </h1>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignSelf: "start",
          width: "100vh",
        }}
      >
        <TaskForm setRerender={setRerender} />
        <PomodoroTimer />
      </div>
      <Filter onFilterChange={setFilterState} />
      <TaskList setRerender={setRerender} rerender={rerender} filterTypes={filter} />
    </section>
  );
}

export default App;
