import React from "react";

import { BiSolidEdit } from "react-icons/bi";
import { IoTrashSharp } from "react-icons/io5";

import "./index.css";

export const TodoItem = (props) => {
  const { todoItems, todoEdit, deleteTodoItem } = props;

  return (
    <div className="todo-item-container flex flex-col justify-center items-center">
      <h3 className="todo-items-heading">Todo Items</h3>

      <ul className="todo-list-items-container flex flex-col justify-center">
        {todoItems.map((todo) => (
          <li
            key={todo.id}
            className="todo-list-item flex flex-row justify-between items-center"
          >
            <p>{todo.title}</p>
            <div className="icons-container flex flex-row justify-between">
              <BiSolidEdit
                className="todo-edit-icon"
                onClick={() => todoEdit(todo.id)}
              />
              <IoTrashSharp
                className="todo-delete-icon"
                onClick={() => deleteTodoItem(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
