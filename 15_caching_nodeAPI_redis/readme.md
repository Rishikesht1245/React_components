# Node.js Caching with Redis and Redis Commander

- This project demonstrates a caching mechanism using Node.js with Redis. The Redis instance and Redis Commander are set up using Docker. The object-hash package is used to generate keys from URLs.

https://semaphoreci.medium.com/build-a-caching-layer-in-node-js-with-redis-966509563133

- Containerized the application using docker, used redis as database and redis-commander as the GUI for view the database.
- The intial response took 250 ms and after caching the response took only 50ms.
