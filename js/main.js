const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterSelect = document.getElementById("filter");
const orderSelect = document.getElementById("order");

let tasks = [];

async function load() {
   tasks = await getAllTasks();
   render();
}

function applyFilter(list) {
   if (filterSelect.value === "pending")
      return list.filter((t) => !t.completed);
   if (filterSelect.value === "completed")
      return list.filter((t) => t.completed);
   return list;
}

function applyOrder(list) {
   if (orderSelect.value === "status") {
      return [...list].sort((a, b) => a.completed - b.completed);
   }
   return [...list].sort((a, b) => a.createdAt - b.createdAt);
}

async function render() {
   taskList.innerHTML = "";

   let visibleTasks = applyFilter(tasks);
   visibleTasks = applyOrder(visibleTasks);

   for (const task of visibleTasks) {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      const text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.description;

      text.addEventListener("dblclick", async () => {
         const newText = prompt("Editar tarefa:", task.description);
         if (newText) {
            updateTask(task, newText);
            await saveTask(task);
            render();
         }
      });

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Desfazer" : "Concluir";
      completeBtn.onclick = async () => {
         toggleTask(task);
         await saveTask(task);
         render();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Excluir";
      deleteBtn.onclick = async () => {
         if (confirm("Deseja realmente excluir esta tarefa?")) {
            await deleteTaskDB(task.id);
            tasks = tasks.filter((t) => t.id !== task.id);
            render();
         }
      };

      actions.append(completeBtn, deleteBtn);
      li.append(text, actions);
      taskList.appendChild(li);
   }
}

form.addEventListener("submit", async (e) => {
   e.preventDefault();
   if (!input.value.trim()) return;

   const task = createTask(input.value);
   tasks.push(task);
   await saveTask(task);

   input.value = "";
   render();
});

filterSelect.onchange = render;
orderSelect.onchange = render;

load();
