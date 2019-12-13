const { Router } = require("express");
const Pack = require("./model");

const router = new Router();

// find all items to pack belonging to a journey
router.get("/journey/:journeyId/packs", (request, response, next) => {
  Pack.findAll({
    where: {
      journeyId: request.params.journeyId
    },
    order: ["id"]
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
        if (pack.done === false) {
          pack
            .update({ done: true })
            .then(result => {
              response.json(result);
            })
            .catch(next);
        } else {
          pack
            .update({ done: false })
            .then(result => {
              response.json(result);
            })
            .catch(next);
        }
      } else {
        // forbidden
        response.status(404).send({
          message: "Couldn't find target."
        });
      }
    })
    .catch(next);
});

module.exports = router;
