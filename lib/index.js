function fullLogIn() {
  setLogIn();
  rotateImage();
  setTimeout(setSearchBar, 500);
}

function fullLogOut() {
  setSweaterDisplay();
  setLogOut();
  clearForecast();
  rotateImage();
}

function setSearchBar() {
  document.getElementById("display").innerHTML =
  "<input id='location' type='text'  placeholder='Type any location: Denver, CO'><br><button id='locationbutton' class='button' onclick='getForecast()'>Find Weather</button><br>"
}

function getForecast() {
  const q = document.getElementById("location").value;
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/forecast?location=${q}`
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
  "<li id='user' class='nav'>Welcome, bdiveley! <button id='logout-btn' class='nav' onclick='fullLogOut()'>Log Out</button></li>";
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
