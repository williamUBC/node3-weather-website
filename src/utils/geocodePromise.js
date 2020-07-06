const request = require("request");

const geocodePromise = (address) => {    
    return new Promise((resolve, reject) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFtYWZhbnRpIiwiYSI6ImNrYzg4MWJiaDBvbnAzNGsxbjFhNW14NzIifQ.tvwsFIzuDRNE-M76coiapA&limit=1`;
        request({url: url, json: true}, (error, response) => {
            if (error) {
                reject('Unable to connect to geocode service!');
            } else if (response.body.features.length === 0) {
                reject('Unable to find this place, please check your keywords!');
            } else {
                const data = response.body.features[0];
                
                resolve({
                    longitude: data.center[0],
                    latitude: data.center[1],
                    location: data.place_name
                });
            }
        })
    });
}

module.exports = geocodePromise;