"use strict";

const axios = require('axios');

let cache = require("./cache.js");

class Movie {
    constructor(movie) {
      this.title = movie.title;
      this.overview = movie.overview;
      this.poster = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
      this.id = movie.id;
    }
}

const getMovie = async (req, res, next) => {
    try {
        const cityN = req.query.cityName;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityN}`;
        const movie = await axios.get(url);
        const key = "movie-" + req.query.searchQuery;

        if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
            console.log("Cache hit");
        } else {
            console.log("Cache miss");
            cache[key] = {};
            cache[key].timestamp = Date.now();
            cache[key].data = movie.data.results.map(movie => new Movie(movie));
        }
        res.send(cache[key].data)
    } catch(err) {
        next(err);
    }
};

module.exports = getMovie;