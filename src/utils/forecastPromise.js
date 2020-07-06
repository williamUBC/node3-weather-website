const request = require('request');

const forecastPromise = (lon, lat) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.weatherstack.com/current?access_key=bfe219990edfd9d3e4361df2166be885&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}&units=m`
        request({ url: url, json: true }, (error, response) => {
            if (error) {
                reject('Unable to connect to weather service!');
            } else if (response.body.error) {
                reject('Unable to find location');
            } else {
                const data = response.body;                
                resolve({
                    name: data.location.name,
                    temperature: data.current.temperature,
                    precipitation: data.current.precip,
                    decription: data.current.weather_descriptions[0],
                    icon: data.current.weather_icons[0]
                });
            }
        })
    })
};

module.exports = forecastPromise;