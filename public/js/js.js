import * as Model from './model.js';
import * as View from './view.js';
import {classNames} from './utils.js';
 console.log('heyyy ther');
classNames.searchBtn.addEventListener('click',(e)=>{
    const address = classNames.inputAddress.value;
    classNames.locationText.textContent = '';
    classNames.summaryText.textContent = '';
    classNames.infText.textContent = '';
    classNames.locationText.textContent = `Please Wait..`;
    e.preventDefault();
    classNames.inputAddress.value = '';
    fetch(`http://localhost:8080/?address='${address}'`).then((res)=>{
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
        classNames.infText.textContent = `${data.temprature} centigrade temprature with ${data.rainChance}% of rain chance.`;
    }
}