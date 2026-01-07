function createTask(description) {
   return {
      id: Date.now(),
      description: description,
      completed: false,
   };
}

function toggleTask(taskId, tasks) {
   return tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
   );
}

function deleteTask(taskId, tasks) {
   return tasks.filter((task) => task.id !== taskId);
}
