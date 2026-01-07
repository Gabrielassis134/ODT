const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = loadTasks();

function renderTasks() {
   taskList.innerHTML = "";

   tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.description;

      if (task.completed) {
         li.classList.add("completed");
      }

      li.addEventListener("click", () => {
         tasks = toggleTask(task.id, tasks);
         saveTasks(tasks);
         renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";

      deleteBtn.addEventListener("click", (e) => {
         e.stopPropagation();
         tasks = deleteTask(task.id, tasks);
         saveTasks(tasks);
         renderTasks();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
   });
}

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const description = input.value.trim();
   if (!description) return;

   tasks.push(createTask(description));
   saveTasks(tasks);
   renderTasks();

   input.value = "";
});

renderTasks();
