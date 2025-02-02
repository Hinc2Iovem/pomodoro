declare global {
  interface Window {
    mozIndexedDB?: IDBFactory;
    webkitIndexedDB?: IDBFactory;
    msIndexedDB?: IDBFactory;
    shimIndexedDB?: IDBFactory;
  }
}

export {};
