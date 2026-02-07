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

  async addDriverLocation(driverId, latitude, longitude) {
    try{
      await redisClient.sendCommand([
        "GEOADD",
        "drivers:locations",
        longitude.toString(),
        latitude.toString(),
        driverId.toString(),
      ]);
    }catch(error){
      throw error;
    }
  }

  async findDriversWithinRadius(latitude, longitude, radiusInKm) {
    const radiusInMeters = radiusInKm * 1000; // Convert km to meters
    const nearbyDrivers = await redisClient.sendCommand([
      "GEORADIUS",
      "drivers",
      longitude.toString(),
      latitude.toString(),
      'WITHCOORD',
      "km",
    ]);
    return nearbyDrivers;
  }

  async notifyDrivers(bookingId, driverIds) {
    for(const driverId of driverIds) {
      await redisClient.sAdd(`notifiedDrivers:${bookingId}:drivers`, driverId);
    }
  }

  async getNotifiedDrivers(bookingId) {
    return await redisClient.sMembers(`notifiedDrivers:${bookingId}:drivers`);
  }
};

module.exports = new locationService();
