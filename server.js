'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

class Forecast {
    constructor(date, highTemp, lowTemp, desc){
        this.date = date
        this.description = `Low of ${lowTemp}, high of ${highTemp} with ${desc}`;
        
    }
}
app.get("/", (req, res) => {
    res.send('Testing testing testing testing testing testing testing testing testing');
});
app.get('/weather',(req,res) => {

const{searchQuery, lat, lon} = req.query

const weather = data.find(city => city.city_name === searchQuery)

 res.send(weather.data.map(idx => new Forecast(idx.datetime, idx.high_temp, idx.low_temp, idx.weather.description)))
});

app.get('*', (req, res) => {
    res.status(404).send('Page not Found');
});