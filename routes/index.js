var express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())

const todos = [];

app.get('/todo', function(req, res, next) {
  res.json({ todos: todos });
});

app.post('/todo', function(req, res, next) {
  const newTodo = req.body['todo']
  todos.push(newTodo)
  res.json({ todos: todos });
});

app.delete('/todo', function(req, res, next) {
  const index = req.body['todoIndex']
  todos.splice(index, 1);
  res.json({ todos: todos });
});

app.put('/todo', function(req, res, next) {
  const index = req.body['todoIndex']
  const newDesc = req.body['newDesc']
  todos[index] = newDesc;
  res.json({ todos: todos });
});

module.exports = app;
