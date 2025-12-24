import { useState } from "react";
import { LuMoon } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() === "") {
      return;
    }

    const newTodo = { id: crypto.randomUUID(), text: text, done: false };
    setTodos([...todos, newTodo]);
    setText("");
  };

  const handleDone = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  };

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } h-screen w-screen flex flex-col items-center justify-center bg-gray-200  dark:bg-black space-y-2 `}
    >
      <div className="space-x-2 bg-gray-600 p-2 rounded-lg ">
        <button
          className="hover:bg-white rounded-sm dark:hover:bg-gray-700"
          onClick={() => {
            setDarkMode(true);
          }}
        >
          <LuMoon className="dark:text-white " />
        </button>
        <button
          className="hover:bg-white rounded-sm dark:hover:bg-gray-700"
          onClick={() => {
            setDarkMode(false);
          }}
        >
          <IoSunnyOutline className="dark:text-white" />
        </button>
      </div>
      <form className="space-x-2" onSubmit={handleSubmit}>
        <input
          className="placeholder:text-black dark:placeholder:text-white border-2 dark:text-white border-black dark:border-white p-2 rounded-lg"
          type="text"
          placeholder="Add todo" 
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-black dark:bg-white p-2 rounded-lg text-white dark:text-black "
        >
          Add Todo
        </button>
      </form>
      <div>
        {todos.map((todo) => {
          return (
            <p className="space-x-3" key={todo.id}>
              <span
                className={`px-4  py-2 rounded ${
                  todo.done
                    ? "line-through text-gray-500 "
                    : " text-black dark:text-white"
                }`}
              >
                {todo.text}
              </span>
              <button
                className="bg-black dark:bg-white p-2 rounded-lg text-white dark:text-black "
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-black dark:bg-white p-2 rounded-lg dark:text-black text-white "
                onClick={() => {
                  handleDone(todo.id);
                }}
              >
                {todo.done ? "Undo" : "Done"}
              </button>
            </p>
          );
        })};
      </div>
    </div>
  );
}
