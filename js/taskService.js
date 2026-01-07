function createTask(description) {
   return {
      id: Date.now(),
      description,
      completed: false,
      createdAt: Date.now(),
   };
}

function toggleTask(task) {
   task.completed = !task.completed;
   return task;
}

function updateTask(task, newDescription) {
   task.description = newDescription;
   return task;
}
