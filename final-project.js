/*
1. one or more classes, (Table, Ball & Controller)
2. one or more timing functions
3. one or more fetch requests to a 3rd party API
4. sets/updates or changes local storage
*/

// tks https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7
//const canvasPong = document.getElementById('pong-canvas');
//const ctx = canvasPong.getContext("2d", {
  //alpha: false, // canvas background opaque, speeds up drawing
//});
// Set line width
//ctx.lineWidth = 10;
const canvasPong = document.getElementById('pong-canvas');
const ctx = canvasPong.getContext("2d");
var raf;
//var keys = [];
//var gameStart = false;
//var keyA = false;
//var keyZ = false;
//var keyL = false;
//var keyM = false;
//ctx.lineWidth = 10;

const ball = new Ball(300, 220, 10, 'black', ctx);
const leftTable = new Table(50, 175, 100, 10, 'black', ctx);
const rightTable = new Table(540, 175, 100, 10, 'black', ctx);
const controller = new Controller();

// sets the MOST RECENT Key presses, ('a', 'z', 'l' & 'm'), to true or false based on keyup or keydown
function listenToTable() {
  console.log('here'); // at every 'Play Game' click
  document.addEventListener('keydown', (ev) => { // on keydown, find out what is being held down and set that to true
    console.log(ev);
    switch(ev.keyCode) {
      case KEY.RETURN:  {
        console.log('enter'); 
        break;
      }
      case KEY.ESC:  {
        break;  
      }
      case KEY.A:  {
        controller.a = true; 
        break;
      }
      case KEY.Z:  {
        controller.z = true;
        break;
      }
      case KEY.L:  {
        controller.l = true;
        break;
      }
      case KEY.M:  {
        controller.m = true; 
        break;
      }
    }  
  }, false);

  document.addEventListener('keyup', (ev) => { // on keyup, find out what is being held down and set that to false
    console.log(`keyup: ${ev}`)
    switch(ev.keyCode) {
      case KEY.RETURN:  {
        console.log('enter'); 
        break;
      }
      case KEY.ESC:  {
        break;  
      }
      case KEY.A:  {
        controller.a = false; 
        break;
      }
      case KEY.Z:  {
        controller.z = false;
        break;
      }
      case KEY.L:  {
        controller.l = false;
        break;
      }
      case KEY.M:  {
        controller.m = false; 
        break;
      }
    }    
  }, false);
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvasPong.width, canvasPong.height);
  ball.draw();
  leftTable.draw();
  rightTable.draw();
  // automatically move the ball
  ball.x += ball.vx;
  ball.y += ball.vy;
  //console.log(`right: ${controller.rightTableAction()}, left: ${controller.leftTableAction()}`);

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
  if (ball.x + ball.vx > canvasPong.width || ball.x + ball.vx < 0) {
    // game is over of it hits the left/right sides (aka width) of the canvas
    console.log('game over');
    ball.vx = -ball.vx;
  }

  /*
  if (((ball.x - ball.radius) == leftTable.x) && (((ball.y - ball.radius) > (leftTable.y - leftTable.height) && (ball.y - ball.radius) < leftTable.y + leftTable.height))) {
    ball.vx = -ball.vx;
  }
  */
  
  if (((ball.x - ball.radius) === leftTable.x) && (((ball.y - ball.radius) > (leftTable.y - leftTable.height/2) && (ball.y - ball.radius) < leftTable.y + leftTable.height))) {
    ball.vx = -ball.vx;
  }
  

  raf = window.requestAnimationFrame(drawCanvas);
}

// Play Game
document.getElementById('play-game-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Playing Game');
  // collect table inputs from keyboard when game is in play
  listenToTable();
  // modify DOM to allow player to stop game once it starts
  document.getElementById('play-game-form').className = 'invisible';
  document.getElementById('stop-game-form').className = 'visible';
  // continuously drawCanvas while game is in play
  raf = window.requestAnimationFrame(drawCanvas);
});

// Stop Game
document.getElementById('stop-game-form').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Stop Game');
  // allow player to restart game
  document.getElementById('stop-game-form').className = 'invisible';
  document.getElementById('play-game-form').className = 'visible';
  // stop animation
  window.cancelAnimationFrame(raf);
});



