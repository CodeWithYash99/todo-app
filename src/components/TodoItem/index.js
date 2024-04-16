import React from "react";

import { BiSolidEdit } from "react-icons/bi";
import { IoTrashSharp, IoCheckmarkDoneCircle } from "react-icons/io5";
// import { GrUpdate } from "react-icons/gr";

import "./index.css";

export const TodoItem = ({ todoItems, deleteTodoItem, todoComplete, setUpdateTodo }) => {
  return (
    <div className="todo-item-container flex flex-col justify-center items-center">
      <h3 className="todo-items-heading">Todo Items</h3>

      <ul className="todo-list-items-container flex flex-col justify-center">
        {todoItems.map((todo) => (
          <li
            key={todo.id}
            className="todo-list-item flex flex-row justify-between items-center"
          >
            <p className={todo.status ? "done" : ""}>{todo.title}</p>

            <div className="icons-container flex flex-row justify-between">
              <IoCheckmarkDoneCircle
                className="todo-complete-icon"
                onClick={() => todoComplete(todo.id)}
              />

              {todo.status ? null : <BiSolidEdit className="todo-edit-icon" onClick={() => setUpdateTodo({
                id: todo.id,
                title: todo.title,
                status: todo.status ? true : false
              })} />}

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
