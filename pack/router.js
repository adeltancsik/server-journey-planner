const { Router } = require("express");
const Pack = require("./model");
// const auth = require("../auth/middleware");
// const { Op } = require("sequelize");

const router = new Router();

// find all items to pack belonging to a journey
router.get("/journey/:journeyId/packs", (request, response, next) => {
  Pack.findAll({
    where: {
      journeyId: request.params.journeyId
    }
  })
    .then(result => {
      response.send(result);
    })
    .catch(error => next(error));
});

// create a new item to pack
router.post("/pack", (request, response, next) => {
  Pack.create({ ...request.body, done: false })
    .then(result => response.json(result))
    .catch(next);
});

// edit an item on packlist (setting done)
router.put("/pack/:id", (request, response, next) => {
  Pack.findByPk(request.params.id)
    .then(pack => {
      if (pack) {
        pack
          .update(request.body)
          .then(result => {
            response.json(result);
          })
          .catch(next);
      } else {
        // forbidden
        response.status(404).send({
          message: "Couldn't find target."
        });
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
