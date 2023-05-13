<script setup>
import { computed, ref } from 'vue';
import { useTodoList } from '../composables/useTodoList.js';
const todoRef = ref('');
const isEditRef = ref(false);
const { todoListRef, findById, findIndexById, add, show, edit, del, check } =
  useTodoList();
let editId = null;

const editTodo = () => {
  edit(editId, todoRef.value);

  isEditRef.value = false;
  todoRef.value = '';
  editId = null;
};

const addTodo = () => {
  add(todoRef.value);
  todoRef.value = '';
};

const showTodo = (id) => {
  todoRef.value = findById(id).task;
  isEditRef.value = true;
  editId = id;
};

const deleteTodo = (id) => {
  const todo = findById(id);

  if (!confirm(`「${todo.task}」を削除しますか？`)) return;

  del(id);
};

const checkTodo = (id) => {
  check(id);
};

const countFin = computed(() => {
  const finArr = todoListRef.value.filter((todo) => todo.checked);
  return finArr.length;
});
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
        <div class="todo" :class="{ fin: todo.checked }">
          <input
            type="checkbox"
            name="check"
            id="check1"
            class="check"
            @click="checkTodo(todo.id)"
            :checked="todo.checked"
          /><label>{{ todo.task }}</label>
        </div>
        <div class="btns">
          <button class="btn green" @click="showTodo(todo.id)">編</button>
          <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
        </div>
      </div>
    </div>
    <div class="finCount">
      <span>完了: {{ countFin }}, </span>
      <span>未完了: {{ todoListRef.length - countFin }} </span>
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
  align-items: center;
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

.fin {
  text-decoration: line-through;
  background-color: #ddd;
  color: #777;
}

.finCount {
  margin-top: 8px;
  font-size: 0.8em;
}
</style>
