const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/20a08a1c2195543726dc39b2d9c68f63/' + latitude + ',' + longitude;

    request({ url, json: true}, ( error, {body}) => {
        if(error){
            callback("Unable to connect to weather services", undefined)
        } else if(body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary);
        }
    });
}

module.exports = forecast;