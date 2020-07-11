class UI {
  addTaskToList(task) {
    const taskList = document.querySelector("#task-list");

    const div = document.createElement("div");
    div.classList.add("task");

    // Check (add event)
    div.innerHTML = `
      <label>
        <input id="task-${task.id}" type="checkbox" ${
      task.done ? "checked" : ""
    } />
        <span class="checkable ${task.done ? "done" : ""}">${task.text}</span>
      </label>
      <div>
        <button class="warning edit" data-task-id="${task.id}">Edit</button>
        <button class="error delete" data-task-id="${task.id}">
          Delete
        </button>
      </div>
    `;

    taskList.append(div);
  }

  filterTasks(filter) {
    const tasks = document.querySelectorAll(".task");

    switch (filter) {
      case "all":
        tasks.forEach((task) => {
          task.classList.remove("hide");
        });
        break;
      case "active":
        tasks.forEach((task) => {
          if (task.firstElementChild.firstElementChild.checked) {
            task.classList.add("hide");
          } else {
            task.classList.remove("hide");
          }
        });
        break;
      case "completed":
        tasks.forEach((task) => {
          if (task.firstElementChild.firstElementChild.checked) {
            task.classList.remove("hide");
          } else {
            task.classList.add("hide");
          }
        });
        break;
    }
  }

  updateTask(target, data) {
    if ("text" in data) {
      target.parentElement.previousElementSibling.lastElementChild.textContent =
        data.text;
    }

    if ("done" in data) {
      if (data.done) {
        target.nextElementSibling.classList.add("done");
      } else {
        target.nextElementSibling.classList.remove("done");
      }
    }
  }

  removeTask(target) {
    target.parentElement.parentElement.remove();
  }

  clearTasks() {
    const taskList = document.querySelector("#task-list");
    taskList.innerHTML = "";
  }

  clearFields() {
    document.querySelector("#task").value = "";
  }
}
