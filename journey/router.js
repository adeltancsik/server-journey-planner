const { Router } = require("express");
const Journey = require("./model");
const auth = require("../auth/middleware");
// const { Op } = require("sequelize");

const router = new Router();

// find all journeys
router.get("/journeys", (request, response, next) => {
  Journey.findAll()
    .then(result => {
      response.send(result);
    })
    .catch(error => next(error));
});

// create a new journey
router.post("/journey", auth, (request, response, next) => {
  Journey.create(request.body)
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

// // delete a single event
// router.delete("/events/:id", (request, response, next) =>
//   Event.destroy({ where: { id: request.params.id } })
//     .then(number => {
//       if (number) {
//         response.status(204).end();
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch(next)
// );

module.exports = router;
