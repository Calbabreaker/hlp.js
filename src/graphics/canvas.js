// the canvas object for canvas drawing

hlp.Canvas = class Canvas {
  constructor(width, height) {
    // initialize variables
    if (width === hlp.FULL) {
      if (height != null) this.aspectRatio = height;
      this.isFull = true;
      this._calcResize();
    } else {
      this.width = width || 400;
      this.height = height || 400;
      this.aspectRatio = this.height / this.width;
    }

    this._doFill = true;
    this._doStroke = true;
    this._prevDoFills = [];
    this._prevDoStrokes = [];
    this._firstPosShapes = null;

    // initialize the canvas (creates new one)
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "defaultCanvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;

    if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
    else return alert("Browser does not support the canvas.");
    document.body.appendChild(this.canvas); // adds to the body

    if (this.isFull) {
      window.addEventListener("resize", (event) => {
        this._calcResize();
      });
    }

    this.mouse = new hlp.Vector(0, 0);
    this.mouseMovement = new hlp.Vector(0, 0);

    document.body.addEventListener("mousemove", (event) => {
      const clientRect = this.canvas.getBoundingClientRect();
      this.mouse.set(event.clientX - clientRect.left, event.clientY - clientRect.top);
      this.mouseMovement.set(event.movementX, event.movementY);
    });
  }

  lockMouse() {
    this.canvas.requestPointerLock();
  }

  fill(...args) {
    this._doFill = true;
    if (typeof args[0] == "string") {
      // if fill type is with string (hexidecimal, rgb(), ect.)
      this.ctx.fillStyle == args[0];
    } else if (typeof args[0] == "number") {
      // if args is with number
      if (args.length == 1) {
        // if only one argument
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
      } else if (args.length == 3) {
        // for all colours
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
      } else if (args.length >= 4) {
        // with alpha
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
      } else throw new Error("Invalid param for fill!");
    } else throw new Error("Invalid param for fill!");
  }

  stroke(...args) {
    this._doStroke = true;
    if (typeof args[0] == "string") {
      // if fill type is with string (hexidecimal, rgb(), ect.)
      this.ctx.strokeStyle == args[0];
    } else if (typeof args[0] == "number") {
      // if args is with number
      if (args.length == 1) {
        // if only one argument
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
      } else if (args.length == 3) {
        // for all colours
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
      } else if (args.length >= 4) {
        // with alpha
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
      } else throw new Error("Invalid param for stroke!");
    } else throw new Error("Invalid param for stroke!");
  }

  noFill() {
    this._doFill = false;
  }

  noStroke() {
    this._doStroke = false;
  }

  strokeWeight(s) {
    this.ctx.lineWidth = s;
  }

  beginShape() {
    if (this._firstPosShapes != null) throw new Error("Cannot beginShape before closing/ending!");
    this.ctx.beginPath();
  }

  endShape(close = true) {
    if (this._firstPosShapes == null) throw new Error("Cannot endShape before begining one!");
    if (close) this.ctx.closePath(this._firstPosShapes.x, this._firstPosShapes.y);
    if (this._doFill) this.ctx.fill();
    if (this._doStroke) this.ctx.stroke();
    this._firstPosShapes = null;
  }

  vertex(x, y) {
    if (this._firstPosShapes == null) {
      this._firstPosShapes = new hlp.Vector(x, y);
      this.ctx.moveTo(x, y);
    } else this.ctx.lineTo(x, y);
  }

  rect(x, y, width, height) {
    if (this._doFill) this.ctx.fillRect(x, y, width, height);
    if (this._doStroke) this.ctx.strokeRect(x, y, width, height);
  }

  image(img, x, y, width = img.width, height = img.height) {
    this.ctx.drawImage(img, x, y, width, height);
  }

  triangle(...args) {
    this.beginShape();
    if (args[0] instanceof hlp.Vector) {
      this.vertex(args[0].x, args[0].y);
      this.vertex(args[1].x, args[1].y);
      this.vertex(args[2].x, args[2].y);
    } else if (typeof args[0] == "number") {
      this.vertex(args[0], args[1]);
      this.vertex(args[2], args[3]);
      this.vertex(args[4], args[5]);
    } else throw new Error("Invalid data for shape");

    this.endShape();
  }

  triangleInflate(v1, v2, v3) {
    // calculate middle
    const center = new hlp.Vector(v1.x + v2.x + v3.x, v1.y + v2.y + v3.y).div(3);
    v1 = hlp.Vector.sub(v1, center);
    v2 = hlp.Vector.sub(v2, center);
    v3 = hlp.Vector.sub(v3, center);

    // inflate tri by 1 px
    this.triangle(v1.setMag(v1.mag() + 1).add(center), v2.setMag(v2.mag() + 1).add(center), v3.setMag(v3.mag() + 1).add(center));
  }

  point(x, y) {
    this.rect(x, y, 1, 1);
  }

  line(...args) {
    this.beginShape();
    if (args[0] instanceof hlp.Vector) {
      this.vertex(args[0].x, args[0].y);
      this.vertex(args[1].x, args[1].y);
    } else if (typeof args[0] == "number") {
      this.vertex(args[0], args[1]);
      this.vertex(args[2], args[3]);
    } else throw new Error("Invalid data for line.");
    this.endShape(false);
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
    this.ctx.rotate(x * hlp.toRadians());
  }

  scale(x, y = 0) {
    this.ctx.scale(x, y);
  }

  // push and pop to restore and save states
  push() {
    this._prevDoFills.push(this._doFill);
    this._prevDoStrokes.push(this._doStroke);
    this.ctx.save();
  }

  pop() {
    this._doFill = this._prevDoFills.pop();
    this._doStroke = this._prevDoStrokes.pop();
    this.ctx.restore();
  }

  _calcResize() {
    let newInnerHeight = innerHeight;
    if (this.aspectRatio != null) {
      const aspectHeight = innerWidth / this.aspectRatio;
      if (aspectHeight < innerHeight) newInnerHeight = aspectHeight;
    }

    this.width = this.aspectRatio != null ? newInnerHeight * this.aspectRatio : innerWidth;
    this.height = newInnerHeight;
    if (this.canvas != null) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }
};
