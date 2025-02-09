import { createContext, useEffect, useState, ReactNode } from "react";
import { openDB } from "../libs/indexDB";

export const IndexedDBContext = createContext<IDBDatabase | null>(null);

export function IndexedDBProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    openDB("tasks", 2)
      .then((database) => {
        setDb(database);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div>Loading IndexedDB...</div>;

  return <IndexedDBContext.Provider value={db}>{children}</IndexedDBContext.Provider>;
}
