// the canvas object for canvas drawing
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

class Canvas {
  constructor(width = 400, height = 400) {
    // initialize variables
    this.width = width;
    this.height = height;
    this.doFill = true;
    this.doStroke = true;

    this.frameCount = 0;
    this.fps = 60;
    this.hasStopped = false;
    this.fpsInterval = 1000 / this.fps;

    // initialize the canvas (creates new one)
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "defaultCanvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.clientRect = this.canvas.getBoundingClientRect();
    if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
    else return alert("Browser does not support the canvas.");
    document.body.appendChild(this.canvas); // adds to the body

    this.keyPressingDict = {};
    this.keyCodePressingDict = {};
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;

    // handle all the calls
    this.then = Date.now();
    this.deltaTimeMS = 0;
    this.deltaTime = 0;
    this.mouse = new Vector(0, 0);
    this.mouseMovement = new Vector(0, 0);
    this.mouseIsLocked = false;

    // gets the mouse pos
    document.body.addEventListener("mousemove", event => {
      this.mouse.x = event.clientX - this.clientRect.left;
      this.mouse.y = event.clientY - this.clientRect.top;
      this.mouseMovement = new Vector(event.movementX, event.movementY);
      if (!this.mouseIsLocked) this.mouseMove();
      else this.lockedMouseMove();
    });

    document.addEventListener('pointerlockchange', () => (this.mouseIsLocked = !this.mouseIsLocked), false);
    document.addEventListener('mozpointerlockchange', () => (this.mouseIsLocked = !this.mouseIsLocked), false);

    document.body.addEventListener("mousedown", event => {
      this.mousePressed();
    });

    // add to dictionary on keydown and removes and keyup
    document.body.addEventListener("keydown", event => {
      this.keyPressingDict[event.key] = true;
      this.keyCodePressingDict[event.code] = true;
    });

    document.body.addEventListener("keyup", event => {
      this.keyPressingDict[event.key] = false;
      this.keyCodePressingDict[event.code] = false;
    });

    this.animationDrawFunc = () => {
      try {
        this.now = Date.now();
        this.deltaTimeMS = this.now - this.then; // get ellapsed time between draw call
        this.deltaTime = this.deltaTimeMS / 1000;

        if (this.deltaTimeMS > this.fpsInterval && !this.hasStopped) { // if time is next frame
          this.updateCycle();
          this.then = this.now - (this.deltaTimeMS % this.fpsInterval); // get ready for next ani frame
        }
      } catch(err) {
        return console.error(err); // stop animation if error
      }

      requestAnimationFrame(this.animationDrawFunc);
    }

    // waits for the funs to be overided
    setTimeout(() => {
      // wait until preload has handled the async things
      this.preload().then(() => {
        this.setup();
        this.animationDrawFunc();
      });
    });
  }

  // functions for user to overide
  setup() {}
  draw() {}
  async preload() {}
  mousePressed() {}
  mouseMove() {}
  lockedMouseMove() {}

  updateCycle() {
    this.push();
    this.draw(); // the user draw it
    this.pop();
  }

  stop() {
    this.hasStopped = true;
  }

  start() {
    this.hasStopped = false;
    this.then = Date.now();
  }

  keyIsDown(key) {
    return this.keyPressingDict[key];
  }

  keyCodeIsDown(keyCode) {
    return this.keyCodePressingDict[keyCode];
  }

  lockMouse() {
    this.canvas.requestPointerLock();
  }

  unlockMouse() {
    document.exitPointerLock();
  }

  changeFps(fps) {
    this.fps = fps;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
  }

  fill(...args) {
    this.doFill = true;
    if (typeof args[0] == "string") { // if fill type is with string (hexidecimal, rgb(), ect.)
      this.ctx.fillStyle == args[0];
    } else if (typeof args[0] == "number") { // if args is with number
      if (args.length == 1) { // if only one argument
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
      } else if (args.length == 3) { // for all colours
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
      } else if (args.length >= 4) { // with alpha
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
      }
    }
  }

  stroke(...args) {
    this.doStroke = true;
    if (typeof args[0] == "string") { // if fill type is with string (hexidecimal, rgb(), ect.)
      this.ctx.strokeStyle == args[0];
    } else if (typeof args[0] == "number") { // if args is with number
      if (args.length == 1) { // if only one argument
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
      } else if (args.length == 3) { // for all colours
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
      } else if (args.length >= 4) { // with alpha
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
      }
    }
  }

  noFill() {
    this.doFill = false;
  }

  noStroke() {
    this.doStroke = false;
  }

  strokeWeight(s) {
    this.ctx.lineWidth = s;
  }

  rect(x, y, width, height) {
    if (this.doFill) this.ctx.fillRect(x, y, width, height);
    if (this.doStroke) this.ctx.strokeRect(x, y, width, height);
  }

  triangle(...args) {
    this.ctx.beginPath();
    if (args[0] instanceof Vector) {
      this.ctx.moveTo(args[0].x, args[0].y);
      this.ctx.lineTo(args[1].x, args[1].y);
      this.ctx.lineTo(args[2].x, args[2].y);
      this.ctx.closePath(args[0].x, args[0].y);
    } else if (typeof args[0] == "number") {
      this.ctx.moveTo(args[0], args[1]);
      this.ctx.lineTo(args[2], args[3]);
      this.ctx.lineTo(args[4], args[5]);
      this.ctx.closePath(args[0], args[1].y);
    }

    if (this.doFill) this.ctx.fill();
    if (this.doStroke) this.ctx.stroke();
  }

  triangleInflate(v1, v2, v3) {
    // calculate middle
    const center = new Vector(v1.x + v2.x + v3.x, v1.y + v2.y + v3.y).div(3);
    v1 = Vector.sub(v1, center);
    v2 = Vector.sub(v2, center);
    v3 = Vector.sub(v3, center);
      
    // inflate tri by 1 px
    this.triangle(v1.setMag(v1.mag() + 1).add(center), v2.setMag(v2.mag() + 1).add(center), v3.setMag(v3.mag() + 1).add(center));
  }

  point(x, y) {
    this.rect(x, y, 1, 1);
  }

  // make a rectangle that fills the screen (clears it)
  background(...args) {
    this.push(); 
    this.fill(...args);
    this.noStroke();
    this.rect(0, 0, this.width, this.height);
    this.pop();
  }

  translate(x, y = 0) {
    this.ctx.translate(x, y);
  }

  rotate(x) {
    this.ctx.rotate(x * Math.PI / 180);
  }

  scale(x, y = 0) {
    this.ctx.scale(x, y);
  }

  // push and pop like p5
  push() {
    this.prevDoFill = this.doFill;
    this.prevDoStroke = this.doStroke;
    this.ctx.save();
  }

  pop() {
    this.doFill = this.prevDoFill;
    this.doStroke = this.prevDoStroke;
    this.ctx.restore();
  }
}