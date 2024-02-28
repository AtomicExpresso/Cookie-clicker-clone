//==============Initial setup===========================

//Assign variables to document ids
const mainCookie = document.getElementById('main-cookie');
const cookieCountText = document.getElementById('cookiecounttext');
const cookiePerSecText = document.getElementById('cookiepersec');

//Assign variables for the shop
const shopinfotext = document.getElementById('shopinfotext');
const shopBtn = document.getElementById('shop'); // Button for the shop
const closeShopBtn = document.getElementById('closeshop'); //button for closing the shop screen
const shopScreen = document.getElementById('shopscreen'); //shop screen

//Cookie Variables
let cookieClick = 0; //Cookie clicks are used as 'Currency'
let cookiePerSec = 0; //Tracks how many clicks per second you get

//Shop Variables
let autoClick = 0;
let shopBtnClick = 0;

//==============Logic===========================

//Main cookie function
const mainCookieClick = () => {
  cookieClick += 1;
  cookiePerSec++;
  cookieCountText.innerText = `${cookieClick} Cookies`;

  shopinfotext.innerText = 'Buy upgrades and stuff here'; //Resets the shops info text

  if (autoClick >= 1) {
    cookieClick += autoClick; //adds cookieclick plus the amount of autoclicks
    cookieCountText.innerText = `${cookieClick} Cookies`;
  }
};

//Disable image drag
document.getElementById('main-cookie').ondragstart = function () {
  return false;
};
document.getElementById('bgani').ondragstart = function () {
  return false;
};

//Set cookie clicks per second
setInterval(function cookiesec() {
  cookiePerSecText.innerText = `Clicks ps: ${cookiePerSec}`;
  cookiePerSec = 0;
}, 1000);

//Shop
const autoClickShop = () => {
  if (cookieClick >= 100) {
    cookieClick -= 100;
    autoClick += 1;
    cookieCountText.innerText = `${cookieClick} Cookies`;

    shopinfotext.innerText =
      'You bought a click upgrade! Your clicks are increased by +1';
    shopinfotext.style.color = 'green';
  } else {
    shopinfotext.innerText = 'You cannot afford to buy this!';
    shopinfotext.style.color = 'red';
  }
};

const shopBtnFn = () => {
  shopScreen.classList.add('shop-screen');
  shopinfotext.style.color = 'black';
  shopBtnClick++;

  if (shopBtnClick >= 2) {
    shopBtnClick = 0;
    shopScreen.classList.remove('shop-screen');
  }
};

const closeShopFn = () => {
  shopScreen.classList.remove('shop-screen');
};

//==============End of Logic===========================
