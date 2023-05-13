import { ref } from 'vue';

export const useTodoList = (id) => {
  const todoList = localStorage.todoList;
  const todoListRef = ref([]);

  todoListRef.value = todoList ? JSON.parse(todoList) : [];

  const add = (task) => {
    const id = new Date().getTime();
    todoListRef.value.push({
      id: id,
      task: task,
      checked: false,
    });

    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id);
  };

  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id);
  };

  const show = (id) => {
    const todo = findById((todo) => todo.id === id);
    return todo.task;
  };

  const edit = (id, task) => {
    const todo = findById(id);
    todo.task = task;
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  const del = (id) => {
    const index = findIndexById(id);

    todoListRef.value.splice(index, 1);
    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  const check = (id) => {
    const todo = findById(id);
    const index = findIndexById(id);

    todo.checked = !todo.checked;
    todoListRef.value.splice(index, 1, todo);

    localStorage.todoList = JSON.stringify(todoListRef.value);
  };

  return { todoListRef, findById, findIndexById, add, show, edit, del, check };
};
