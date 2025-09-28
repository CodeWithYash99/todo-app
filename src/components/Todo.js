import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "./TodoItem";

import "../styles/todo.css";

export const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [updateTodo, setUpdateTodo] = useState([]);
  const [activeTab, setActiveTab] = useState("output");
  const [activeFile, setActiveFile] = useState("App.js");

  const files = {
    "App.js": `
    import { Todo } from './components/Todo';
    import './App.css';

    function App() {
        return (
            <div className="App-container flex flex-col justify-center items-center">
                <Todo />
            </div>
        );
    }

    export default App;
    `,
    "Todo.js": `
    import React, { useState } from "react";
    import { v4 as uuidv4 } from "uuid";
    import { TodoItem } from "./TodoItem";

    import "../styles/todo.css";

    export const Todo = () => {
        const [todo, setTodo] = useState("");
        const [todoItems, setTodoItems] = useState([]);
        const [updateTodo, setUpdateTodo] = useState([]);
        const [activeTab, setActiveTab] = useState("output");
        const [activeFile, setActiveFile] = useState("App.js");

        const files = {
            "App.js": "...",
            "Todo.js": "...",
            "TodoItem.js": "...",
        }
        
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

        const handlerOutput = () => {
            setActiveTab("output");
        };

        const handlerCode = () => {
            setActiveTab("code");
        };

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

        function onClickCancelTodo() {
            setUpdateTodo("");
        }

        const output = (
            <>
            {updateTodo && updateTodo.title ? (
                <form className="todo-form-container flex flex-row justify-evenly">
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
                todoComplete={todoComplete}
                setUpdateTodo={setUpdateTodo}
                deleteTodoItem={deleteTodoItem}
                />
            ) : (
                <p className="empty-todos">No Todos here...</p>
            )}
            </>
        );

        const code = (
            <>
            <div className="d-flex flex-row active-file-container">
                {Object.keys(files).map((file) => (
                <div
                    key={file}
                    className="active-file"
                    onClick={() => setActiveFile(file)}
                    style={{
                    background: activeFile === file ? "#e0e0e0" : "transparent",
                    color: activeFile === file ? "#000" : "#fff",
                    }}
                >
                    {file}
                </div>
                ))}
            </div>

            <pre className="pre-code-container">
                <code>{files[activeFile]}</code>
            </pre>
            </>
        );

        return (
            <div className="todo-container flex flex-col items-center">
            <h1 className="todo-title">TODO APPLICATION</h1>

            <div className="tabs-container d-flex flex-row justify-content-evenly">
                <button
                className="tab-btn"
                style={{
                    background: activeTab === "output" ? "#3cc751ff" : "#000000",
                }}
                onClick={handlerOutput}
                >
                Output
                </button>
                <button
                className="tab-btn"
                style={{
                    background: activeTab !== "output" ? "#3cc751ff" : "#000000",
                }}
                onClick={handlerCode}
                >
                Code
                </button>
            </div>

            {activeTab === "output" ? output : code}
            </div>
        );
        };
    `,
    "TodoItem.js": `
    import React from "react";
    
    import { BiSolidEdit } from "react-icons/bi";
    import { IoTrashSharp, IoCheckmarkDoneCircle } from "react-icons/io5";
    
    import "../styles/todoItem.css";
    
    export const TodoItem = (props) => {
      const { todoItems, todoComplete, setUpdateTodo, deleteTodoItem } = props;
    
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
    
                  {todo.status ? null : (
                    <BiSolidEdit
                      className="todo-edit-icon"
                      onClick={() =>
                        setUpdateTodo({
                          id: todo.id,
                          title: todo.title,
                          status: todo.status ? true : false,
                        })
                      }
                    />
                  )}
    
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
    `,
  };

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

  const handlerOutput = () => {
    setActiveTab("output");
  };

  const handlerCode = () => {
    setActiveTab("code");
  };

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

  function onClickCancelTodo() {
    setUpdateTodo("");
  }

  const output = (
    <>
      {updateTodo && updateTodo.title ? (
        <form className="todo-form-container flex flex-row justify-evenly">
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
          todoComplete={todoComplete}
          setUpdateTodo={setUpdateTodo}
          deleteTodoItem={deleteTodoItem}
        />
      ) : (
        <p className="empty-todos">No Todos here...</p>
      )}
    </>
  );

  const code = (
    <>
      <div className="d-flex flex-row active-file-container">
        {Object.keys(files).map((file) => (
          <div
            key={file}
            className="active-file"
            onClick={() => setActiveFile(file)}
            style={{
              background: activeFile === file ? "#e0e0e0" : "transparent",
              color: activeFile === file ? "#000" : "#fff",
            }}
          >
            {file}
          </div>
        ))}
      </div>

      <pre className="pre-code-container">
        <code>{files[activeFile]}</code>
      </pre>
    </>
  );

  return (
    <div className="todo-container flex flex-col items-center">
      <h1 className="todo-title">TODO APPLICATION</h1>

      <div className="tabs-container d-flex flex-row justify-content-evenly">
        <button
          className="tab-btn"
          style={{
            background: activeTab === "output" ? "#3cc751ff" : "#000000",
          }}
          onClick={handlerOutput}
        >
          Output
        </button>
        <button
          className="tab-btn"
          style={{
            background: activeTab !== "output" ? "#3cc751ff" : "#000000",
          }}
          onClick={handlerCode}
        >
          Code
        </button>
      </div>

      {activeTab === "output" ? output : code}
    </div>
  );
};
