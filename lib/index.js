function logOut() {
  document.getElementById("user").innerHTML =
  "<li id='user' class='nav'>Welcome! <button id='logout-btn' class='nav' onclick='logIn()'>Log In</button></li>";
}

function logIn() {
  document.getElementById("user").innerHTML =
  "<li id='user' class='nav'>Welcome, bdiveley! <button id='logout-btn' class='nav' onclick='logOut()'>Log Out</button></li>";
}
