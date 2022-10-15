const axios = require('axios');

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
        res.status(200).send(movie.data.results.map(movie => new Movie(movie)));
    } catch(err) {
        next(err);
    }
};

module.exports = getMovie;