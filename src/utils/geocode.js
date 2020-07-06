const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFtYWZhbnRpIiwiYSI6ImNrYzg4MWJiaDBvbnAzNGsxbjFhNW14NzIifQ.tvwsFIzuDRNE-M76coiapA&limit=1`;
    // encodeURIComponent是用来将比如说？转变为url可识别的%3F
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find this place, please check your keywords!', undefined);
        } else {
            const data = response.body.features[0];
            callback(undefined, {
                longitude: data.center[0],
                latitude: data.center[1],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode;