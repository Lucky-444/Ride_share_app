/**
 * Calculate distance between two geo points using Haversine formula
 * @param {number} lat1 - source latitude
 * @param {number} lon1 - source longitude
 * @param {number} lat2 - destination latitude
 * @param {number} lon2 - destination longitude
 * @returns {number} distance in kilometers
 */
function harvesineDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (deg) => deg * (Math.PI / 180);

  const R = 6371; // Radius of Earth in KM

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in KM
}

module.exports = harvesineDistance;
