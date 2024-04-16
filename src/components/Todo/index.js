import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoItem } from "../TodoItem";

import "./index.css";

export const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [updateTodo, setUpdateTodo] = useState([]);

  function addTodoHandler(event) {
    event.preventDefault();

    if (todo) {
      const newTodo = {
        id: uuidv4(),
        title: todo,
        status: false,
      };
      setTodoItems((prev) => [...prev, newTodo]);
      setTodo("");
    }
  }

  function todoComplete(id) {
    let newTodo = todoItems.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodoItems(newTodo);
  }

  function deleteTodoItem(id) {
    const updateTodo = todoItems.filter((each) => each.id !== id);
    setTodoItems(updateTodo);
  }

  function onChangeUpdateTodo(e) {
    let newEntry = {
      id: updateTodo.id,
      title: e.target.value,
      status: updateTodo.status ? true : false,
    };

    setUpdateTodo(newEntry);
  }

  function onClickUpdateTodo() {
    let filterData = [...todoItems].filter((todo) => todo.id !== updateTodo.id);
    let filterRecords = [...filterData, updateTodo];
    setTodoItems(filterRecords);
    setUpdateTodo("");
  }

  function onClickCancelTodo(e) {
    setUpdateTodo("");
  }

  return (
    <div className="todo-container flex flex-col items-center">
      <h1 className="todo-title">Todo Application</h1>

      {updateTodo ? (
        <form
          className="todo-form-container flex flex-row justify-evenly"
          onSubmit={addTodoHandler}
        >
          <input
            className="todo-update-input"
            type="text"
            name="Todo"
            value={updateTodo && updateTodo.title}
            onChange={onChangeUpdateTodo}
          />
          <button className="update-todo-btn" onClick={onClickUpdateTodo}>
            Update
          </button>
          <button className="cancel-todo-btn" onClick={onClickCancelTodo}>
            Cancel
          </button>
        </form>
      ) : (
        <form
          className="todo-form-container flex flex-row justify-evenly"
          onSubmit={addTodoHandler}
        >
          <input
            className="todo-input"
            type="text"
            placeholder="Enter Todo here..."
            name="Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input className="add-todo-btn" type="submit" value="Add Todo" />
        </form>
      )}

      {todoItems.length !== 0 ? (
        <TodoItem
          todoItems={todoItems}
          setUpdateTodo={setUpdateTodo}
          todoComplete={todoComplete}
          deleteTodoItem={deleteTodoItem}
        />
      ) : (
        <p className="empty-todos">No Todos here...</p>
      )}
    </div>
  );
};
