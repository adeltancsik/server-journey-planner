const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/user", (request, response, next) => {
  const user = {
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10),
    username: request.body.username
  };
  User.create(user)
    .then(result => response.send(result))
    .catch(next);
});

// ****** for testing:
// find all users: include the tickets and comments they are related to
// router.get("/users", (_request, response, next) => {
//   User.findAll({ include: [Ticket, Comment] })
//     .then(users => response.json(users))
//     .catch(next);
// });

module.exports = router;
