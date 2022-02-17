const request = require("request");
const urlIP = "https://api.ipify.org?format=json";
const urlGeo = ["https://api.freegeoip.app/json/","?apikey=2e36ae10-9012-11ec-be18-eb16b126eb32"];
const urlISS = ["https://iss-pass.herokuapp.com/json/?lat=", "&lon="];

const fetchMyIP = function(callback) {
  request(urlIP, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(error, ip);
  });
};
// const ip = "162.157.29.192";
const fetchCoordsByIP = function(ip, callback) {
  const url = urlGeo[0] + ip + urlGeo[1];
  request(url, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(msg, null);
      return;
    }
    
    body = JSON.parse(body);
    const location = {
      latitude: body.latitude,
      longitude: body.longitude
    };
    callback(error, location);
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(urlISS[0] + coords.latitude + urlISS[1] + coords.longitude, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS info for coordinates: ${body}`;
      callback(msg, null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(error, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    // console.log('It worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      // console.log("It worked! Returned coords:", coords);
      // const coords = { latitude : 53.5716,
      //   longitude : -113.5114
      // };
      fetchISSFlyOverTimes(coords, (error, passes) => {
        callback(error, passes);
      });
    });
  });
};
module.exports = { nextISSTimesForMyLocation };
