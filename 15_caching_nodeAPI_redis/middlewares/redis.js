const { createClient } = require("redis");
/* If you follow that approach, /api/v1/users?offset=10&page=1 and /api/v1/users?page=1&offeset=1 will produce 
two different keys. However, those are exactly the same API call. This Redis key generation strategy leads 
to overfilling the Redis database storage, limiting the server’s caching capabilities as a result!
A more effective solution is to rely on object-hash, a popular npm package for generating order-insensitive, consistent, 
and reliable hashes. Add it to the project dependencies with: */
const hash = require("object-hash");

let redisClient = undefined;

async function initializeRedisClient() {
  // read the Redis connection URL from the envs
  // redis\[s]://[[username\][:password]@]\[host\][:port][/db-number] -- used to specify auth and db name
  let redisURL = process.env.REDIS_URI;
  if (redisURL) {
    // create the Redis client object
    redisClient = createClient({ url: redisURL }).on("error", (e) => {
      console.error(`Failed to create the Redis client with error:`);
      console.error(e);
    });

    try {
      // connect to the Redis server
      await redisClient.connect();
      console.log(`Connected to Redis successfully!`);
    } catch (e) {
      console.error(`Connection to Redis failed with error:`);
      console.error(e);
    }
  }
}

function requestToKey(req) {
  const requestDataToHash = {
    query: req.query,
    body: req.body,
  };
}

module.exports = { initializeRedisClient };
