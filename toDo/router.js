const { Router } = require("express");
const ToDo = require("./model");

const router = new Router();

// find all toDos belonging to a journey
router.get("/journey/:journeyId/todos", (request, response, next) => {
  ToDo.findAll({
    where: {
      journeyId: request.params.journeyId
    },
    order: ["time"]
  })
    .then(result => {
      response.send(result);
    })
    .catch(error => next(error));
});

// create a new toDo
router.post("/todo", (request, response, next) => {
  ToDo.create(request.body)
    .then(result => response.json(result))
    .catch(next);
});

// delete a single todo
router.delete("/todos/:id", (request, response, next) =>
  ToDo.destroy({ where: { id: request.params.id } })
    .then(number => {
      if (number) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch(next)
);

module.exports = router;