/*
function onkey(event, keys) {
  let rotateThroughKeys = keys.length;

  for (let i=0; i < rotateThroughKeys; i++) {
    let key = keys[i].keyCode;
    //console.log(`i: ${i}`)
    switch(key) {
      case KEY.RETURN:  console.log('enter'); break;
      case KEY.ESC:  table.y++; break;
      case KEY.A:  leftTable.y += 4; break;
      case KEY.Z:  leftTable.y += -4; break;
      case KEY.L:  rightTable.y += 4; break;
      case KEY.M:  rightTable.y += -4; break;
    } 
    // keys.pop[i]; // get rid of the key after moving the table
  }
  return [];
}

function offkey(event, keys) {
  console.log(`offkey event: ${event}`)
  /*
  let rotateThroughKeys = keys.length;

  for (let i=0; i < rotateThroughKeys; i++) {
    let key = keys[i].keyCode;
    //console.log(`i: ${i}`)
    switch(key) {
      case KEY.RETURN:  console.log('enter'); break;
      case KEY.ESC:  table.y++; break;
      case KEY.A:  key[i].pop; break;
      case KEY.Z:  leftTable.y += -4; break;
      case KEY.L:  rightTable.y += 4; break;
      case KEY.M:  rightTable.y += -4; break;
    } 
    keys.pop[i]; // get rid of the key after moving the table
  }
  return keys;
  */
//}



ball.draw();
leftTable.draw();
rightTable.draw();

/*
canvasPong.addEventListener("touchstart", (event) => { 
    update(event, leftTable) 
});
canvasPong.addEventListener("touchmove", (event) => { 
    update(event, leftTable) 
});
*/
//canvasPong.addEventListener("touchend", (event) => { 
//    update(event, leftTable) 
//});





// using jquery don't forget to wrap!!
const button = document.getElementById('form-recipe-type');
//const yearEl = document.getElementById('year');
//const monthEl = document.getElementById('month');
//const dateEl = document.getElementById('date');
const apiKey = 'f56e4dc66cdd404d84e5420f7314c2d5';
// https://api.spoonacular.com/recipes/716429/information?apiKey=f56e4dc66cdd404d84e5420f7314c2d5&ingredients=apples,+flour,+sugar&number=4
// dog var to help parse
var cat = {};
/*
Only the first query parameter is prefixed with a ? (question mark), all subsequent ones will be 
prefixed with a & (ampersand). That is how URLs work and nothing related to our API. Here's a full 
example with two parameters apiKey and includeNutrition: 
https://api.spoonacular.com/recipes/716429/information?apiKey=YOUR-API-KEY&includeNutrition=true.
*/

//let apiKeyInput = prompt('Type api Key: ');
//localStorage.apiKey = apiKeyInput;

//ball.draw();

button.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('clicked');

  //const year = yearEl.value;
  //const month = monthEl.value;
  //const date = dateEl.value;
  //console.log(`${year}-${month}-${date}`);

  // Fetch bestselling books for date
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&information&apiKey=${apiKey}`, {    
    method: 'get',  
  })  
  
  .then(response => { 
    return response.json(); 
    //console.log('you suck');
  })  
  .then(json => { 
    //console.log(json); 
    // console.log('here worked');
    cat = json;
    //parseDisplayBooks(json);
  });
  
});

function parseDisplayBooks (json) {
  // create an ordered list element to append the top 5 books
  const $ol = $('<ol>');
  $('#books-container').text('');
  
  // top 5 loop
  for (let i = 0; i < 5; i++) {
    //console.log(json.results.books[i]);
    //console.log(json.results.books[i].title);
    //console.log(json.results.books[i].author);
    
    // create all the elements, list/span/a 
    let $list = $('<li>');
    let $span = $('<span>');
    let $br = $('<br>');
    $span.text(`${json.results.books[i].title} by: ${json.results.books[i].author}`);
    let $img = $('<img>');
    //<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
    
    $img.attr('src', json.results.books[i].book_image);
    $img.attr('alt', 'bestseller book hardcover');
    $img.attr('width', 180);
    $img.attr('height', 250);
    // a add image for extra credit

    // bundle the elements for style
    $list.append($span);
    $list.append($br);
    $list.append($img);

    //add to ordered list
    $ol.append($list);
    //console.log($list);
    //document.getElementById('books-container').append($list);
  }
  //console.log($ol);
  //document.getElementById('books-container').append($ol);
  //document.getElementById('books-container').append($ol);
  $('#books-container').append($ol);
}