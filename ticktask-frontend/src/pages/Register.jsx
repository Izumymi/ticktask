// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios.js'; // Убедитесь, что путь к axios.js правильный

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают!');
      return;
    }

    try {
      // Это пример. Убедитесь, что ваш API-маршрут и формат данных совпадают
      const response = await axios.post('/auth/register', { // Предполагаем маршрут /auth/register на бэкэнде
        email,
        password,
      });

      // Предполагаем, что бэкэнд возвращает токен после регистрации
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token); // Сохраняем токен
        navigate('/dashboard'); // Перенаправляем на дашборд
      } else {
        setError('Токен аутентификации не был получен после регистрации.');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ошибка регистрации. Попробуйте снова.');
      }
      console.error("Ошибка регистрации:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Регистрация в TickTask</h1>

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
              placeholder="Придумай пароль"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Подтверждение пароля</label>
            <input
              type="password"
              placeholder="Повтори пароль"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Уже есть аккаунт? <Link to="/login" className="text-blue-600 hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;