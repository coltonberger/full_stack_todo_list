var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

//this router is mounted at http://localhost:3000/event_list
/* GET home page. */
router.get('/', (req, res) => {
  knex('todo')
    .select()
    .then(todos => {
      res.render('client-homepage', { todos: todos });
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'purchase');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'purchase');
})

function validateTodoRenderError(req, res, callback) {
  if(validTodo(req.body)) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    };

    callback(todo);
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('todo')
      .select()
      .where('id', id)
      .first()
      .then(todo => {
        res.render(viewName, todo);
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
}

function validTodo(todo){
  return typeof todo.title === 'string' &&
  todo.title.trim() !== '' &&
  typeof todo.priority !== 'undefined'
  //!isNan(Number(todo.priority));
}

function validId(id) {
  return !isNaN(id);
}

module.exports = router;
