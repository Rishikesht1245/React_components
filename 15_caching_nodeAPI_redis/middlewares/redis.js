const zlib = require("zlib")
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

// key generation for saving in redis DB
function requestToKey(req) {
  const requestDataToHash = {
    query: req.query,
    body: req.body,
  };
  // `${req.path}@...` to make it easier to find
  // keys on a Redis client
  const key = `${req.path}@${hash.sha1(requestDataToHash)}`;
  console.log("Redis Key : ", key)
  return key;
}

// function to check if redis is working or not
function isRedisWorking() {
  // verify whether there is an active connection
  return !!redisClient?.isOpen;
}


// function to write data to redis DB
async function writeData(key, data, options, compress) {
  /*
  options
  {
    EX, // the specified expire time in seconds
    PX, // the specified expire time in milliseconds
    EXAT, // the specified Unix time at which the key will expire, in seconds
    PXAT, // the specified Unix time at which the key will expire, in milliseconds
    NX, // write the data only if the key does not already exist
    XX, // write the data only if the key already exists
    KEEPTTL, // retain the TTL associated with the key
    GET, // return the old string stored at key, or "undefined" if key did not exist
} 
   */
  if (isRedisWorking()) {
    try {
      let dataToCache = data;
      if (compress) {
        // compress the value with ZLIB to save RAM
        // toString(base64) -- binary data to base 64 formate
        // store compressed binary data in text based format
        dataToCache = zlib.deflateSync(data).toString("base64");
      }
      await redisClient.set(key, dataToCache, options)
    } catch (error) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

// function to read data from redis DB
async function readData(key, compressed) {
  let cachedValue = undefined;
  if (isRedisWorking()) {
    cachedValue = await redisClient.get(key);
    if (cachedValue) {
      if (compressed) {
        // decompress the cached value with ZLIB
        return zlib.inflateSync(Buffer.from(cachedValue, "base64")).toString();
      }
      return cachedValue
    }
  }
}

// middleware function : middleware with custom arguments are declared like this
// return middlware functon
function redisCachedMiddleware(options = { EX: 216000 }, compression = true ) {
  return async (req, res, next) => {
    if (isRedisWorking()) {
      const key = requestToKey(req);

      // checking if there is cached data or not 
      const cachedValue = await readData(key, compression);
      if (cachedValue) {
        try {
          return res.json(JSON.parse(cachedValue));
        } catch (error) {
          // if it's not json data
          return res.send(cachedValue)
        }
      } else {
        // here it will act as middleware so the query will execute in the next function
        // here we can't directly save the data so we need to modify the res.send method 
        // then inside the next function when we call the res.send function the below 
        // function will be invoked and it will store the data in Redis DB
        //  over ride how res.send behaves to Introduce the caching logic
        // res.json also calls res.send under the hood so we don't need to write logic for res.jsonp
        const oldSend = res.send;
        res.send = function (data) {
          // to get all the data
          res.send = oldSend;
          // cache the response only if it is successful
          if (res.statusCode.toString().startsWith("2")) {
            writeData(key, data, options, compression).then();
          }
          return res.send(data);
        }
        //  continue to next controller function
        next();
      }
    } else {
      // proceed with no caching
      next();
    }
  }
}

module.exports = { initializeRedisClient, redisCachedMiddleware };
