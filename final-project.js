/*
Main Project: A site that listens to user's input.
Includes 4/6:
1. one or more classes, (Table, Ball & Controller)
2. one or more timing functions (countDownTimer function)
3. one or more fetch requests to a 3rd party API (Spoonacular)
4. sets/updates or changes local storage (sets API Key in local storage & refers to it during fetch)
*/

const canvasPong = document.getElementById('pong-canvas'); // canvas for game
const ctx = canvasPong.getContext("2d"); // ability to add shapes to canvas
var raf; // request animation frame variable that can be cancelled when game is stopped (button)
var winGame; // win if timer counts down to zero and wall isn't hit (table keeps ball off left wall), start undefined
var duration = 15; // 15 seconds start then countdown
var gameStart = false; // boolean used to freeze duration timer
var fetchCall; // will be created based on how the game is played
localStorage.json = {};
const button = document.getElementById('form-recipe-type'); // Fetch Recipe Button

const ball = new Ball(300, 220, 10, 'black', ctx); // moving ball
const leftTable = new Table(50, 175, 100, 10, 'black', ctx); // left pong table for 'a', 'z' manipulation
const rightTable = new Table(540, 175, 100, 10, 'black', ctx); // right pong table for 'l', 'm' manipulation
const controller = new Controller(); // holds most recent user keyboard input


/*
* timing function to countdown the game
*/
function countDownTime() {
  if (gameStart){ // based on Play/Stop Game buttons
      console.log(duration--);  
      if (duration === 0 && !winGame) {
        winGame = true;
        console.log('you win');
        getRecipes(winGame);
        gameOver();
      }
  }
}

/*
* function gameOver() removes the keyboard listener & resets global variables
*/
function gameOver() {
  dontlistenToTable();
  // reset global variables
  winGame = undefined;
  duration = 15;
  gameStart = false;
  // reset instances of table/ball/controller class
  controller.a = false;
  controller.z = false;
  controller.l = false;
  controller.m = false;
  // esc/rtn not used yet
  controller.esc = false;
  controller.rtn = false; 
  leftTable.x = 50;
  leftTable.y = 175;
  leftTable.vy = 0;
  rightTable.x = 540;
  rightTable.y = 175;
  rightTable.vy = 0;
  ball.x = 300;
  ball.y = 220;
  ball.vx = 0;
  ball.vy = 0;
  clearInterval(countDownTime);
  window.cancelAnimationFrame(raf);
};

// adjust controller (TO DO - add prototype method to Controller Class)
function addKeyDown (ev) { // on keydown, find out what is being held down and set that to true
    switch(ev.keyCode) {
      case KEY.RETURN:  { break; }
      case KEY.ESC:  { break; }
      case KEY.A:  { controller.a = true; break; }
      case KEY.Z:  { controller.z = true; break; }
      case KEY.L:  { controller.l = true; break; }
      case KEY.M:  { controller.m = true; break; }
    }  
}

// adjust controller
function addKeyUp (ev) { // on keyup, find out what is being held down and set that to false
    switch(ev.keyCode) {
      case KEY.RETURN:  { break; }
      case KEY.ESC:  { break; }
      case KEY.A:  { controller.a = false; break; }
      case KEY.Z:  { controller.z = false; break; }
      case KEY.L:  { controller.l = false; break; }
      case KEY.M:  { controller.m = false; break; }
    }    
}

/*
* function listenToTable() sets the MOST RECENT Key presses, ('a', 'z', 'l' & 'm'), 
* to true or false based on keyup or keydown. listenToTable() is called when the 
* 'Play Game' button is pressed - i.e. only listen to keyboard when gameStart is true
*/
function listenToTable() {
  document.addEventListener('keydown', addKeyDown, false);
  document.addEventListener('keyup', addKeyUp, false);
}

/*
* function dontlistenToTable() to reset game
*/
function dontlistenToTable() {
  document.removeEventListener('keydown', addKeyDown, false);
  document.removeEventListener('keyup', addKeyUp, false);
}

