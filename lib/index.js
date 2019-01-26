function fullLogIn() {
  logIn();
  setLogIn();
  rotateImage(1080);
  setTimeout(getFavorites, 1500);
  setTimeout(displaySearch, 1500);
}

function logIn() {
  var xhr = new XMLHttpRequest();
  var url = "https://thawing-basin-85011.herokuapp.com/api/v1/sessions?email=bailey.diveley@gmail.com&password=test"
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      storeKey(data);
    }
  }
  xhr.send();
}

function storeKey(data) {
  sessionStorage.setItem('api_key', `${data.data.attributes.api_key}`);
}

function deleteKey() {
  sessionStorage.clear();
}

function displaySearch() {
  document.getElementById("display").innerHTML = "<input id='location' type='text' placeholder='Type any location: Denver, CO'> <br> <button id='locationbutton' class='button' onclick='getForecast()'>Find Weather</button><br>"
}

function getFavoriteForecast() {
  const favorite = document.getElementById("favorites-list").value;
  clearContents(["favorite"])
  getForecastData(favorite);
}

function getForecast() {
  const locale = getSearchLocation();
  displayForecastButtons();
  getForecastData(locale);
}

function getSearchLocation() {
  return document.getElementById("location").value.replace(/\s/g,'');
}

function displayForecastButtons() {
  document.getElementById("favorite").innerHTML = "<button id='fave-button' onclick='postNewFavorite()'>Add to Favorites</button>"
}

function postNewFavorite() {
  const q = getSearchLocation();
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/favorites?api_key=${sessionStorage.getItem('api_key')}&location=${q}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      removeFavoriteButton();
      getFavorites();
      alert(`${q} is added to your favorites list`)
    }
  }
  xhr.send();
}

function removeFavoriteButton() {
  document.getElementById("favorite").innerHTML = ""
}

function getFavorites() {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/favorites?api_key=${sessionStorage.getItem('api_key')}`
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
  clearContents(["forecast"])
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
  document.getElementById("loaded-favorites").innerHTML =
  `<select id='favorites-list'> ${contents}</select><br> <button id='favoritebutton' class='button' onclick='getFavoriteForecast()'>Select Favoritest Location</button>`
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

function fullLogOut() {
  clearContents(["favorite", "forecast", "loaded-favorites"])
  setSweaterDisplay();
  deleteKey()
  setLogOut();
  rotateImage();
}

function clearContents(tags) {
  tags.forEach(function(element) {
    document.getElementById(element).innerHTML = "";
  });
}

function clearSearch() {
  document.getElementById("location").value = ""
}

function rotateImage(degrees) {
	$('.sweater').animate({  transform: degrees }, {
    step: function(now,fx) {
      $(this).css({
        '-webkit-transform':'rotate('+now+'deg)',
        '-moz-transform':'rotate('+now+'deg)',
        'transform':'rotate('+now+'deg)'
      });
    }
  });
}
