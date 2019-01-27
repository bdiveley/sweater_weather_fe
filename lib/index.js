function displayLogin() {
  deleteSession();
  $("#login").show();
  $("#sweater-display").hide();
  $("#search").hide();
  $("#register").hide();
  $("#forecast").hide();
}

function visitorLogin() {
  $("#sweater-display").hide();
  $("#search").show();
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
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/sessions?email=${email}&password=${password}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      var data = JSON.parse(this.responseText);
      $("#login").hide();
      $("#search").show();
      storeSession(data, email, function() {
        setLogIn(email, function() {
          getFavorites(function() {
              displayForecastButtons();
          });
        });
      });
    } else {
      alert("Invalid email and password.  Please try again")
    }
  }
  xhr.send();
}

function setLogIn(email, callback) {
  document.getElementById("user").innerHTML =
  `<li id='user' class='nav'>Welcome, ${email}! <button id='logout-btn' class='nav' onclick='logOut()'>Log Out</button></li>`;
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
  $("#loaded-favorites").show();
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
  $("#forecast").show();
  document.getElementById("forecast").innerHTML =
  `<h1>${forecast.location}</h1>
  <h2>Current Weather: ${currentDay.summary}</h2>
  <img class='icon' src=assets/${currentDay.icon}.png>`
}

function resetNavBar() {
  document.getElementById("user").innerHTML =
  "<li id='user'><h4 class='nav' onclick='logOut()'>Home<h4><button id='login-btn' class='nav' onclick='displayLogin()'>Log In</button><button id='register-btn' class='nav' onclick='displayRegister()'>Register</button></li>";
}

function logOut() {
  $("#sweater-display").show();
  $("#search").hide();
  $("#register").hide();
  $("#login").hide();
  $("#forecast-buttons").hide();
  $("#loaded-favorites").hide();
  $("#forecast").hide();
  deleteSession();
  resetNavBar();
}

function clearSearch() {
  document.getElementById("location").value = ""
}

function clearContents(tags) {
  tags.forEach(function(element) {
    document.getElementById(element).innerHTML = "";
  });
}

function displayRegister() {
  deleteSession();
  $("#sweater-display").hide();
  $("#login").hide();
  $("#search").hide();
  $("#forecast").hide();
  $("#register").show();
}


function getValue(element) {
  return document.getElementById(element).value;
}

function verifyRegistration() {
  var email = getValue("email");
  var pw = getValue("password");
  var pwConfirm = getValue("password-conf");
  if(email && pw && pwConfirm) {
    createUser(email, pw, pwConfirm);
  } else {
    alert("Please enter all fields before clicking the button");
  };
}

function createUser(email, pw, pwConfirm) {
  debugger;
  var xhr = new XMLHttpRequest();
  var url = `https://thawing-basin-85011.herokuapp.com/api/v1/users?email=${email}&password=${pw}&password_confirmation=${pwConfirm}`
  xhr.open("POST", url, true);
  xhr.onload = function() {
    if(this.status == 200) {
      displayLogin();
      alert(`Your account is created.  Please log in`)
    } else {
      alert("Please match you password and password confirmation.");
    }
  }
  xhr.send();
}
