import { useState, useEffect } from 'react';
import FocusTimer from '../components/FocusTimer';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Мои задачи</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Введите новую задачу..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Добавить
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center px-4 py-3 rounded-lg border ${
                task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-gray-50'
              }`}
            >
              <span>{task.text}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleComplete(task.id)} className="text-green-600 font-semibold">
                  ✓
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-600 font-semibold">
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Новый красивый фокус-таймер */}
        <FocusTimer />
      </div>
    </div>
  );
};

export default Dashboard;
