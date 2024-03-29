const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const weatherCode = require('./weatherCode.js');
const geoCode = require('./geoCode.js');
const port = process.env.PORT || 3000 ;
//statics
const staticsDirectory = path.join(__dirname , '../public')
app.use(express.static(staticsDirectory))
//dynamics
const dynamicsDirectoryViews = path.join(__dirname,'../templates/views')
const dynamicsDirectoryPartials = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',dynamicsDirectoryViews)
hbs.registerPartials(dynamicsDirectoryPartials)


app.get('/',(req,res)=>{
    if(!req.query.address){
        res.render('index')
    }
    else {
        geoCode(req.query.address , (er,{latitude,longitude,location}={})=>{
            if(er){
                res.send({
                    er
                })
            }if(!er) {
                weatherCode(latitude , longitude , (er,{summary,temprature,rainChance,highTemp,lowTemp}={})=>{
                    if (er){
                        console.log(er)
                    }else {
                        res.send({
                            summary ,
                            temprature,
                            rainChance,
                            location,
                            highTemp,
                            lowTemp
                        })
                        console.log('Done.');
                    }
                })

            }
        })

    }

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title :'- Help'

    })
})

app.get('/amirios/:long/:lat',(req,res)=>{
	res.send(long,lat)

})

app.get('*',(req,res)=>{
    res.render('index',{
        title : '- 404 Not Found',
    })
})


app.listen(port,()=>{
    console.log('Running.')
})
