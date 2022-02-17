
const { nextISSTimesForMyLocation } = require('./iss');




nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  
  for (let pass of passTimes) {
    const date = new Date(pass.risetime * 1000);
    console.log(`Next pass at ${date.toUTCString()}` + ` for ${pass.duration} seconds`);
  }
  // console.log(passTimes);
});