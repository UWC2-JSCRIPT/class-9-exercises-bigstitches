// associate Keyboard strokes with known letters, helps simplify inputs for troubleshooting
var KEY = {
    RETURN:   13,
    ESC:      27,
    A:        65, 
    L:        76, 
    M:        77, 
    Z:        90
};

// controller class, holds most recent key strokes and determines actions when more than one key is pressed
class Controller {
    constructor() {
      this.a = false;
      this.z = false;
      this.l = false;
      this.m = false;
      // esc/rtn not used yet
      this.esc = false;
      this.rtn = false;
    }

    leftTableAction () {
      if (this.a === true && this.z === true) return 0; // don't move
      if (this.a === true && this.z === false) return 1; // go up
      if (this.a === false && this.z === true) return -1; // go down
      if (this.a === false && this.z === false) return 0; // don't move
    }

    rightTableAction () {
      if (this.l === true && this.m === true) return 0; // don't move
      if (this.l === true && this.m === false) return 1; // go up
      if (this.l === false && this.m === true) return -1; // go down
      if (this.l === false && this.m === false) return 0; // don't move
    }
}

// table class
class Table {
    constructor(x, y, height, width, color, canvas2d) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.color = color;
      this.canvas2d = canvas2d;
      this.vy = 0;
    }
    draw () {
      this.canvas2d.beginPath();
      this.canvas2d.fillRect(this.x, this.y, this.width, this.height)
      this.canvas2d.closePath();
      this.canvas2d.fillStyle = this.color;
      this.canvas2d.fill();
    }
}

// Ball class
class Ball {
    constructor(x, y, radius, color, canvas2d) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.canvas2d = canvas2d;
      this.vx = 2;
      this.vy = 2;
    }
    draw () {
      this.canvas2d.beginPath();
      this.canvas2d.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      this.canvas2d.closePath();
      this.canvas2d.fillStyle = this.color;
      this.canvas2d.fill();
    }
}

//const canvasPong = document.getElementById('pong-canvas');
//const ctx = canvasPong.getContext("2d", {
  //alpha: false, // canvas background opaque, speeds up drawing
//});
// Set line width
//ctx.lineWidth = 10;

//const ball = new Ball(150, 150, 10, 'black');

/*

function draw() {
  ctx.clearRect(0, 0, canvasPong.width, canvasPong.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
}
*/
/*
ball.draw(ctx);

canvasPong.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvasPong.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});

*/

/*
// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
*/
//let leftBar = new Path2D();
//leftBar.rect(10, 10, 100, 100);
//ctx.stroke(leftBar);

/*

function touchInsideCanvas(x, y) {
  
}

function update(event) {
  for (let dot; dot = document.querySelector("dot");) {
    dot.remove();
  }

  for (let i=0; i < event.touches.length; i++) {
    let {pageX, pageY} = event.touches[i];
    console.log(ctx.isPointInStroke(pageX, pageY));
    //console.log(pageX + " " + pageY)
    // if touchInsideCanvas(pageX, pageY) {
    //
    //}
    let dot = document.createElement("dot");
    dot.style.left = (pageX - 50 + "px");
    dot.style.top = (pageY - 50 + "px");
    document.body.appendChild(dot);
  }
  
}

canvasPong.addEventListener("touchstart", update);
canvasPong.addEventListener("touchmove", update);
canvasPong.addEventListener("touchend", update);
*/