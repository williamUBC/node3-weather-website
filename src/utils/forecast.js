//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request');

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bfe219990edfd9d3e4361df2166be885&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}&units=f`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = response.body.current;
            const tem = data.temperature;
            const precip = data.precip;
            callback(undefined, {
                temperature: tem,
                precipitation: precip
            })
        }
    })
};

module.exports = forecast;