const axios = require('axios');

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
        
        res.status(200).send(weather.data.data.map(idx => new Forecast(idx.datetime, idx.high_temp, idx.low_temp, idx.weather.description)));
    } catch(err) {
        next(err);
    }
};

module.exports = getWeather;