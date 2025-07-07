// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios.js'; // Убедитесь, что путь к axios.js правильный

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Это пример. Убедитесь, что ваш API-маршрут и формат данных совпадают
      const response = await axios.post('/auth/login', { email, password });

      // ОЧЕНЬ ВАЖНО: имя ключа должно совпадать с тем, что вы проверяете в App.jsx
      // В App.jsx вы используете localStorage.getItem('token'),
      // поэтому здесь мы должны сохранять под ключом 'token'.
      const { token } = response.data; // Предполагаем, что бэкэнд возвращает объект { token: "ваш_токен" }

      if (token) {
        localStorage.setItem('token', token); // Сохраняем токен
        navigate('/dashboard'); // Перенаправляем на дашборд
      } else {
        setError('Токен аутентификации не был получен.');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Сообщение об ошибке от бэкэнда
      } else {
        setError('Ошибка входа. Проверьте учетные данные и попробуйте снова.');
      }
      console.error("Ошибка входа:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Вход в TickTask</h1>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Войти
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Нет аккаунта? <Link to="/register" className="text-blue-600 hover:underline">Зарегистрируйся</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;