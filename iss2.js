const request = require('request-promise-native');

const urlIP = "https://api.ipify.org?format=json";
const urlGeo = ["https://api.freegeoip.app/json/","?apikey=2e36ae10-9012-11ec-be18-eb16b126eb32"];
const urlISS = ["https://iss-pass.herokuapp.com/json/?lat=", "&lon="];

const fetchMyIP = function() {
  return request(urlIP);
};

const fetchCoordsByIP = function(ip) {
  ip = JSON.parse(ip).ip;
  // console.log("ip", urlGeo[0] + ip + urlGeo[1])
  return request(urlGeo[0] + ip + urlGeo[1]);
}

const fetchISSFlyOverTimes = function(coords) {
  coords = JSON.parse(coords);
  return request(urlISS[0] + coords.latitude + urlISS[1] + coords.longitude);
}
const printPasses = function(passTimes) {
  passTimes = JSON.parse(passTimes).response;
  for (let pass of passTimes) {
    const date = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${date.toUTCString()}` + ` for ${pass.duration} seconds`);
  }
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(printPasses);
}
module.exports = { nextISSTimesForMyLocation }