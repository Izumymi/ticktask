// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // <-- ОЧЕНЬ ВАЖНО: ИЗМЕНИТЕ ЭТОТ АДРЕС!
  timeout: 5000, // Таймаут запроса в миллисекундах
  headers: {
    'Content-Type': 'application/json',
  },
});

// Опционально: Добавьте интерцептор для автоматического добавления токена в запросы
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Получаем токен
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Добавляем токен в заголовок Authorization
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;