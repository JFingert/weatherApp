$(function () { // wait for on-ready

var SummaryView = require('./views/summary.js');
var DetailView = require('./views/details.js');
var ForecastView = require('./views/forecast.js');

var WeatherModel = require('./models/weather');

var app = {};
app.views = {};
app.models = {};

var APIKey = "8783b7b8e12ec2201c7d2e9f20666411"
var LatLong = "45.532814,-122.689296"

var url = "https://api.forecast.io/forecast/" + APIKey + '/' + LatLong;

app.models.currentWeather = new WeatherModel({currently: {}});

app.views.summary = new SummaryView({model: app.models.currentWeather});
app.views.details = new DetailView({model: app.models.currentWeather});
app.views.forecast = new ForecastView({model: app.models.currentWeather});

window.app = app;

$.getJSON(url + "?callback=?", null, function(weatherData) {
  app.models.currentWeather.set(weatherData);
});

});