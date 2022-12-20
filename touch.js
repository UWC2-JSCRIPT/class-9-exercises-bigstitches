//const canvasPong = document.getElementById('pong-canvas');
//const ctx = canvasPong.getContext("2d", {
  // alpha: false, // canvas background opaque, speeds up drawing
//});
// Set line width
//ctx.lineWidth = 10;
/*
const ball = {
  x: 150,
  y: 100,
  radius: 10,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
*/
//ball.draw();

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



function touchInsideCanvas(x, y) {
  
}

function update(event, leftTable) {
  for (let dot; dot = document.querySelector("dot");) {
    dot.remove();
  }

  for (let i=0; i < event.touches.length; i++) {
    let {pageX, pageY} = event.touches[i];
    if ((pageX < leftTable.x + 15)&&(pageX > leftTable.x - 20)) {
      console.log(`left table and finger match ${pageX}`);
      if (pageY > leftTable.y) {
        leftTable.y -= 2;
      }
      if (pageY < leftTable.y) {
        leftTable.y += 2;
      }
    }
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


