"use strict";

require("dotenv").config();

const axios = require('axios');

let cache = require("./cache.js");

class Forecast {
    constructor(date, highTemp, lowTemp, desc){
        this.date = date;
        this.description = `Low of ${lowTemp}°, high of ${highTemp}° with ${desc}`;
        
    }
}

const getWeather = async (req, res, next) => {
    try{
        const {lat, lon} = req.query;
        const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
        let weather = await axios.get(url);
        const key = "weather-" + lat + lon;

        if (cache[key] && Date.now() - cache[key].timestamp < 30000) {
            console.log("Cache hit");
        } else {
            console.log("Cache miss");
            cache[key] = {};
            cache[key].timestamp = Date.now();
            cache[key].data = weather.data.data.map(idx => new Forecast(idx.datetime, idx.high_temp, idx.low_temp, idx.weather.description));
        }
        res.send(cache[key].data);
    } catch(err) {
        next(err);
    }
};

module.exports = getWeather;