class Store {
  static getTasks() {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    return tasks;
  }

  static getTask(id) {
    const tasks = Store.getTasks();

    return tasks.find((task) => task.id === id);
  }

  static addTask(task) {
    const tasks = Store.getTasks();

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static updateTask(id, data) {
    const tasks = Store.getTasks();

    tasks.forEach((task) => {
      if (task.id === id) {
        if ("text" in data) {
          task.text = data.text;
        }

        if ("done" in data) {
          task.done = data.done;
        }
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static removeTask(id) {
    const tasks = Store.getTasks();

    tasks.forEach((task, index) => {
      if (task.id === id) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static clearTasks() {
    localStorage.setItem("tasks", JSON.stringify([]));
  }
}
