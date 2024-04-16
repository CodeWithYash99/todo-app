import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoItem } from "../TodoItem";

import "./index.css";

export const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  function addTodoHandler(event) {
    event.preventDefault();

    if (todo !== "") {
      const newTodo = {
        id: uuidv4(),
        title: todo,
      };
      setTodoItems((prev) => [...prev, newTodo]);
      setTodo("");
    }
  }

  function onChangeTodoInput(event) {
    setTodo(event.target.value);
  }

  function todoEdit(id) {
    const edit = todoItems.filter((each) => each.id === id)
    setTodo(edit[0].title)
  }

  function deleteTodoItem(id) {
    const updateTodo = todoItems.filter((each) => each.id !== id);
    setTodoItems(updateTodo);
  }

  return (
    <div className="todo-container flex flex-col items-center">
      <h1 className="todo-title">Todo Application</h1>

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
          onChange={onChangeTodoInput}
        />
        <input className="add-todo-btn" type="submit" value="Add Todo" />
      </form>

      {todoItems.length !== 0 ? (
        <TodoItem
          todoItems={todoItems}
          todoEdit={todoEdit}
          deleteTodoItem={deleteTodoItem}
        />
      ) : (
        ""
      )}
    </div>
  );
};
