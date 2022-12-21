var express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())

const pgp = require('pg-promise')(/* options */)

// IMPORTANT
// This is only for the tutorial purposes
// Remember to NOT check in your username and password in a git repo
// In an actual production repo you authenticate to a database differently to avoid sharing credentials.
const db = pgp('postgres://test:testpass@localhost:5432/postgres')


function fetchAllTodos(req, res, next) {
  return db.any('SELECT * FROM myapp.todos')
  .then((data) => {
    res.json({ todos: data });
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
}

app.get('/todo', function(req, res, next) {
  return fetchAllTodos(req, res, next)
});

app.post('/todo', function(req, res, next) {

  const newTodo = req.body['todo']

  db.any("INSERT INTO myapp.todos(description) VALUES($1)", [newTodo])
  .then((data) => {
    return fetchAllTodos(req, res, next)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
});

app.delete('/todo', function(req, res, next) {
  const index = req.body['todoIndex']

  db.any("DELETE FROM myapp.todos WHERE id = $1", [index])
  .then((data) => {
    return fetchAllTodos(req, res, next)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
});

app.put('/todo', function(req, res, next) {
  const index = req.body['todoIndex']
  const newDesc = req.body['newDesc']

  db.any("UPDATE myapp.todos SET description = $1 WHERE id = $2", [newDesc, index])
  .then((data) => {
    return fetchAllTodos(req, res, next)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
});

module.exports = app;
