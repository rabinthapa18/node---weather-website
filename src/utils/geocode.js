const request = require('request');


// for location geocode

const geocode = (address, callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2luZ2JlZTE4IiwiYSI6ImNrYjZnejg3YTA3ejIyeW8yZzhscXA3MDIifQ.fdMLEeubj4Uxjrz5y-Oejg&limit=1'
   request({ url, json: true }, (error, { message, body }={}) => {
      if (error) {
         callback("Unable to connect to location services. Are you connected to internet?", undefined)
      }
      else if (message) {
         callback("Unable to find location. Is your location correct?", undefined);
      }
      else if (body.features.length === 0) {
         callback("Unable to find location. Is your location correct?", undefined);
      }
      else {
         // console.log("latitude = " + response.body.features[0].center[1])
         // console.log("longitude = " + response.body.features[0].center[0]);
         callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
         })

      }
   })
}


module.exports = geocode