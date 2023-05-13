<script setup>
import { ref } from 'vue';
const todoRef = ref('');
const todoListRef = ref([]);
const isEditRef = ref(false);
let editId = null;

const editTodo = () => {
  const todo = todoListRef.value.find((todo) => todo.id === editId);
  todo.task = todoRef.value;
  isEditRef.value = false;
  todoRef.value = '';
  localStorage.todoList = JSON.stringify(todoListRef.value);
  editId = null;
};

const addTodo = () => {
  const id = new Date().getTime();
  todoListRef.value.push({
    id: id,
    task: todoRef.value,
  });

  localStorage.todoList = JSON.stringify(todoListRef.value);
  todoRef.value = '';
};

const showTodo = (id) => {
  const todo = todoListRef.value.find((todo) => todo.id === id);
  todoRef.value = todo.task;
  isEditRef.value = true;
  editId = id;
};

const deleteTodo = (id) => {
  const todo = todoListRef.value.find((todo) => todo.id === id);
  const index = todoListRef.value.findIndex((todo) => todo.id === id);

  if (!confirm(`「${todo.task}」を削除しますか？`)) return;

  todoListRef.value.splice(index, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
};
</script>

<template>
  <div class="box_input">
    <input
      type="text"
      class="todo_input"
      placeholder="+ TODOを入力"
      v-model="todoRef"
    />
    <button v-if="isEditRef" class="btn green" @click="editTodo">変更</button>
    <button v-else class="btn" @click="addTodo">追加</button>
    <div class="box_list">
      <div v-for="todo in todoListRef" :key="todo.id" class="todo_list">
        <div class="todo">
          <input
            type="checkbox"
            name="check"
            id="check1"
            class="check"
          /><label>{{ todo.task }}</label>
        </div>
        <div class="btns">
          <button class="btn green" @click="showTodo(todo.id)">編</button>
          <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
}

.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}

.btn {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

.box_list {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  gap: 4px;
}

.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  width: 300px;
  display: flex;
  align-items: flex-start;
}

.check {
  border: 1px solid red;
  transform: scale(1.6);
  margin: 0 16px 2px 6px;
}

.btns {
  display: flex;
  gap: 4px;
}

.green {
  background-color: #00c853;
}

.pink {
  background-color: #ff4081;
}
</style>
