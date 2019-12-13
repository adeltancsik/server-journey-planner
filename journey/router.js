const { Router } = require("express");
const Journey = require("./model");
const auth = require("../auth/middleware");

const router = new Router();

// find all journeys of a specific user
router.get("/journeys", auth, (request, response, next) => {
  const { user } = request;

  Journey.findAll({
    where: {
      userId: user.id
    }
  })
    .then(result => {
      response.send(result);
    })
    .catch(error => next(error));
});

// create a new journey
router.post("/journey", auth, (request, response, next) => {
  const { user } = request;

  Journey.create({ userId: user.id, ...request.body })
    .then(result => response.json(result))
    .catch(next);
});

// find one journey
router.get("/journey/:id", (request, response, next) => {
  Journey.findByPk(request.params.id)
    .then(journey => {
      if (journey) {
        response.json(journey);
      } else {
        response.status(404).end();
      }
    })
    .catch(next);
});

// delete a single journey
router.delete("/journeys/:id", (request, response, next) =>
  Journey.destroy({ where: { id: request.params.id } })
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
