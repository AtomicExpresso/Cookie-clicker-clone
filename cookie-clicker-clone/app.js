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

//Assign variables for the item screen
const itemAutoClickInfo = document.getElementById('autoclickinfo');
const itemScreen = document.getElementById('itemscreen'); //item screen
const closeItemBtn = document.getElementById('closeitem'); //button for closing the shop screen

//Cookie Variables
let cookieClick = 0; //Cookie clicks are used as 'Currency'
let cookiePerSec = 0; //Tracks how many clicks per second you get

//Shop Variables
let autoClick = 0;
let shopBtnClick = 0;

//Inventory Screen variables
let itemBtnClick = 0;

//Settings

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

//Shop
const autoClickShop = () => {
  if (cookieClick >= 100) {
    //tests if you have enough to buy the item
    cookieClick -= 100;
    autoClick += 1;
    cookieCountText.innerText = `${cookieClick} Cookies`; //changes your balence

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
  shopinfotext.innerText = 'Buy upgrades and stuff here'
  shopBtnClick++;

  if (shopBtnClick >= 2) {
    shopBtnClick = 0;
    shopScreen.classList.remove('shop-screen');
  }
};

const closeShopFn = () => {
  shopScreen.classList.remove('shop-screen');
};

//Item screen
const itemBtnFn = () => {
  itemScreen.classList.add('item-screen');
  itemAutoClickInfo.style.color = 'green'; //changes the click upgrade number to green
  itemAutoClickInfo.innerText = `${autoClick}`; //displays how many click upgrades you bought

  itemBtnClick++;

  if (itemBtnClick >= 2) {
    itemBtnClick = 0;
    itemScreen.classList.remove('item-screen');
  }
};

const closeItemFn = () => {
  itemScreen.classList.remove('item-screen');
};
//==========================
//Click's Per second effects
//==========================
//Set cookie clicks per second
setInterval(function cookiesec() {
  cookiePerSecText.innerText = `Clicks ps: ${cookiePerSec}`;
  cookiePerSec = 0;
}, 1500);

mainCookie.addEventListener('click', function () {
  //Plays the RGB animation if the player's clicks per second goes over 8
  if (cookiePerSec > 8) {
    mainCookie.classList.add('click-effect');
  } else {
    mainCookie.classList.remove('click-effect');
  }
});

//==============End of Logic===========================
