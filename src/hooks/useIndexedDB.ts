import { useContext } from "react";
import { IndexedDBContext } from "../context/IndexedDBContext";

export default function useIndexedDB() {
  const db = useContext(IndexedDBContext);

  if (db === null) {
    console.log(db);
    throw new Error("useIndexedDB must be used within a IndexedDBProvider");
  }

  return db;
}
