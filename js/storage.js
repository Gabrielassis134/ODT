const DB_NAME = "taskDB";
const DB_VERSION = 1;
const STORE_NAME = "tasks";

function openDB() {
   return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
         const db = e.target.result;
         if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id" });
         }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
   });
}

async function getAllTasks() {
   const db = await openDB();
   return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
   });
}

async function saveTask(task) {
   const db = await openDB();
   const tx = db.transaction(STORE_NAME, "readwrite");
   tx.objectStore(STORE_NAME).put(task);
}

async function deleteTaskDB(id) {
   const db = await openDB();
   const tx = db.transaction(STORE_NAME, "readwrite");
   tx.objectStore(STORE_NAME).delete(id);
}
