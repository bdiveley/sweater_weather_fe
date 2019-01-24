function fullLogIn() {
  setLogIn();
  rotateImage();
  setTimeout(getFavorites, 500);
}

function fullLogOut() {
  setSweaterDisplay();
  setLogOut();
  clearForecast();
  rotateImage();
}

function getFavoriteForecast() {
  const q = document.getElementById("favorites-list").value;
  getForecastData(q);
}

function getForecast() {
  const q = document.getElementById("location").value;
  getForecastData(q);
}

function getFavorites() {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/favorites?api_key=ce7d0f58ef2723352790e6adffb0a542e357c4931ef5f18c331fa6`
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      formatFavorites(data);
    }
  }
  xhr.send();
}

function getForecastData(location) {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/forecast?location=${location}`
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      formatForecast(data);
    } else {
      resetForecast();
      }
  }
  xhr.send();
}

function resetForecast() {
  clearForecast();
  clearSearch();
  alert('Location not found.  Please try another location');
}

function formatFavorites(data) {
  var optionContents = ""
  var favoriteLocations = data.data
  for (i = 0; i < favoriteLocations.length; i++){
    optionContents += `<option>${favoriteLocations[i].attributes.location}</option>`
  };
  displayFavorites(optionContents);
}

function displayFavorites(contents) {
  document.getElementById("display").innerHTML =
  `<input id='location' type='text' placeholder='Type any location: Denver, CO'> <br> <button id='locationbutton' class='button' onclick='getForecast()'>Find Weather</button><br> <select id='favorites-list'> ${contents}</select><br> <button id='favoritebutton' class='button' onclick='getFavoriteForecast()'>Select Favoritest Location</button>`
}

function formatForecast(data) {
  var forecast = data.data.attributes.forecast
  var currentDay = forecast.current_day
  var hourly = currentDay.hourly
  var daily = forecast.upcoming_days
  document.getElementById("forecast").innerHTML =
  `<h1>${forecast.location}</h1>
  <h2>Current Weather: ${currentDay.summary}</h2>
  <img class='icon' src=${currentDay.icon}.png>`
}

function setLogIn() {
  document.getElementById("user").innerHTML =
  "<li id='user' class='nav'>Welcome, bailey.diveley! <button id='logout-btn' class='nav' onclick='fullLogOut()'>Log Out</button></li>";
}

function setLogOut() {
  document.getElementById("user").innerHTML =
  "<li id='user' class='nav'>Welcome! <button id='logout-btn' class='nav' onclick='fullLogIn()'>Log In</button></li>";
}

function setSweaterDisplay() {
  document.getElementById("display").innerHTML =
  "<img class='sweater' onclick='fullLogIn()'  src='gray-sweater.png' alt='Sweater'/>"
}

function clearForecast() {
  document.getElementById("forecast").innerHTML = ""
}

function clearSearch() {
  document.getElementById("location").value = ""
}

function rotateImage() {
	$('.sweater').animate({  transform: 360 }, {
    step: function(now,fx) {
      $(this).css({
        '-webkit-transform':'rotate('+now+'deg)',
        '-moz-transform':'rotate('+now+'deg)',
        'transform':'rotate('+now+'deg)'
      });
    }
  });
}
