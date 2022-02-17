const { nextISSTimesForMyLocation } = require('./iss2');


nextISSTimesForMyLocation()
  .catch(error => {
    console.log("It didn't work:", error.message);
  });
