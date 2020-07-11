class App {
  constructor() {
    this.tasks = [];
  }

  init() {
    // Show tasks
    document.addEventListener("DOMContentLoaded", (e) => {
      this.tasks = Store.getTasks();

      this.tasks.forEach((task) => {
        const ui = new UI();
        ui.addTaskToList(task);
      });
    });

    // Task form
    document.querySelector("#form").addEventListener("submit", (e) => {
      e.preventDefault();

      const taskInput = document.querySelector("#task");

      if (taskInput.value === "") {
        alert("Enter a task");
      } else {
        this.tasks = Store.getTasks();

        const id =
          this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;

        const task = new Task(id, taskInput.value, false);

        Store.addTask(task);

        const ui = new UI();

        ui.addTaskToList(task);

        ui.clearFields();
      }
    });

    // Done task
    document.querySelector("#task-list").addEventListener("change", (e) => {
      const id = Number(e.target.id.split("-")[1]);
      const done = e.target.checked;

      Store.updateTask(id, { done });

      const ui = new UI();
      ui.updateTask(e.target, { done });
      1;
    });

    // Task actions
    document.querySelector("#task-list").addEventListener("click", (e) => {
      // Edit
      if (e.target.classList.contains("edit")) {
        const id = Number(e.target.dataset.taskId);
        const task = Store.getTask(id);

        while (true) {
          const text = prompt("Edit task", task.text);

          if (text !== "" && text !== null) {
            Store.updateTask(id, { text });

            const ui = new UI();
            ui.updateTask(e.target, { text });

            break;
          } else if (text === "") {
            alert("Enter a task");
          } else {
            break;
          }
        }
      }

      // Delete
      if (e.target.classList.contains("delete")) {
        const id = Number(e.target.dataset.taskId);

        if (confirm("Are you sure?")) {
          Store.removeTask(id);

          const ui = new UI();
          ui.removeTask(e.target);
        }
      }
    });

    // Clear all
    document.querySelector("#clear-all").addEventListener("click", (e) => {
      this.tasks = Store.getTasks();

      if (this.tasks.length) {
        if (confirm("Are you sure?")) {
          const ui = new UI();
          ui.clearTasks();

          Store.clearTasks();
        }
      } else {
        alert("Add tasks");
      }
    });

    // Filter tasks
    document.querySelector("#filter").addEventListener("change", (e) => {
      const ui = new UI();
      ui.filterTasks(e.target.value);
    });
  }
}

const app = new App();
app.init();
