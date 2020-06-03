/* 
  The hlp.js library by Calbabreaker. 
  Free to use. GPL-3.0 
*/

const hlp = {};

// some constants
hlp.FULL = 0x00;

/* scripts/../src/math/additions.js from hlp.js */

// the default math object with some extra functions
hlp.math = {};

hlp.math.TWO_PI = hlp.math.PI * 2;
hlp.math.FOUR_PI = hlp.math.PI * 4;
hlp.math.HALF_PI = hlp.math.PI / 2;
hlp.math.QUARTER_PI = hlp.math.PI / 4;

// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach((funcName) => {
  hlp.math[funcName] = window.Math[funcName];
});

hlp.math.map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

hlp.math.toRadians = (degrees) => {
  return (degrees * hlp.math.PI) / 180;
};

hlp.math.toDegrees = (radians) => {
  return radians * (180 / hlp.math.PI);
};

hlp.math.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.math.constrain = (n, low, high) => {
  return hlp.math.max(hlp.math.min(n, high), low);
};

hlp.random = (min, max) => {
  return Math.random() * (min - max) + max;
};

/* scripts/../src/math/matrix.js from hlp.js */

// This creates a multi dimensional array and stores it in this.data
// By Calbabreaker

hlp.Matrix = class Matrix {
  constructor(rows = 0, cols = 0) {
    if (rows instanceof Array) {
      // create a new hlp.Matrix with data
      this.data = rows;
      this.rows = this.data.length;
      this.cols = this.data[0].length;
    } else {
      // creates a new hlp.Matrix that is filled with 0s
      this.rows = rows;
      this.cols = cols;
      this.data = new Array(rows).fill().map(() => new Array(cols).fill(0));
    }
  }

  static add(a, b) {
    //same as normal add but creates new matrix
    return new hlp.Matrix(a.rows, a.cols).add(b);
  }

  add(toAdd) {
    // check if is matrix then add matrix with hadamard else add number to every element
    if (toAdd instanceof hlp.Matrix) {
      if (this.cols !== toAdd.cols || this.rows !== toAdd.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val + toAdd.data[i][j]);
    } else if (typeof toAdd == "number") {
      return this.map((val) => val + toAdd);
    } else {
      throw new Error("Did not provide valid data for parameter toAdd!");
    }
  }

  static sub(a, b) {
    return new hlp.Matrix(a.rows, a.cols).sub(b);
  }

  sub(toSub) {
    if (toSub instanceof hlp.Matrix) {
      if (this.cols !== toSub.cols || this.rows !== toSub.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val - toSub.data[i][j]);
    } else if (typeof toSub == "number") {
      return this.map((val) => val - toSub);
    } else {
      throw new Error("Did not provide valid data for parameter toSub!");
    }
  }

  static dotMult(a, b) {
    // multiplies with the dot product
    if (a.cols !== b.rows) throw new Error("hlp.Matrix a cols must match matrix b rows!");

    return new hlp.Matrix(a.rows, b.cols).map((val, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) sum += a.data[i][k] * b.data[k][j];
      return sum;
    });
  }

  static multVector(vec, matrix) {
    if (!(vec instanceof hlp.Vector)) throw new Error("vec must be a vector");
    if (matrix.cols != 4 || matrix.rows != 4) throw new Error("matrix must have 4 cols and 4 rows!");

    const newVec = new hlp.Vector(vec.x, vec.y, vec.z);
    newVec.x = vec.x * matrix.get(0, 0) + vec.y * matrix.get(1, 0) + vec.z * matrix.get(2, 0) + matrix.get(3, 0);
    newVec.y = vec.x * matrix.get(0, 1) + vec.y * matrix.get(1, 1) + vec.z * matrix.get(2, 1) + matrix.get(3, 1);
    newVec.z = vec.x * matrix.get(0, 2) + vec.y * matrix.get(1, 2) + vec.z * matrix.get(2, 2) + matrix.get(3, 2);
    const w = vec.x * matrix.get(0, 3) + vec.y * matrix.get(1, 3) + vec.z * matrix.get(2, 3) + matrix.get(3, 3);

    if (w != 0) newVec.div(w);
    return newVec;
  }

  static quickInverse(m) {
    // only for rotation/translation matrixs
    const matrix = new hlp.Matrix([
      [m.get(0, 0), m.get(1, 0), m.get(2, 0), 0],
      [m.get(0, 1), m.get(1, 1), m.get(2, 1), 0],
      [m.get(0, 2), m.get(1, 2), m.get(2, 2), 0],
      [0, 0, 0, 0],
    ]);

    matrix.set(3, 0, -(m.get(3, 0) * matrix.get(0, 0) + m.get(3, 1) * matrix.get(1, 0) + m.get(3, 2) * matrix.get(2, 0)));
    matrix.set(3, 1, -(m.get(3, 0) * matrix.get(0, 1) + m.get(3, 1) * matrix.get(1, 1) + m.get(3, 2) * matrix.get(2, 1)));
    matrix.set(3, 2, -(m.get(3, 0) * matrix.get(0, 2) + m.get(3, 1) * matrix.get(1, 2) + m.get(3, 2) * matrix.get(2, 2)));
    matrix.set(3, 3, 1);
    return matrix;
  }

  static mult(a, b) {
    return new hlp.Matrix(a.rows, a.cols).mult(b);
  }

  mult(toMult) {
    if (toMult instanceof hlp.Matrix) {
      if (this.cols !== toMult.cols || this.rows !== toMult.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val * toMult.data[i][j]);
    } else if (typeof toMult == "number") {
      return this.map((val) => val * toMult);
    } else {
      throw new Error("Did not provide valid data for parameter toMult!");
    }
  }

  static div(a, b) {
    return new hlp.Matrix(a.rows, a.cols).div(b);
  }

  div(toDiv) {
    if (toDiv instanceof hlp.Matrix) {
      if (this.cols !== toDiv.cols || this.rows !== toDiv.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val / toDiv.data[i][j]);
    } else if (typeof toDiv == "number") {
      return this.map((val) => val / toDiv);
    } else {
      throw new Error("Did not provide valid data for parameter toDiv!");
    }
  }

  randomize(min = 0, max = 1) {
    // sets every element to random number between min and max
    return this.map(() => hlp.random(min, max));
  }

  randomizeGuassian(mean = 0, sd = 1) {
    // uses p5 randomGaussian function (to lazzy to make one) to set every val in matrix
    if (typeof p5 === "undefined") throw new Error("Cant use randomGaussian (no p5)");
    return this.map(() => randomGaussian(mean, sd));
  }

  max() {
    // gets the maxium val in matrix
    let maxValue = 0;
    hlp.Matrix.map(this, (val) => {
      if (val > maxValue) maxValue = val;
    });

    return maxValue;
  }

  sum() {
    // gets the sum of all vals in matrix
    let sum = 0;
    hlp.Matrix.map(this, (val) => (sum += val));
    return sum;
  }

  exp() {
    // aplies Math.exp (e^2) to all vals in matrix
    return this.map(Math.exp);
  }

  floor() {
    // floors every val in matrix
    return this.map(Math.floor);
  }

  fill(n) {
    // sets every val in matrix to n
    return this.map(() => n);
  }

  set(row, col, val) {
    this.data[row][col] = val;
    return this;
  }

  get(row, col) {
    return this.data[row][col];
  }

  constrain(min, max) {
    // constrains every val in matrix
    return this.map((val) => Math.min(Math.max(val, min), max));
  }

  softmax() {
    // uses softmax in matrix
    this.sub(this.max()).exp();
    return this.div(this.sum());
  }

  map(func) {
    // Applies function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }

    return this;
  }

  static map(matrix, func) {
    // like normal map but creates new matrix
    return new hlp.Matrix(matrix.rows, matrix.cols).map((val, i, j) => func(matrix.data[i][j], i, j));
  }

  static transpose(matrix) {
    // basically rotates the matrix
    return new hlp.Matrix(matrix.cols, matrix.rows).map((val, i, j) => matrix.data[j][i]);
  }

  log() {
    // logs as a table
    console.table(this.data);
    return this;
  }

  copy() {
    return hlp.Matrix.map(this, (val) => val);
  }

  toArray() {
    // creates long big array from matrix
    return this.copy().data;
  }

  static createFromVector(vector) {
    return new hlp.Matrix([[vector.x], [vector.y], [vector.z], [0]]);
  }

  toVector() {
    if (this.rows >= 3) {
      return new hlp.Vector(this.data[0][0], this.data[1][0], this.data[2][0]);
    } else throw new Error("hlp.Matrix cannot be converted to a vector");
  }

  // down here are functions that create matrixs that can be used for multipliying
  static createIdentity() {
    return new hlp.Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationX(angle) {
    return new hlp.Matrix([
      [1, 0, 0, 0],
      [0, Math.cos(angle), Math.sin(angle), 0],
      [0, -Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationY(angle) {
    return new hlp.Matrix([
      [Math.cos(angle), 0, Math.sin(angle), 0],
      [0, 1, 0, 0],
      [-Math.sin(angle), 0, Math.cos(angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationZ(angle) {
    return new hlp.Matrix([
      [Math.cos(angle), Math.sin(angle), 0, 0],
      [-Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  static createTranslation(x, y, z) {
    return new hlp.Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [x, y, z, 1],
    ]);
  }

  static createProjectionOrtho() {
    return new hlp.Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  }

  static createProjectionPerspect(fovDegrees, aspectRatio, near, far) {
    const fovRadians = hlp.math.toRadians(fovDegrees);
    return new hlp.Matrix([
      [aspectRatio * fovRadians, 0, 0, 0],
      [0, fovRadians, 0, 0],
      [0, 0, far / (far - near), 1],
      [0, 0, (-far * near) / (far - near), 0],
    ]);
  }

  static createPointAt(pos, target, up) {
    const newForward = hlp.Vector.sub(target, pos).normalise();
    const newUp = hlp.Vector.sub(up, hlp.Vector.mult(newForward, up.dotProduct(newForward))).normalise();
    const newRight = hlp.Vector.crossProduct(newUp, newForward);
    return new hlp.Matrix([
      [newRight.x, newRight.y, newRight.z],
      [newUp.x, newUp.y, newUp.z],
      [newForward.x, newForward.y, newForward.z],
      [pos.x, pos.y, pos.z],
    ]);
  }
};

/* scripts/../src/math/vector.js from hlp.js */

// a vector for storing positions and doing math with it

hlp.Vector = class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(val) {
    // adds every axis with a number or a vector
    if (val instanceof hlp.Vector) (this.x += val.x), (this.y += val.y), (this.z += val.z);
    else (this.x += val), (this.y += val), (this.z += val);
    return this;
  }

  static add(vec, val) {
    // same as normal add but creates a new vector
    return vec.copy().add(val);
  }

  sub(val) {
    if (val instanceof hlp.Vector) (this.x -= val.x), (this.y -= val.y), (this.z -= val.z);
    else (this.x -= val), (this.y -= val), (this.z -= val);
    return this;
  }

  static sub(vec, val) {
    return vec.copy().sub(val);
  }

  div(val) {
    if (val instanceof hlp.Vector) (this.x /= val.x), (this.y /= val.y), (this.z /= val.z);
    else (this.x /= val), (this.y /= val), (this.z /= val);
    return this;
  }

  static div(vec, val) {
    return vec.copy().div(val);
  }

  mult(val) {
    if (val instanceof hlp.Vector) (this.x *= val.x), (this.y *= val.y), (this.z *= val.z);
    else (this.x *= val), (this.y *= val), (this.z *= val);
    return this;
  }

  static mult(vec, val) {
    return vec.copy().mult(val);
  }

  static crossProduct(v1, v2) {
    const vector = new hlp.Vector();
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
  }

  dotProduct(vec2) {
    return this.x * vec2.x + this.y * vec2.y + this.z * vec2.z;
  }

  copy() {
    return new hlp.Vector(this.x, this.y, this.z);
  }

  set(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  magSq() {
    // gets the length of the vector squared
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  mag() {
    // gets the length of the vector
    return hlp.math.sqrt(this.magSq());
  }

  normalise() {
    // normalises the vector (bewtween 0, 1)
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  static normalise(vec) {
    return vec.copy().normalise();
  }

  setMag(len) {
    // set the length of the vector
    return this.normalise().mult(len);
  }

  heading() {
    const h = hlp.math.atan2(this.y, this.x);
    return hlp.math.toDegrees(h);
  }

  rotate(a) {
    const newHeading = hlp.math.toRadians(this.heading() + a);
    const mag = this.mag();
    this.x = hlp.math.cos(newHeading) * mag;
    this.y = hlp.math.sin(newHeading) * mag;
    return this;
  }

  static fromAngle(angle, length = 1) {
    angle = hlp.math.toRadians(angle);
    return new hlp.Vector(length * hlp.math.cos(angle), length * hlp.math.sin(angle), 0);
  }

  // down here contains functions useful for 3d
  static intersectPlane(planePoint, planeNormal, lineStart, lineEnd) {
    planeNormal = hlp.Vector.normalise(planeNormal);
    const planeDirection = -planeNormal.dotProduct(planePoint);
    const ad = lineStart.dotProduct(planeNormal);
    const bd = lineEnd.dotProduct(planeNormal);
    const t = (-planeDirection - ad) / (bd - ad);
    const newLine = hlp.Vector.sub(lineEnd, lineStart).mult(t).add(lineStart);
    return newLine;
  }
};

/* scripts/../src/graphics/canvas.js from hlp.js */

// the canvas object for canvas drawing
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

hlp.Canvas = class Canvas {
  constructor(width = 400, height = 400, extra) {
    // initialize variables
    if (width === hlp.FULL) {
      if (extra != null) this.aspectRatio = new hlp.Vector(extra / height, 1);
      this.isFull = true;
      this._calcResize();
    } else {
      this.width = width;
      this.height = height;
    }

    this._doFill = true;
    this._doStroke = true;
    this._prevDoFills = [];
    this._prevDoStrokes = [];
    this._firstPosShapes = null;

    this.frameCount = 0;
    this.targetFPS = 60;
    this.hasStopped = false;
    this.fpsInterval = 1000 / this.targetFPS;
    this.fps = this.targetFPS;

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
    this._then = Date.now();
    this._deltaTimeMS = 0;
    this.deltaTime = 0;
    this.mouse = new hlp.Vector(0, 0);
    this.mouseMovement = new hlp.Vector(0, 0);
    this.mouseIsLocked = false;

    if (this.isFull) {
      window.onresize = (event) => {
        this._calcResize();
      };
    }

    // gets the mouse pos
    document.body.addEventListener("mousemove", (event) => {
      this.mouse.set(event.clientX - this.clientRect.left, event.clientY - this.clientRect.top);
      this.mouseMovement.set(event.movementX, event.movementY);
      this.mouseMove();
      if (!this.mouseIsLocked) this.unlockedMouseMove();
      else this.lockedMouseMove();
    });

    document.addEventListener("pointerlockchange", () => (this.mouseIsLocked = !this.mouseIsLocked), false);
    document.addEventListener("mozpointerlockchange", () => (this.mouseIsLocked = !this.mouseIsLocked), false);

    document.body.addEventListener("mousedown", (event) => {
      this.mousePressed();
    });

    // add to dictionary on keydown and removes and keyup
    document.body.addEventListener("keydown", (event) => {
      this.keyPressingDict[event.key] = true;
      this.keyCodePressingDict[event.code] = true;
    });

    document.body.addEventListener("keyup", (event) => {
      this.keyPressingDict[event.key] = false;
      this.keyCodePressingDict[event.code] = false;
    });

    this.animationDrawFunc = () => {
      try {
        this._now = Date.now();
        this._deltaTimeMS = this._now - this._then; // get ellapsed time between draw call
        this.deltaTime = this._deltaTimeMS / 1000;

        if (this._deltaTimeMS > this.fpsInterval && !this.hasStopped) {
          // if time is next frame
          this.fps = 1000 / this._deltaTimeMS;
          this.updateCycle();
          this._then = this._now - (this._deltaTimeMS % this.fpsInterval); // get ready for next ani frame
        }
      } catch (err) {
        return console.error(err); // stop animation if error
      }

      requestAnimationFrame(this.animationDrawFunc);
    };

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
  unlockedMouseMove() {}

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
    this._then = Date.now();
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

  changeFPS(fps) {
    this.targetFPS = fps;
    this.fps = fps;
    this.fpsInterval = 1000 / fps;
    this._then = Date.now();
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
    this.ctx.rotate(x * hlp.math.toRadians());
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
      const aspectHeight = innerWidth / this.aspectRatio.x;
      if (aspectHeight < innerHeight) newInnerHeight = aspectHeight;
    }

    this.width = this.aspectRatio != null ? newInnerHeight * this.aspectRatio.x : innerWidth;
    this.height = newInnerHeight;
    if (this.canvas != null) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }
};

/* scripts/../src/graphics/meshes.js from hlp.js */

// a triangle
hlp.Triangle = class Triangle {
  constructor() {
    this.points = new Array(3); // points not created inline because it is neater that way
    this.illumination = 0;
  }

  static clipAgainstPlane(planePoint, planeNormal, inTri) {
    hlp.Vector.normalise(planeNormal);

    const insidePoints = [];
    const outsidePoints = [];

    // return signed shortest distance
    const dist = (point) => {
      return planeNormal.x * point.x + planeNormal.y * point.y + planeNormal.z * point.z - planeNormal.dotProduct(planePoint);
    };

    // get signed distacnce of each point in triangle to plane
    const d0 = dist(inTri.points[0]);
    const d1 = dist(inTri.points[1]);
    const d2 = dist(inTri.points[2]);

    if (d0 >= 0) insidePoints.push(inTri.points[0]);
    else outsidePoints.push(inTri.points[0]);
    if (d1 >= 0) insidePoints.push(inTri.points[1]);
    else outsidePoints.push(inTri.points[1]);
    if (d2 >= 0) insidePoints.push(inTri.points[2]);
    else outsidePoints.push(inTri.points[2]);

    // classify the triangle points (break them into smaller parts)
    if (insidePoints.length == 0) {
      // if all points is outside of plane
      return [];
    } else if (insidePoints.length == 3) {
      // if all points are inside of plane
      return [inTri];
    } else if (insidePoints.length == 1 && outsidePoints.length == 2) {
      // triangle should be clipped
      const outputTri = new hlp.Triangle();
      outputTri.illumination = inTri.illumination;
      outputTri.points[0] = insidePoints[0].copy();
      outputTri.points[1] = hlp.Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);
      outputTri.points[2] = hlp.Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[1]);
      return [outputTri];
    } else if (insidePoints.length == 2 && outsidePoints.length == 1) {
      // triangle should be clipped but now a quad
      const outputTri1 = new hlp.Triangle();
      const outputTri2 = new hlp.Triangle();
      outputTri1.illumination = inTri.illumination;
      outputTri2.illumination = inTri.illumination;

      outputTri1.points[0] = insidePoints[0].copy();
      outputTri1.points[1] = insidePoints[1].copy();
      outputTri1.points[2] = hlp.Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);

      outputTri2.points[0] = insidePoints[1].copy();
      outputTri2.points[1] = outputTri1.points[2].copy();
      outputTri2.points[2] = hlp.Vector.intersectPlane(planePoint, planeNormal, insidePoints[1], outsidePoints[0]);
      return [outputTri1, outputTri2];
    }
  }
};

hlp.Mesh = class Mesh {
  constructor(tris = []) {
    this.tris = tris;
  }

  static async loadFromFile(url) {
    if (url.split(".").pop() != "obj") throw new Error("Can only support obj models");
    // load using fetch
    const response = await fetch(url);
    const data = await response.text();

    const mesh = new hlp.Mesh();
    const vertices = []; // temperary pool of vertices
    data.split("\n").forEach((line) => {
      line = line.split(/ +/g); // split by spaces (uses regex to counteract double spaces)
      if (line[0] == "v") {
        // create the vertex
        vertices.push(new hlp.Vector(parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])));
      } else if (line[0] == "f") {
        // connect the faces using triangles with the vertices
        const triPts = [line[1].split(/\/+/g)[0], line[2].split(/\/+/g)[0], line[3].split(/\/+/g)[0]];
        const tri = new hlp.Triangle();
        tri.points[0] = vertices[parseInt(triPts[0]) - 1];
        tri.points[1] = vertices[parseInt(triPts[1]) - 1];
        tri.points[2] = vertices[parseInt(triPts[2]) - 1];
        mesh.tris.push(tri);
      }
    });

    return mesh;
  }
};

/* scripts/../src/graphics/rendererCPU.js from hlp.js */

hlp.RendererCPU = class RendererCPU {
  constructor(canvas) {
    this.c = canvas;

    this.rotation = 0;
    this.cameraPos = new hlp.Vector();
    this.lookDir = new hlp.Vector();
    this.yawY = 0;
    this.yawX = 0;

    // create light direction
    this.lightDirection = new hlp.Vector(0, 0, 1).normalise();

    // the projection matrix math
    this.near = 0.1;
    this.far = 1000;
    this.fov = 90;
    this.aspectRatio = this.c.height / this.c.width;
    this.projectionMatrix = hlp.Matrix.createProjectionPerspect(this.fov, this.aspectRatio, this.near, this.far);
  }

  draw(mesh) {
    this.c.push();
    this.c.noStroke();
    // this.c.stroke(255, 0, 0); // debug wireframe
    // this.rotation += 0.01;
    this.c.translate(this.c.width / 2, this.c.height / 2);
    this.c.scale(1, -1); // this flips the screen so y is correct
    this.rotation += 0.1;

    // let worldMatrix = Matrix.dotMult(Matrix.createRotationZ(this.rotation), Matrix.createRotationX(this.rotation)); // rotate
    // let worldMatrix = Matrix.dotMult(worldMatrix, Matrix.createTranslation(0, 0, 5)); // translate
    let worldMatrix = hlp.Matrix.createTranslation(0, 0, 5);

    const up = new hlp.Vector(0, 1, 0);
    let target = new hlp.Vector(0, 0, 1);
    const cameraRotation = hlp.Matrix.dotMult(hlp.Matrix.createRotationX(this.yawY), hlp.Matrix.createRotationY(this.yawX));
    this.lookDir = hlp.Matrix.multVector(target, cameraRotation);
    target = hlp.Vector.add(this.cameraPos, this.lookDir);
    const cameraMatrix = hlp.Matrix.createPointAt(this.cameraPos, target, up);
    const viewMatrix = hlp.Matrix.quickInverse(cameraMatrix);

    let trianglesToDraw = [];

    mesh.tris.forEach((tri, i) => {
      const newTri = new hlp.Triangle();

      // offset the pt and rotate it
      newTri.points[0] = hlp.Matrix.multVector(tri.points[0], worldMatrix);
      newTri.points[1] = hlp.Matrix.multVector(tri.points[1], worldMatrix);
      newTri.points[2] = hlp.Matrix.multVector(tri.points[2], worldMatrix);

      // calculate normals
      const line1 = hlp.Vector.sub(newTri.points[1], newTri.points[0]);
      const line2 = hlp.Vector.sub(newTri.points[2], newTri.points[0]);
      const normal = hlp.Vector.crossProduct(line1, line2).normalise(); // gets normal of triangle surface

      // get ray from camera
      const cameraRay = hlp.Vector.sub(newTri.points[0], this.cameraPos);

      // if ray is alligned with normal then the camera can see it
      if (normal.dotProduct(cameraRay) < 0) {
        // illumantion
        const dotProduct = normal.dotProduct(this.lightDirection);

        // convert from world to view scaleView
        newTri.points[0] = hlp.Matrix.multVector(newTri.points[0], viewMatrix);
        newTri.points[1] = hlp.Matrix.multVector(newTri.points[1], viewMatrix);
        newTri.points[2] = hlp.Matrix.multVector(newTri.points[2], viewMatrix);

        const clippedTris = hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, 0, 0.1), new hlp.Vector(0, 0, 1), newTri);

        clippedTris.forEach((clippedTri) => {
          const triProjected = new hlp.Triangle();
          // project into 2d view (camera) from 3d
          triProjected.points[0] = hlp.Matrix.multVector(clippedTri.points[0], this.projectionMatrix);
          triProjected.points[1] = hlp.Matrix.multVector(clippedTri.points[1], this.projectionMatrix);
          triProjected.points[2] = hlp.Matrix.multVector(clippedTri.points[2], this.projectionMatrix);
          triProjected.illumination = dotProduct;

          // offset into view space
          const offsetView = new hlp.Vector(1, 1, 0);
          triProjected.points[0].add(offsetView);
          triProjected.points[1].add(offsetView);
          triProjected.points[2].add(offsetView);

          const scaleView = new hlp.Vector(0.5 * this.c.width, 0.5 * this.c.height, 1);
          triProjected.points[0].mult(scaleView);
          triProjected.points[1].mult(scaleView);
          triProjected.points[2].mult(scaleView);

          // store the triangle to sort it
          trianglesToDraw.push(triProjected);
        });
      }
    });

    // sort them back to front (painter's algorithynm)
    trianglesToDraw.sort((a, b) => {
      const z1 = (a.points[0].z + a.points[1].z + a.points[2].z) / 3;
      const z2 = (b.points[0].z + b.points[1].z + b.points[2].z) / 3;
      return z2 - z1;
    });

    const descaleVector = new hlp.Vector(this.c.width / 2, this.c.height / 2);

    // draw them
    trianglesToDraw.forEach((triToDraw) => {
      // clip triangle agaist all four screen edges
      const triList = [];
      triList.push(triToDraw);
      for (let p = 0; p < 4; p++) {
        while (triList < 0) {
          // take triangle in front
          const test = triList[0];
          triList.shift();

          // test clip to edges
          switch (p) {
            case 0:
              triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, 0, 0), new hlp.Vector(0, 1, 0), test));
              break;
            case 1:
              triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, this.c.height - 1, 0), new Vector(0, -1, 0), test));
              break;
            case 2:
              triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, 0, 0), new hlp.Vector(1, 0, 0), test));
              break;
            case 3:
              triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(this.c.width - 1, 0, 0), new hlp.Vector(-1, 0, 0), test));
              break;
          }
        }
      }

      triList.forEach((tri) => {
        this.c.fill(tri.illumination * -255);
        this.c.triangleInflate(tri.points[0].sub(descaleVector), tri.points[1].sub(descaleVector), tri.points[2].sub(descaleVector));
      });
    });

    this.c.pop();
  }
};

