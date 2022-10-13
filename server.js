'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get("/", (req, res) => {
    res.send('Testing testing testing testing testing testing testing testing testing');
});

class Movie {
    constructor(movie) {
      this.title = movie.title;
      this.overview = movie.overview;
      this.poster = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
      this.id = movie.id;
    }
  }

class Forecast {
    constructor(date, highTemp, lowTemp, desc){
        this.date = date;
        this.description = `Low of ${lowTemp}, high of ${highTemp} with ${desc}`;
        
    }
}

const getMovie = async (req, res, next) => {
    try {
        const cityN = req.query.cityName;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityN}`;
        const movie = await axios.get(url);
        res.status(200).send(movie.data.results.map(movie => new Movie(movie)));
    } catch(err) {
        next(err);
    }
};

const getWeather = async (req, res, next) => {
    try{
        const {lat, lon} = req.query;
        const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=3&units=I`;
        let weather = await axios.get(url);
        res.status(200).send(weather.data.data.map(idx => new Forecast(idx.datetime, idx.high_temp, idx.low_temp, idx.weather.description)));
    } catch(err) {
        next(err);
    }
};


app.get('/Movies', getMovie);
app.get('/weather', getWeather);

app.get('*', (req, res) => {
    res.status(404).send('Page not Found');
});