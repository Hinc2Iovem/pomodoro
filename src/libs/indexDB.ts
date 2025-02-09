import { TaskStatusTypes, TaskTypes } from "../types/TaskTypes";

const indexedDB =
  window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

export function openDB(dbName: string, version: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("tasks")) {
        const store = db.createObjectStore("tasks", { keyPath: "id" });
        store.createIndex("status", ["status"], { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function addTask(db: IDBDatabase, task: TaskTypes) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.add(task);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function getTasks(db: IDBDatabase, status: TaskStatusTypes | "all"): Promise<TaskTypes[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readonly");
    const store = transaction.objectStore("tasks");
    let request;
    if (status === "all") {
      request = store.getAll();
    } else {
      request = store.index("status").getAll([status]);
    }

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function updateTask(db: IDBDatabase, task: TaskTypes) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.put(task);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function updateTaskSecondsLeft({
  db,
  secondsLeft,
  taskId,
}: {
  db: IDBDatabase;
  secondsLeft: number;
  taskId: number;
}) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.getKey(taskId);

    request.onsuccess = () => {
      const task = request.result as TaskTypes | undefined;

      if (!task) {
        reject(new Error("no such task"));
        return;
      }

      task.secondsLeft = secondsLeft;

      const updatedRequest = store.put(task);

      updatedRequest.onsuccess = () => resolve(task);
      updatedRequest.onerror = () => reject(updatedRequest.error);
    };
    request.onerror = () => reject(request.error);
  });
}

export function deleteTask(db: IDBDatabase, id: number) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const request = store.delete(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
