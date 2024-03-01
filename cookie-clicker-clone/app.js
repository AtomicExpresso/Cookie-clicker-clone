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
const closeItemBtn = document.getElementById('closeitem'); //button for closing the info screen

//Assign Variables for the mile stone screen
const milestoneScreen = document.getElementById('milestonescreen'); //item screen
const closeMilestoneBtn = document.getElementById('closemilestones'); //button for closing the milestone screen

//Cookie Variables
let cookieClick = 0; //Cookie clicks are used as 'Currency'
let cookiePerSec = 0; //Tracks how many clicks per second you get

//Shop Variables
let autoClick = 0;

//Screen variables (Used to prevent overlapping and allow screens to be opened/closed)
let itemBtnClick = 0;
let milestoneBtnClick = 0;
let shopBtnClick = 0;

//Shop class instances (For each shop class instance, sets the items defualt value to undefined until declared)
let autoClickItem = undefined;

//==============Cookie click Logic===========================

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

//================Shop Logic==============================

//This is a class definition that represents a shop item
//Item price = The items price
//ItemName = is the name of the item
//Item = is the value of the item

class shop {
  constructor(itemName, price, item) {
    //The constructor initializes these properties when a new shop item is created
    this._itemName = itemName;
    this._price = price;
    this._item = item;
  }

  get price() {
    //retrives the price of the shop item
    return this._price;
  }

  get itemName() {
    return this._itemName;
  }
}

//Evaluate the price, it takes 'Shop instance' as a paramenter, which represents the instance of the shop class

let evaluatePrice = (shopInstance) => {
  //Shop instance catchs the item
  if (cookieClick >= shopInstance.price) {
    //if cookies is greater then or equal to the price of shopInstance
    cookieClick -= shopInstance.price;

    shopinfotext.innerText = `You bought a "${shopInstance.itemName}"`;
    shopinfotext.style.color = 'green';
    cookieCountText.innerText = `${cookieClick} cookies`;
  } else {
    //else say you cant afford it
    shopinfotext.innerText = 'You cannot afford to buy this!';
    shopinfotext.style.color = 'red';
  }
};

//Auto Click Item, creates a new instance of a shop item (in this case, it creates an instance named autoClickItem)
const autoClickShop = () => {
  autoClickItem = new shop('Click Upgrade', 100);

  // Evaluate the price and deduct from cookie count only if the player can afford it
  if (cookieClick >= autoClickItem.price) {
    evaluatePrice(autoClickItem); //passes the shopClickItem to the shop
    autoClick++;
  } else {
    shopinfotext.innerText = 'You cannot afford to buy this!';
    shopinfotext.style.color = 'red';
  }
};

const shopBtnFn = () => {
  shopScreen.classList.add('shop-screen');
  shopinfotext.style.color = 'black';
  shopinfotext.innerText = 'Buy upgrades and stuff here';
  shopBtnClick++;

  if (shopBtnClick >= 2) {
    shopBtnClick = 0;
    shopScreen.classList.remove('shop-screen');
  }

  
  if (itemBtnClick >= 1) { //prevents the screens from overlapping
    itemBtnClick = 0;
    itemScreen.classList.remove('item-screen');
  }
  if (milestoneBtnClick >= 1) { //prevents the screens from overlapping
    milestoneBtnClick = 0;
    milestoneScreen.classList.remove('milestone-screen');
  }
};

const closeShopFn = () => {
  shopScreen.classList.remove('shop-screen');
};
//===========Milestone logic===============

//Milestone screen
const milestoneBtnFn = () => {
  milestoneScreen.classList.add('milestone-screen');

  milestoneBtnClick++;

  if (milestoneBtnClick >= 2) {
    milestoneBtnClick = 0;
    milestoneScreen.classList.remove('milestone-screen');
  }

  if (shopBtnClick >= 1) { //prevents the screens from overlapping
    shopBtnClick = 0;
    shopScreen.classList.remove('shop-screen');
  }
  if(itemBtnClick >= 1){
    itemBtnClick = 0;
    itemScreen.classList.remove('item-screen');
  }
};

const closeMilestonesFn = () => {
  milestoneScreen.classList.remove('milestone-screen');
};


//===========Items logic===============

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

  if (shopBtnClick >= 1) { //prevents the screens from overlapping
    shopBtnClick = 0;
    shopScreen.classList.remove('shop-screen');
  }
  if (milestoneBtnClick >= 1) { //prevents the screens from overlapping
    milestoneBtnClick = 0;
    milestoneScreen.classList.remove('milestone-screen');
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
}, 1000);

mainCookie.addEventListener('click', function () {
  //Plays the RGB animation if the player's clicks per second goes over 8
  if (cookiePerSec > 8) {
    mainCookie.classList.add('click-effect');
  } else {
    mainCookie.classList.remove('click-effect');
  }
});

//==============End of Logic===========================