/*
* function drawCanvas() draws the ball and updates its location automatically 
* hit-box physics for the left table is here
*/
function drawCanvas() {
  ctx.clearRect(0, 0, canvasPong.width, canvasPong.height);
  ball.draw();
  leftTable.draw();
  rightTable.draw();
  
  // automatically move the ball
  ball.x += ball.vx;
  ball.y += ball.vy;
  
  // handle right table logic
  if (controller.rightTableAction() === -1) {
    rightTable.y = rightTable.y + 4;
  } else if (controller.rightTableAction() === 1) {
    rightTable.y = rightTable.y - 4;
  }

  // handle left table logic
  if (controller.leftTableAction() === -1) {
    leftTable.y = leftTable.y + 4;
  } else if (controller.leftTableAction() === 1) {
    leftTable.y = leftTable.y - 4;
  }

  // handle hit logic on canvas
  if (ball.y + ball.vy > canvasPong.height || ball.y + ball.vy < 0) {
    // bounces off the top of the canvas
    ball.vy = -ball.vy;
  }
  /*
  if (ball.x + ball.vx > canvasPong.width || ball.x + ball.vx < 0) {
    // game is over of it hits the left/right sides (aka width) of the canvas
    console.log('game over');
    ball.vx = -ball.vx;
  }
  */
  if (ball.x + ball.vx < 0) {
    if (winGame) {
      //window.cancelAnimationFrame(raf);
      //clearInterval(countDownTime);
      gameOver();
      console.log('game over, you won'); // may not get here
    } else {
      // game is over of it hits the left sides of the canvas
      
      gameStart = false; // stop timer
      winGame = false;
      //clearInterval(countDownTime);
      getRecipes(winGame);
      //ball.vx = -ball.vx;
      window.cancelAnimationFrame(raf);
      gameOver();
      console.log('game over, you lost');
    }
  }
  if (ball.x + ball.vx > canvasPong.width) {
    // for now just bounce back, will not use right table
    ball.vx = -ball.vx;
  }

  // handle hit logic on the left table
  if (((ball.x - ball.radius) === leftTable.x) && (((ball.y - ball.radius) > (leftTable.y - leftTable.height/2) && (ball.y - ball.radius) < leftTable.y + leftTable.height))) {
    ball.vx = -ball.vx;
  }

  // continuously drawCanvas while game is in play
  raf = window.requestAnimationFrame(drawCanvas); // request animation frame (raf)
}

// Play Game
document.getElementById('play-game-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Playing Game');
  // initiate the timer
  gameStart = true;
  // collect table inputs from keyboard when game is in play
  listenToTable();
  // modify DOM to allow player to stop game once it starts
  document.getElementById('play-game-form').className = 'invisible';
  document.getElementById('stop-game-form').className = 'visible';
  // start the animation
  raf = window.requestAnimationFrame(drawCanvas);
});

// Stop Game
document.getElementById('stop-game-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Stop Game');
  // stop the timer
  gameStart = false;
  // allow player to restart game
  document.getElementById('stop-game-form').className = 'invisible';
  document.getElementById('play-game-form').className = 'visible';
  // stop animation
  window.cancelAnimationFrame(raf);
});

setInterval(countDownTime, 1000);
ball.draw();
leftTable.draw();
rightTable.draw();

// winGame is either true, false or not defined 
// if winGame, get dessert
// if not winGame, get veggies
// if winGame null don't allow recipes to populate
function getRecipes(winGame) {
  let message;
  var firstIngredient;
  var secondIngredient;
  var thirdIngredient;
  if (winGame) {
    message = 'You Win!';
    // set fruit & sugar!
    firstIngredient = 'apples';
    secondIngredient = 'sugar';
    thirdIngredient = 'flour';
  }
  if (!winGame) {
    message = 'You Lose!';
    // set veggies!
    firstIngredient = 'broccoli';
    secondIngredient = 'carrots';
    thirdIngredient = 'onion';
  } else if (winGame === undefined) {
    console.log('how did you get here? troubleshoot required');
  }
  
  let apiKeyInput = prompt(`${message}  Type API Key for Recipes: `);
  localStorage.apiKey = apiKeyInput;

  // local storage check, is it a mix of letters and numbers, no spaces?
  // TO DO ... if statement
  fetchCall = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${firstIngredient},+${secondIngredient},+${thirdIngredient}&number=2&information&apiKey=${localStorage.apiKey}`
}

const apiKey = 'f56e4dc66cdd404d84e5420f7314c2d5'; // this key will not work, old API
// test var to help parse
var cat = {};

/*
** FROM SPOONACULAR **
Only the first query parameter is prefixed with a ? (question mark), all subsequent ones will be 
prefixed with a & (ampersand). That is how URLs work and nothing related to our API. Here's a full 
example with two parameters apiKey and includeNutrition: 
https://api.spoonacular.com/recipes/716429/information?apiKey=YOUR-API-KEY&includeNutrition=true.
*/
button.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('clicked');
  // fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&information&apiKey=${apiKey}`, { 
  fetch(`${fetchCall}`, { 
    method: 'get',  
  })  
  
  .then(response => { 
    return response.json(); 
  })  
  .then(json => { 
    // console.log('here worked');
    cat = json;
    //localStorage.json = json;
    //parseDisplayBooks(json);
    parseDisplayRecipe(json);
  });
  
});

function parseDisplayRecipe (json) {
  console.log('in parseDisplayRecipe');
  const Ul = document.createElement("ul");

  // top 2 (or length) loop
  for (let i = 0; i < json.length; i++) {
    console.log('parsing through JSON!')
    // create a li element with a <span> child and an <img> child 
    var newLi = document.createElement("li");
    var newSpan = document.createElement("span");
    var newImg = document.createElement("img");

    // parse the title & add to element
    newSpan.innerHTML = json[i].title;
    newImg.src = json[i].image;
    newImg.style.width = '250px';
    newImg.style.height = '180px';

    // append the <span> and <img> elements to the list element
    newLi.appendChild(newSpan);
    newLi.appendChild(newImg);

    // display the new list element in the DOM
    Ul.appendChild(newLi);
    // console.log(newLI.matches(".container"));

  }
  document.getElementById('recipe-list').appendChild(Ul);
}