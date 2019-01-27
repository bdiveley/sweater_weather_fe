function displayLogin() {
  clearContents(["favorite", "forecast", "email", "loaded-favorites"]);
  deleteSession();
  document.getElementById("display").innerHTML = "<input id='email' type='text' placeholder='Email'> <br> <input id='password' type='text' placeholder='Password'> <br> <button id='login-button' class='button' onclick='fullLogIn()'>Log In</button>";
}

function visitorLogin() {
  displaySearch();
}

function fullLogIn() {
  var email = getValue("email")
  var password = getValue("password")
  displaySearch();
  logIn(email,password)
}

function logIn(email, password) {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/sessions?email=${email}&password=${password}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      storeSession(data, email, function() {
        setLogIn(email, function() {
          getFavorites(function() {
            displayForecastButtons();
          });
        });
      });
    }
  }
  xhr.send();
}

function setLogIn(email, callback) {
  document.getElementById("user").innerHTML =
  `<li id='user' class='nav'>Welcome, ${email}! <button id='logout-btn' class='nav' onclick='fullLogOut()'>Log Out</button></li>`;
  callback();
}

function sendEmail() {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/mailers?email=${sessionStorage.getItem('email')}&location=${currentLocation.location}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      alert('Your email is on its way!');
    }
  }
  xhr.send();
}

function storeSession(data, email, callback) {
  sessionStorage.setItem('api_key', `${data.data.attributes.api_key}`);
  sessionStorage.setItem('email', `${email}`);
  callback();
}

function deleteSession() {
  sessionStorage.clear();
}

function displaySearch() {
  document.getElementById("display").innerHTML = "<input id='location' type='text' placeholder='Type any location: Denver, CO'> <br> <button id='locationbutton' class='button' onclick='getForecast()'>Find Weather</button><br>"
}

function getFavoriteForecast() {
  currentLocation.location = getValue("favorites-list");
  clearContents(["favorite"])
  getForecastData();
}

function getForecast() {
  currentLocation.location = getValue("location");
  displayForecastButtons();
  getForecastData();
}

function getValue(element) {
  return document.getElementById(element).value;
}

function displayForecastButtons() {
  if(sessionStorage.getItem('email')) {
    document.getElementById("favorite").innerHTML = "<button id='fave-button' onclick='postNewFavorite()'>Add to Favorites</button>"
    document.getElementById("email").innerHTML = "<button id='email-button' onclick='sendEmail()'>Email My Forecast</button>"
  }
}

function postNewFavorite() {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/favorites?api_key=${sessionStorage.getItem('api_key')}&location=${currentLocation.location}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      removeFavoriteButton();
      getFavorites();
      alert(`${currentLocation.location} is added to your favorites list`)
    }
  }
  xhr.send();
}

function removeFavoriteButton() {
  document.getElementById("favorite").innerHTML = ""
}

function getFavorites(callback) {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/favorites?api_key=${sessionStorage.getItem('api_key')}`
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      formatFavorites(data);
      callback();
    }
  }
  xhr.send();
}

var currentLocation = {
  location: ""
};

function getForecastData() {
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/forecast?location=${currentLocation.location}`
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
  `<select id='favorites-list'> ${contents}</select><br> <button id='favoritebutton' class='button' onclick='getFavoriteForecast()'>Select Favorite Location</button>`
}

function formatForecast(data) {
  var forecast = data.data.attributes.forecast
  var currentDay = forecast.current_day
  var hourly = currentDay.hourly
  var daily = forecast.upcoming_days
  document.getElementById("forecast").innerHTML =
  `<h1>${forecast.location}</h1>
  <h2>Current Weather: ${currentDay.summary}</h2>
  <img class='icon' src=assets/${currentDay.icon}.png>`
}

function setLogOut() {
  document.getElementById("user").innerHTML =
  "<li id='user'><h4 class='nav' onclick='fullLogOut()'>Welcome<h4><button id='login-btn' class='nav' onclick='displayLogin()'>Log In</button><button id='register-btn' class='nav' onclick='displayRegister()'>Register</button></li>";
}

function setSweaterDisplay() {
  document.getElementById("display").innerHTML =
  "<img class='sweater' onclick='visitorLogin()'  src='assets/gray-sweater.png' alt='Sweater'/>"
}

function fullLogOut() {
  clearContents(["favorite", "forecast", "email", "loaded-favorites"])
  setSweaterDisplay();
  deleteSession();
  setLogOut();
}

function clearContents(tags) {
  tags.forEach(function(element) {
    document.getElementById(element).innerHTML = "";
  });
}

function clearSearch() {
  document.getElementById("location").value = ""
}

function displayRegister() {
  clearContents(["favorite", "forecast", "email", "loaded-favorites"]);
  deleteSession();
  document.getElementById("display").innerHTML = "<input id='email' type='text' placeholder='Email'> <br> <input id='password' type='text' placeholder='Password'> <br> <input id='password-conf' type='text' placeholder='Password Confirmation'> <button id='login-button' class='button' onclick='createUser()'>Log In</button><br>";
}

function createUser() {
  var email = getValue("email");
  var pw = getValue("password");
  var pwConfirm = getValue("password-conf");
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/users?email=${email}&password=${pw}&password_confirmation=${pwConfirm}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      displayLogin();
      alert(`Your account is created.  Please log in`)
    }
  }
  xhr.send();
}
