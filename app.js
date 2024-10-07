const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const Task = require("./models/task");

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "tasks.db",
});

// Synchronisation avec la base de données
sequelize.sync();

// CRUD Routes
// Créer une tâche
app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les tâches
app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// Récupérer une tâche par ID
app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Tâche non trouvée" });
  }
});

// Mettre à jour une tâche
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.update(req.body);
    res.json(task);
  } else {
    res.status(404).json({ error: "Tâche non trouvée" });
  }
});

// Supprimer une tâche
app.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (task) {
    await task.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Tâche non trouvée" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
