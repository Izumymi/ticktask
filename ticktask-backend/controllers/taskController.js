const Task = require('../models/taskModel');

// Получить все задачи пользователя
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Создать задачу
exports.createTask = async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = await Task.create({
      userId: req.userId,
      text,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновить задачу (статус)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Задача не найдена' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удалить задачу
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!task) return res.status(404).json({ message: 'Задача не найдена' });

    res.json({ message: 'Задача удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
