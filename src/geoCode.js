
const request = require('request');


const key = 'pk.eyJ1IjoiaWFtcDdheWFtIiwiYSI6ImNrNHU2ZTdmejBlOTYza3BqaW95ZG1wamcifQ.beNAcMUDE3uclXZAUg3t7w';

const geoCode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}`;
    request({url , json:true},(er,{body})=>{
        if(body.features.length === 0){
            callback(`Address Not Found! Try Another..`,undefined);
        }
        else if(er){
            callback(`Unable to connect to the locating server!`,undefined);
        }
        else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
            console.log('successfully geocoding...')
        }

    })
}


module.exports = geoCode;
