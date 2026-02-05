const redisClient = require("../config/redisClient");

class locationService {
  async setDriverSocket(driverId, socketId) {
    // store socket id with TTL (1 hour)
    await redisClient.set(`driver:${driverId}`, socketId, { EX: 3600 * 24 });
  }

  async getDriverSocket(driverId) {
    return await redisClient.get(`driver:${driverId}`);
  }

  async removeDriverSocket(driverId) {
    await redisClient.del(`driver:${driverId}`);
  }
}

module.exports = new locationService();
