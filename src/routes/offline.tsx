import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/offline")({
  component: App,
});

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Note = {
  id: number;
  content: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedNotes = localStorage.getItem("notes");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [todos, notes]);

  const addTodo = () => {
    if (!todoInput.trim()) return;
    setTodos([...todos, { id: Date.now(), text: todoInput, done: false }]);
    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, { id: Date.now(), content: noteInput }]);
    setNoteInput("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          📝 Todo & Notes (Offline Ready)
        </h1>

        {/* Todos */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">✅ Todos</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Add new todo"
            />
            <button
              onClick={addTodo}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span
                    className={todo.done ? "line-through text-gray-400" : ""}
                  >
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Notes */}
        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">🗒️ Notes</h2>
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Write a note..."
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <button
            onClick={addNote}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Note
          </button>
          <ul className="space-y-4 mt-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-md relative"
              >
                <p>{note.content}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
