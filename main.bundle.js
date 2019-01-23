/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	function fullLogOut() {
	  setSweaterDisplay();
	  setLogOut();
	}

	function fullLogIn() {
	  rotateImage();
	  document.getElementById("user").innerHTML = "<li id='user' class='nav'>Welcome, bdiveley! <button id='logout-btn' class='nav' onclick='fullLogOut()'>Log Out</button></li>";
	}

	function setLogOut() {
	  document.getElementById("user").innerHTML = "<li id='user' class='nav'>Welcome! <button id='logout-btn' class='nav' onclick='fullLogIn()'>Log In</button></li>";
	}

	function setSweaterDisplay() {
	  document.getElementById("display").innerHTML = "<img id='display' class='sweater' src='gray-sweater.png' alt='Sweater'>";
	}

	function rotateImage() {
	  $('.sweater').animate({ transform: 360 }, {
	    step: function step(now, fx) {
	      $(this).css({
	        '-webkit-transform': 'rotate(' + now + 'deg)',
	        '-moz-transform': 'rotate(' + now + 'deg)',
	        'transform': 'rotate(' + now + 'deg)'
	      });
	    }
	  });
	}

/***/ })
/******/ ]);