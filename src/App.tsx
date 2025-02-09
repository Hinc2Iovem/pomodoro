import { useState } from "react";
import Filter from "./components/Filter";
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
        marginInline: "auto",
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
          flexGrow: 1,
          width: "100%",
        }}
      >
        <TaskForm setRerender={setRerender} />
      </div>
      <Filter onFilterChange={setFilterState} />
      <TaskList setRerender={setRerender} rerender={rerender} filterTypes={filter} />
    </section>
  );
}

export default App;
