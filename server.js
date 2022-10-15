'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const getWeather = require('./weather.js');
const getMovie = require('./movies.js');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send('Testing testing testing testing testing testing testing testing testing');
});

app.get('/Movies', getMovie);
app.get('/weather', getWeather);

app.get('*', (req, res) => {
    res.status(500).send('Page not Found');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));