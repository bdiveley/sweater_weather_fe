function fullLogOut() {
  setSweaterDisplay();
  setLogOut();
}

function fullLogIn() {
  rotateImage();
  document.getElementById("user").innerHTML =
  "<li id='user' class='nav'>Welcome, bdiveley! <button id='logout-btn' class='nav' onclick='fullLogOut()'>Log Out</button></li>";
}

function setLogOut() {
  document.getElementById("user").innerHTML =
  "<li id='user' class='nav'>Welcome! <button id='logout-btn' class='nav' onclick='fullLogIn()'>Log In</button></li>";
}

function setSweaterDisplay() {
  document.getElementById("display").innerHTML =
  "<img id='display' class='sweater' src='gray-sweater.png' alt='Sweater'>"
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
