
import {classNames} from './utils.js';

classNames.searchBtn.addEventListener('click',(e)=>{
    const address = classNames.inputAddress.value;
    classNames.locationText.textContent = '';
    classNames.summaryText.textContent = '';
    classNames.infText.textContent = '';
    classNames.highAndLow.textContent = '';
    classNames.locationText.textContent = `Please Wait..`;
    e.preventDefault();
    classNames.inputAddress.value = '';
    fetch(`/?address='${address}'`).then((res)=>{
        res.json().then((data)=>{
            changeText(data);
        });
    })
});

const changeText = (data)=>{
    if (data.er){
        classNames.locationText.textContent = data.er;
    }
    else{
        classNames.locationText.textContent = data.location;
        classNames.summaryText.textContent = data.summary;
        classNames.infText.textContent = `${data.temprature} centigrade temperature with ${data.rainChance}% of rain chance.`;
        classNames.highAndLow.textContent = `High temperature of day is ${data.highTemp} and Low temperature is ${data.lowTemp}`
    }
}