const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://majd10:d-maradona-10@cluster0.drqgyto.mongodb.net/todolistDB"
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
});

app.post("/addTodo", (req, res) => {
  const newTodo = new Todo({ content: req.body.content });
  newTodo.save().then(() => res.redirect("/"));
});

app.post("/deleteTodo", (req, res) => {
  Todo.findByIdAndDelete(req.body.todoId).then(() => res.redirect("/"));
});

app.listen(port, () => {
  console.log(`TodoList app listening at http://localhost:${port}`);
});
