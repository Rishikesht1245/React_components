const express = require("express");
const { UserController } = require("./controllers/user");
const { initializeRedisClient } = require("./middlewares/redis");

// populate proces.env
require("dotenv").config();
async function initializeExpressServer() {
  // initialize an Express application
  const app = express();

  app.use(express.json());

  // connect to Redis
  await initializeRedisClient();

  // register an endpoint
  app.get("/api/v1/users", UserController.getAll);

  // start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

initializeExpressServer()
  .then()
  .catch((e) => console.error(e));
