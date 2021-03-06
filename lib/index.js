function displayLogin() {
  deleteSession();
  hideForecastButtons();
  $("#login").show();
  $("#sweater-display").hide();
  $("#search").hide();
  $("#register").hide();
  $("#forecast").hide();
  $("#upcoming-week").hide();
}

function visitorLogin() {
  $("#sweater-display").hide();
  $("#search").show();
  $("#upcoming-week").hide();
  document.getElementById("location").value = ""
}

function verifyLogin() {
  $("#search").hide();
  var email = getValue("email")
  var password = getValue("password")
  if(email && password) {
    logIn(email,password);
  } else {
    alert("Please enter a username and password")
  }
}

function logIn(email, password) {
   makePostCall("https://thawing-basin-85011.herokuapp.com/api/v1/sessions", {'email': email, 'password': password}, function(response) {
     var api_key = response.data.attributes.api_key
     $("#login").hide();
     $("#user-login").hide();
     $("#search").show();
     $("#user-logout").show();
     storeSession(api_key, email, function() {
       getFavorites( function() {
         //fix this functionality
       });
     });
   });
}

function storeSession(key, email, callback) {
  sessionStorage.setItem('api_key', `${key}`);
  sessionStorage.setItem('email', `${email}`);
  callback();
}

function deleteSession() {
  sessionStorage.clear();
}

var currentLocation = {
  location: ""
};

function getValue(element) {
  return document.getElementById(element).value;
}

function getForecast() {
  currentLocation.location = getValue("location");
  displayForecastButtons();
  getForecastData();
}

function displayForecastButtons() {
  if(sessionStorage.getItem('email')) {
    $("#favorite").show();
    $("#emails").show();
    $("#daily").show();
  }
}

function hideForecastButtons() {
  $("#favorite").hide();
  $("#emails").hide();
  $("#daily").hide();
}

function getForecastData() {
  makeGetCall("https://thawing-basin-85011.herokuapp.com/api/v1/forecast", {'location': currentLocation.location}, function(response) {
    formatForecast(response);
  });
}

function postNewFavorite() {
  makePostCall("https://thawing-basin-85011.herokuapp.com/api/v1/favorites", {'api_key': sessionStorage.getItem('api_key'), 'location': currentLocation.location}, function(response) {
    $("#favorite").hide();
    getFavorites(function() {
      displayForecastButtons();
    });
    alert(`${currentLocation.location} is added to your favorites list`)
  });
}

function formatForecast(data) {
  var forecast = data.data.attributes.forecast
  var currentDay = forecast.current_day
  var hourly = currentDay.hourly
  var daily = forecast.upcoming_days
  loadUpcomingWeek(daily);
  $("#forecast").show();
  document.getElementById("forecast").innerHTML =
  `<h1>${forecast.location}</h1>
  <h2>Current Weather: ${currentDay.summary}</h2>
  <h2>Feel likes ${forecast.current_day.apparent_temp}&#176</h2>
  <img class='icon' src=assets/${currentDay.icon}.png>
  <h2>High Temp: ${forecast.current_day.high_temp}&#176</h2>
  <h2>Low Temp: ${forecast.current_day.low_temp}&#176</h2>`
}

function loadUpcomingWeek(daily) {
  $("#daily-button").show();
  var dailyData = ""
  daily.forEach( function(day) {
    dailyData +=
    `<div class='day'><h2>${day.day_of_week}</h2><h4>${day.summary}</h4><br><img class='small-icon' src=assets/${day.icon}.png></div>`
  });
  document.getElementById("upcoming-week").innerHTML = dailyData;
}

function dailyForecast() {
  $("#upcoming-week").toggle();
  $("#forecast").toggle();

}

function getFavoriteForecast() {
  currentLocation.location = getValue("favorites-list");
  $("#upcoming-week").hide();
  $("#favorite").hide();
  $("#emails").show();
  getForecastData();
}

function getFavorites(callback) {
  makeGetCall("https://thawing-basin-85011.herokuapp.com/api/v1/favorites", {'api_key': sessionStorage.getItem('api_key')}, function(response) {
    formatFavorites(response);
    callback();
  });
}

function formatFavorites(data) {
  var optionContents = ""
  var favoriteLocations = data.data
  for (i = 0; i < favoriteLocations.length; i++){
    optionContents += `<option>${favoriteLocations[i].attributes.location}</option>`
  };
  $("#loaded-favorites").show();
  displayFavorites(optionContents);
}

function displayFavorites(contents) {
  document.getElementById("loaded-favorites").innerHTML =
  `<select id='favorites-list'> ${contents}</select><br> <button id='favoritebutton' class='button' onclick='getFavoriteForecast()'>Select Favorite Location</button>`
}

function sendEmail() {
  makeMailerCall("https://thawing-basin-85011.herokuapp.com/mailers", {'email': sessionStorage.getItem('email'), 'location': currentLocation.location}, function() {
    alert('Your email is on its way!')
  });
}

function logOut() {
  deleteSession();
  $("#sweater-display").show();
  $("#search").hide();
  $("#upcoming-week").hide();
  $("#daily").hide();
  $("#user-logout").hide();
  $("#register").hide();
  $("#login").hide();
  $("#loaded-favorites").hide();
  $("#forecast").hide();
  $("#favorite").hide();
  $("#emails").hide();
  $("#user-login").show();
}

function displayRegister() {
  deleteSession();
  hideForecastButtons()
  $("#sweater-display").hide();
  $("#login").hide();
  $("#search").hide();
  $("#forecast").hide();
  $("#register").show();
}

function verifyRegistration() {
  var email = getValue("reg-email");
  var pw = getValue("reg-password");
  var pwConfirm = getValue("password-conf");
  if(email && pw && pwConfirm) {
    createUser(email, pw, pwConfirm);
  } else {
    alert("Please enter all fields before clicking the button");
  };
}

function createUser(email, pw, pwConfirm) {
  makePostCall("https://thawing-basin-85011.herokuapp.com/api/v1/users", {'email': email, 'password': pw, 'password_confirmation': pwConfirm}, function(response) {
    displayLogin();
    alert(`Your account is created.  Please log in`)
  });
}
