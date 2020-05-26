const request   = require('request');
const key = 'e2ad9670fd6dc257bb43bf8b5e3a2f34';

const weatherCode = (latitude, longitude, callback)=>{
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`;
    request({url , json:true},(er,{body})=>{
        if(body.error){
            callback(`error : ${body.error}`,undefined);
        }
        else if(er){
            callback(`Unable to connect to the weather server!`,undefined);
        }
        else {
            callback(undefined,{
                summary : body.daily.summary,
                temprature : body.currently.temperature,
                rainChance  :body.currently.precipProbability,
            })
            console.log('successfully weathering...');

        }

    })
}

module.exports = weatherCode;