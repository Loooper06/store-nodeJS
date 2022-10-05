const redisDB = require("redis");
const redisClient = redisDB.createClient();

redisClient.connect();
redisClient.on("connect", () => console.log("connect redis"));
redisClient.on("error", (err) => console.log("error : ", err.message));
redisClient.on("connected", () =>
  console.log("connected to redis and ready to use...")
);
redisClient.on("end", () => console.log("disconnected from redis ..."));

module.exports = redisClient;
