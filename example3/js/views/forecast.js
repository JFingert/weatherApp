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



//   tomorrowMaker: function () {
//     var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     var exportArray = [];
//     var date = new Date();
//     for (var i=0; i < week.length; i++){
//       if ((date.getDay() + i) <= 6){
//         exportArray.push(week[date.getDay() + i]);
//       } else if ((date.getDay() + i) == 7) {
//         for (var k=0; k < date.getDay();) {
//          exportArray.push(week[k]);
//          k++;
//        }
//      }
//    }
//    return exportArray;
//  },

//  tempGetter: function () {
//   var daily = this.model.get('daily');
//   var tempArray = [];

//   var myDate = daily.time;

//    // this.on('change', daily, concatenator());

//     var concatenator = function () {

//       for (i = 0; i <= 20;) {
//         tempArray.push(daily[i].apparentTemperatureMin + "/" + daily[i].apparentTemperatureMax);
//         i++;
//       }
//     }
//   return tempArray;
// },

// objInfoMaker: function () {
//   var weekObj = {};
//   var supaTemp = [];
//   var tempArray = this.tempGetter();
//   var dayArray = this.tomorrowMaker();

//   for (var i = 0; i<=7; i++) {
//     weekObj[dayArray[i]] = tempArray[i];
//     //supaTemp.push(dayArray[i] + ": " + tempArray[i]);
//       } 
//   // for (var i = 0; i < supaTemp.length;) {
//   //   weekObj += supaTemp[i];
//   //   i++;
//   // }
//   return weekObj;
// }

});

module.exports = ForecastView;