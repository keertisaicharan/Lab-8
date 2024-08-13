'use client'

import { useState } from "react";


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [feedback, setFeedback] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setFeedback('Todo removed');
    setTimeout(() => setFeedback(''), 2000);
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editingText } : todo
    ));
    setEditingId(null);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <form onSubmit={addTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="ml-2 w-[30%] bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Todo
        </button>
      </form>
      {feedback && <p className="mt-4 text-red-500 text-center">{feedback}</p>}
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center border rounded-[8px] p-3 space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-2 size-4"
            />
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow p-2 border rounded overflow-hidden"
                />
                <button onClick={() => saveEdit(todo.id)} className="px-2 py-1 w-[20%] text-white bg-blue-500 border rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className={`flex-grow overflow-hidden break-words ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
                <button onClick={() => startEditing(todo.id, todo.text)} className="px-2 py-1 text-green-500 rounded">
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="px-2 py-1 text-red-500 rounded">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;