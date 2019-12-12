const cors = require("cors");
const middleware = cors();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const journeyRouter = require("./journey/router");
const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const toDoRouter = require("./toDo/router");
const packRouter = require("./pack/router");

app
  .use(middleware)
  .use(jsonParser)
  .use(journeyRouter)
  .use(userRouter)
  .use(authRouter)
  .use(toDoRouter)
  .use(packRouter)

  .listen(port, () => console.log(`We are listening on port ${port}!!`));
