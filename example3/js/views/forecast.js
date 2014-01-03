var ForecastView = Backbone.View.extend({
  el: '#forecast', 

  template: require('../../templates/forecast.hbs'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },

  render: function () {
    var context = {};
    var daily = this.model.get('daily') || {data: []};
    context.sevenDayForecast = [];

    daily.data.forEach(function (day) {
      var contextData = {};
      var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var timeStamp = new Date(day.time * 1000);
      var sunrise = new Date(day.sunriseTime * 1000);
      var sunset = new Date(day.sunsetTime * 1000);
      contextData.date = week[timeStamp.getDay()] + '(' + (timeStamp.getMonth() + 1) + '/' + timeStamp.getDate() + ')';
      contextData.maxTemp = day.temperatureMax;
      contextData.minTemp = day.temperatureMin;
      contextData.sunriseDude = sunrise.getHours() + ':' + sunrise.getMinutes();
      contextData.sunsetDude = sunset.getHours() + ':' + sunset.getMinutes();
      context.sevenDayForecast.push(contextData);
    });

    //console.dir(typeof context.week);
    this.$el.html(this.template(context));
    return this;
    
  }
});

module.exports = ForecastView;