/* scripts/../src/extra/audioSynth.js from hlp.js */

class AudioPlayer {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.reset();
  }

  play(freq, vol, wave, when = 0) {
    if (!this.hasResseted) return console.error("Make sure you reset the AudioPlayer before playing!");

    if (freq != null) this.setFreq(freq);
    if (wave != null) this.setWaveType(wave);
    if (vol != null) this.setVolume(vol);
    this.oscillator.start(when);

    this.hasResseted = false;
    return this;
  }

  stop(when = 0, useExpRamp = false) {
    if (useExpRamp) {
      this.gain.gain.setValueAtTime(this.gain.gain.value, this.context.currentTime);
      this.gain.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + when);
    }

    this.oscillator.stop(this.context.currentTime + when);
    return this;
  }

  reset(filter = this.context.destination) {
    this.gain = this.context.createGain();
    this.gain.connect(filter);
    this.oscillator = this.context.createOscillator();
    this.oscillator.connect(this.gain);
    this.compressor = this.context.createDynamicsCompressor();
    this.compressor.connect(this.context.destination);
    this.hasResseted = true;
    return this;
  }

  setWaveType(wave) {
    this.oscillator.type = wave;
    return this;
  }

  setFreq(freq) {
    this.oscillator.frequency.value = freq;
  }

  setVolume(vol) {
    this.gain.gain.value = vol;
    return this;
  }
}

/* scripts/../src/extra/dictionary.js from hlp.js */

hlp.Dictionary = class Dictionary {
  constructor() {
    this.data = {};
  }

  contains(key) {
    return this.data[key.toString()] != null;
  }

  get(key) {
    return this.data[key.toString()];
  }

  set(key, val) {
    this.data[key.toString()] = val;
    return this;
  }

  add(key, val) {
    this.data[key.toString()] = val;
    return this;
  }

  remove(key) {
    this.data[key.toString()] = null;
    return this;
  }
};
