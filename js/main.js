const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = loadTasks();

function renderTasks() {
   taskList.innerHTML = "";

   tasks.forEach((task) => {
      const li = document.createElement("li");

      if (task.completed) {
         li.classList.add("completed");
      }

      const textSpan = document.createElement("span");
      textSpan.className = "task-text";
      textSpan.textContent = task.description;

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Desfazer" : "Concluir";

      completeBtn.addEventListener("click", () => {
         tasks = toggleTask(task.id, tasks);
         saveTasks(tasks);
         renderTasks();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Excluir";

      deleteBtn.addEventListener("click", () => {
         tasks = deleteTask(task.id, tasks);
         saveTasks(tasks);
         renderTasks();
      });

      actionsDiv.appendChild(completeBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(textSpan);
      li.appendChild(actionsDiv);

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
