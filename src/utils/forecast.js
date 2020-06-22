const request = require('request');

//for forecasting

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d7eef63a42516dd9644464bdc8113210&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to weather service. Are you connected to internet?', undefined)
        }
        else if (body.error) {
            callback('Unable to find location. Try another location', undefined)
        }
        else {
            callback(undefined, 'Weather is '+body.current.weather_descriptions[0]+'. Temprature is '+body.current.temperature+' degrees and it feelslike '+body.current.feelslike+' degrees. Last observed time was '+body.current.observation_time)
        }
    })
}

module.exports = forecast