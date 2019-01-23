function fullLogOut() {
  setSweaterDisplay();
  setLogOut();
}

function fullLogIn() {
  setLogIn();
  rotateImage();
  setTimeout(setSearchBar, 500);
}

  function setSearchBar() {
    document.getElementById("display").innerHTML =
    "<input id='location' type='text'  placeholder='Type any location: Denver, CO'><br><button id='locationbutton' class='button' onclick='something()'>Find Weather</button><br>"
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
  "<img class='sweater' src='gray-sweater.png' alt='Sweater'>"
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
