/* 
  The hlp.js library by Calbabreaker. 
  Free to use. GPL-3.0 
*/

const hlp = {};

// some constants
hlp.FULL = 0x00;
hlp.hlp2D = 0x01;
hlp.hlpWEBGL = 0x02;

hlp.CENTER = "center";
hlp.LEFT = "left";
hlp.RIGHT = "right";
hlp.START = "end";
hlp.END = "end";

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
    return this.map(() => hlp.randomGaussian(mean, sd));
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
    return this.map(hlp.exp);
  }

  floor() {
    // floors every val in matrix
    return this.map(hlp.floor);
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
    return this.map((val) => hlp.min(hlp.max(val, min), max));
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

  toArray(array1d = false) {
    if (array1d) {
      const array = [];
      this.data.forEach((cols) => array.push(...cols));
      return array;
    } else return this.copy().data;
  }

  static createFromVector(vector) {
    return new hlp.Matrix([[vector.x], [vector.y], [vector.z], [0]]);
  }

  toVector() {
    if (this.rows >= 3) {
      return new hlp.Vector(this.data[0][0], this.data[1][0], this.data[2][0]);
    } else throw new Error("hlp.Matrix cannot be converted to a vector!");
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
      [0, hlp.cos(angle), hlp.sin(angle), 0],
      [0, -hlp.sin(angle), hlp.cos(angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationY(angle) {
    return new hlp.Matrix([
      [hlp.cos(angle), 0, hlp.sin(angle), 0],
      [0, 1, 0, 0],
      [-hlp.sin(angle), 0, hlp.cos(angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationZ(angle) {
    return new hlp.Matrix([
      [hlp.cos(angle), hlp.sin(angle), 0, 0],
      [-hlp.sin(angle), hlp.cos(angle), 0, 0],
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
    const fovRadians = hlp.toRadians(fovDegrees);
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
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  mag() {
    // gets the length of the vector
    return hlp.sqrt(this.magSq());
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

  dist(vec) {
    return hlp.dist(this.x, this.y, this.z, vec.x, vec.y, vec.z);
  }

  static dist(vec1, vec2) {
    return vec1.dist(vec2);
  }

  setMag(len) {
    // set the length of the vector
    return this.normalise().mult(len);
  }

  heading() {
    const h = hlp.atan2(this.y, this.x);
    return hlp.toDegrees(h);
  }

  rotate(a) {
    const newHeading = hlp.toRadians(this.heading() + a);
    const mag = this.mag();
    this.x = hlp.cos(newHeading) * mag;
    this.y = hlp.sin(newHeading) * mag;
    return this;
  }

  rotateTo(a) {
    const heading = this.heading();
    const mag = this.mag();
    this.x = hlp.cos(heading) * mag;
    this.y = hlp.sin(heading) * mag;
    return this;
  }

  static fromAngle(angle, length = 1) {
    angle = hlp.toRadians(angle);
    return new hlp.Vector(length * hlp.cos(angle), length * hlp.sin(angle), 0);
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

/* scripts/../src/math/basic.js from hlp.js */

// the default math object with some extra functions
// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach((funcName) => {
  hlp[funcName] = window.Math[funcName];
});

hlp.TWO_PI = hlp.PI * 2;
hlp.FOUR_PI = hlp.PI * 4;
hlp.HALF_PI = hlp.PI / 2;
hlp.QUARTER_PI = hlp.PI / 4;

hlp._y2Guass = 0;

hlp.map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

hlp.toRadians = (degrees) => {
  return (degrees * hlp.PI) / 180;
};

hlp.toDegrees = (radians) => {
  return radians * (180 / hlp.PI);
};

hlp.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.constrain = (n, low, high) => {
  return hlp.max(hlp.min(n, high), low);
};

hlp.random = (min, max) => {
  return Math.random() * (min - max) + max;
};

hlp.dist = (...args) => {
  if (args.length == 4) {
    // 2d
    return hlp.hypot(args[2] - args[0], args[3] - args[1]);
  } else if (args.length == 6) {
    // 3d
    return hlp.hypot(args[3] - args[0], args[4] - args[1], args[5] - args[2]);
  }
};

// randomGaussian with mean and standard distribution
hlp.randomGaussian = (mean = 0, sd = 1) => {
  let y1, x1, x2, w;
  if (this._gaussianPrev) {
    y1 = hlp._y2Guass;
    hlp._gaussianPrev = false;
  } else {
    do {
      x1 = hlp.random(0, 2) - 1;
      x2 = hlp.random(0, 2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = hlp.sqrt((-2 * hlp.log(w)) / w);
    y1 = x1 * w;
    hlp._y2Guass = x2 * w;
    hlp._gaussianPrev = true;
  }

  return y1 * sd + mean;
};

/* scripts/../src/graphics/canvas.js from hlp.js */

// the canvas object for canvas drawing

hlp.Canvas = class Canvas {
  constructor(width, height, renderer = hlp.hlp2D) {
    // initialize variables
    if (width === hlp.FULL) {
      if (height != null) this.aspectRatio = height;
      this.isFull = true;
      this._resizeFull();
    } else {
      this.width = width || 400;
      this.height = height || 400;
      this.aspectRatio = this.height / this.width;
    }

    // initialize the canvas (creates new one)
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("hlpDefaultCanvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;

    if (renderer == hlp.hlp2D) {
      this._renderer = new hlp.Renderer2D(this.canvas);
    } else if (renderer == hlp.hlpWEBGL) {
      this._renderer = new hlp.RendererGL(this.canvas);
    } else return console.error("Unknown renderer!");

    document.body.appendChild(this.canvas); // adds to the body

    if (this.isFull) {
      window.addEventListener("resize", (event) => {
        this._resizeFull();
      });
    }

    this.mouse = new hlp.Vector(0, 0);
    this.mouseMovement = new hlp.Vector(0, 0);

    document.body.addEventListener("mousemove", (event) => {
      const clientRect = this.canvas.getBoundingClientRect();
      this.mouse.set(event.clientX - clientRect.left, event.clientY - clientRect.top);
      this.mouseMovement.set(event.movementX, event.movementY);
    });

    // get all functions of renderer
    Object.getOwnPropertyNames(Object.getPrototypeOf(this._renderer))
      .filter((p) => p[0] != "_")
      .forEach((func) => {
        this[func] = (...args) => this._renderer[func](...args);
      });
  }

  lockMouse() {
    this.canvas.requestPointerLock();
  }

  resizeCanvas(w, h) {
    if (this.isFull) this.aspectRatio = this.height / this.width;
    this._renderer._rendererResize(w, h);

    this.width = w;
    this.height = h;
    if (this.cavnas != null) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  _resizeFull() {
    let newInnerHeight = innerHeight;
    if (this.aspectRatio != null) {
      const aspectHeight = innerWidth / this.aspectRatio;
      if (aspectHeight < innerHeight) newInnerHeight = aspectHeight;
    }

    this.resizeCanvas(this.aspectRatio != null ? newInnerHeight * this.aspectRatio : innerWidth, newInnerHeight);
  }
};

/* scripts/../src/graphics/renderer2D.js from hlp.js */

hlp.Renderer2D = class Renderer2D {
  constructor(canvas) {
    this.canvas = canvas;

    if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
    else return alert("Browser does not support the canvas!");
    if (this.ctx == null) return alert("Browser does not support the canvas!");

    this._doFill = true;
    this._doStroke = true;
    this._firstPosShape = new hlp.Vector(0, 0);
    this._firstPosShape._using = false;
    this._font = "Arial";
    this._fontSize = 10;
    this._prevStates = [];

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  fill(...args) {
    this._doFill = true;
    if (typeof args[0] == "string") {
      // if fill type is with string (hexidecimal, rgb(), ect.)
      this.ctx.fillStyle == args[0];
    } else if (args[0] instanceof hlp.Colour) {
      this.ctx.fillStyle = `rgb(${args[0].r}, ${args[0].g}, ${args[0].b})`;
    } else {
      if (args.length == 1) {
        // if only one argument
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
      } else if (args.length == 3) {
        // for all colours
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
      } else if (args.length >= 4) {
        // with alpha
        this.ctx.fillStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
      }
    }
  }

  stroke(...args) {
    // same thing as fill
    this._doStroke = true;
    if (typeof args[0] == "string") {
      this.ctx.strokeStyle == args[0];
    } else if (args[0] instanceof hlp.Colour) {
      this.ctx.strokeStyle = `rgb(${args[0].r}, ${args[0].g}, ${args[0].b})`;
    } else {
      if (args.length == 1) {
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
      } else if (args.length == 3) {
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
      } else if (args.length >= 4) {
        this.ctx.strokeStyle = `rgb(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
      }
    }
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
    if (this._firstPosShape._using) throw new Error("Cannot begin shape before closing!");
    this.ctx.beginPath();
  }

  endShape(close = true) {
    if (!this._firstPosShape._using) throw new Error("Cannot close shape before beggining!");
    if (close) this.ctx.closePath(this._firstPosShape.x, this._firstPosShape.y);
    if (this._doFill) this.ctx.fill();
    if (this._doStroke) this.ctx.stroke();
    this._firstPosShape._using = false;
  }

  vertex(x, y) {
    if (x instanceof hlp.Vector) (y = x.y), (x = x.x);
    if (!this._firstPosShape._using) {
      this._firstPosShape.set(x, y);
      this._firstPosShape._using = true;
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

  triangle(x1, y1, x2, y2, x3, y3) {
    this.beginShape();
    if (x1 instanceof hlp.Vector) {
      this.vertex(x1);
      this.vertex(y1);
      this.vertex(x2);
    } else {
      this.vertex(x1, y1);
      this.vertex(x2, y2);
      this.vertex(x3, y3);
    }

    this.endShape();
  }

  triangleInflate(x1, y1, x2, y2, x3, y3) {
    let v1, v2, v3;
    if (typeof x1 == "number") {
      v1 = new hlp.Vector(x1, y1);
      v2 = new hlp.Vector(x2, y2);
      v3 = new hlp.Vector(x3, y3);
    }

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

  line(x1, y1, x2, y2) {
    this.beginShape();
    if (x1 instanceof hlp.Vector) {
      this.vertex(x1);
      this.vertex(y1);
    } else {
      this.vertex(x1, y1);
      this.vertex(x2, y2);
    }

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
    this.ctx.rotate(hlp.toRadians(x));
  }

  scale(x, y = 0) {
    this.ctx.scale(x, y);
  }

  // push and pop to restore and save states
  push() {
    this._prevStates.push({
      _doFill: this._doFill,
      _doStroke: this._doStroke,
      _font: this._font,
      _fontSize: this._fontSize,
    });

    this.ctx.save();
  }

  pop() {
    Object.assign(this, this._prevStates.pop());
    this.ctx.restore();
  }

  // TEXT STUFF DOWN HERE
  text(str, x, y) {
    this.ctx.font = `${this._fontSize}px ${this._font}`;
    this.ctx.fillText(str, x, y);
  }

  textFont(font) {
    this._font = font;
  }

  textSize(size) {
    this._fontSize = size;
  }

  textAlign(mode) {
    this.ctx.textAlign = mode;
  }

  _rendererResize(w, h) {
    this.width = w;
    this.hirght = h;
  }
};

/* scripts/../src/graphics/rendererGL.js from hlp.js */

class RendererGL {
  constructor(canvas) {
    this.canvas = canvas;

    this._doFill = true;
    this._doStroke = true;
    this._prevStates = [];

    this.gl = canvas.getContext("webgl");
    if (!this.gl) {
      console.warn("WebGL context not supported, falling back on experimental.");
      this.gl = canvas.getContext("experimental-webgl");
    }

    if (!this.gl) return alert("Browser does not support WebGL!");
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

  background() {}
}

/* scripts/../src/graphics/colour.js from hlp.js */

hlp.Colour = class Colour {
  constructor(r, b, g) {
    this.r = r;
    this.b = b;
    this.g = g;
  }

  set(r = this.r, b = this.b, g = this.g) {
    this.r = r;
    this.b = b;
    this.g = g;
  }
};

/* scripts/../src/net/loaders.js from hlp.js */

// loadind functions that uses promises

hlp.loadString = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

hlp.loadJSON = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

hlp.loadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
};

hlp.loadBytes = (url) => {
  return new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = this.result;
      const array = new Uint8Array(arrayBuffer);
      resolve(array);
    };

    const fileData = await hlp.loadStrings(url);
    reader.readAsArrayBuffer(new File([fileData], url));
  });
};

hlp.loadSound = (url) => {
  return new Promise((resolve) => {
    resolve(new Audio(url)); // idk if this works
  });
};

hlp.loadFont = async (url) => {
  const fontName = url.split("/").pop().split(".")[0];
  const font = new FontFace(fontName, `url(${url})`);
  const fontFace = await font.load();
  document.fonts.add(fontFace);
  return fontName;
};

/* scripts/../src/game/calls.js from hlp.js */

// contains calls for preload, setup and draw and more

// wait for everything to be loaded
window.addEventListener("load", () => {
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  hlp.keyPressingDict = {};
  hlp.keyCodePressingDict = {};

  // handle all the calls
  hlp._timeLastFrame = performance.now();
  hlp.deltaTime = 0;
  hlp.mouseIsLocked = false;

  hlp.frameCount = 0;
  hlp.targetFPS = 60;
  hlp.looping = true;
  hlp.fpsInterval = 1000 / hlp.targetFPS;
  hlp.fps = 0;

  document.addEventListener("mousemove", (event) => {
    if (!hlp.mouseIsLocked) hlp.unlockedMouseMove();
    else hlp.lockedMouseMove();
  });

  document.addEventListener("pointerlockchange", () => (hlp.mouseIsLocked = !hlp.mouseIsLocked), false);
  document.addEventListener("mozpointerlockchange", () => (hlp.mouseIsLocked = !hlp.mouseIsLocked), false);

  document.addEventListener("mousedown", (event) => {
    hlp.mousePressed();
  });

  // add to dictionary on keydown and removes and keyup
  document.addEventListener("keydown", (event) => {
    hlp.keyPressingDict[event.key] = true;
    hlp.keyCodePressingDict[event.code] = true;
    hlp.keyPressed();
  });

  document.addEventListener("keyup", (event) => {
    hlp.keyPressingDict[event.key] = false;
    hlp.keyCodePressingDict[event.code] = false;
    hlp.keyReleased();
  });

  hlp._draw = () => {
    if (hlp.looping) requestAnimationFrame(hlp._draw); // request another frame

    try {
      const now = performance.now();
      const deltaTimeMS = now - hlp._timeLastFrame; // get ellapsed time between draw call

      const elipson = 5;
      if (deltaTimeMS > hlp.fpsInterval - elipson) {
        // if time is next frame
        hlp.frameCount++;
        hlp.fps = 1000 / deltaTimeMS; // calculate real fps
        hlp.deltaTime = deltaTimeMS / 1000; // calculate deltaTime in secs
        hlp.draw(); // the user draw it
        hlp._timeLastFrame = now;
      }
    } catch (err) {
      hlp.looping = false;
      console.error(err); // stop animation if error
    }
  };

  // create loading text if haven't
  let loading = document.getElementById("hlp_loading");
  if (loading == null) {
    loading = document.createElement("p");
    loading.innerHTML = "Loading...";
    loading.id = "hlp_loading";
    document.body.appendChild(loading);
  }

  loading.style.position = "absolute";
  loading.style.top = "10px";
  loading.style.left = "10px";

  // wait until preload has handled the async things
  hlp.preload().then(() => {
    document.body.removeChild(loading);
    hlp.setup();
    hlp._draw();
  });
});

hlp.stop = () => {
  hlp.looping = false;
};

hlp.start = () => {
  hlp.looping = true;
  requestAnimationFrame(hlp._draw);
};

hlp.keyIsDown = (key) => {
  return hlp.keyPressingDict[key];
};

hlp.keyCodeIsDown = (keyCode) => {
  return hlp.keyCodePressingDict[keyCode];
};

hlp.changeFPS = (fps) => {
  hlp.targetFPS = fps;
  hlp.fps = fps;
  hlp.fpsInterval = 1000 / fps;
  hlp._timeLastFrame = performance.now();
};

hlp.unlockMouse = () => {
  document.exitPointerLock();
};

// functions for user to overide
hlp.setup = () => {};
hlp.draw = () => {};
hlp.preload = async () => {};
hlp.mousePressed = () => {};
hlp.mouseMove = () => {};
hlp.keyPressed = () => {};
hlp.keyReleased = () => {};
hlp.lockedMouseMove = () => {};
hlp.unlockedMouseMove = () => {};

/* scripts/../src/game/controller2D.js from hlp.js */

hlp.Controller2D = class Controller2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.bodies = [];
  }

  remove(body) {
    // swaps last element of array to the body index and removes last (should be O(1))
    const lastBody = this.bodies[this.bodies.length - 1];
    this.bodies[body._index] = lastBody;
    lastBody._index = body._index;
    this.bodies.pop();
  }

  // array or single
  add(body) {
    if (body instanceof Array) {
      body.forEach((b) => {
        this._addBody(b);
      });
    } else {
      this._addBody(body);
    }
  }

  // for no repetition
  _addBody(body) {
    body._index = this.bodies.length;
    this.bodies.push(body);
  }

  draw() {
    this.canvas.push();
    this.bodies.forEach((body) => {
      body.draw(this.canvas);
    });

    this.canvas.pop();
  }

  update() {}

  raycast(x, y, angle, clipStart = 0, clipEnd = 10000, forwardHeading) {
    // shoots a ray with an angle from a location
    const hits = [];
    const pos3 = new hlp.Vector(x, y);
    const pos4 = hlp.Vector.add(pos3, hlp.Vector.fromAngle(angle, clipEnd));
    this.bodies.forEach((body) => {
      body.lines.forEach((line) => {
        // anonymous function so return is like a continue
        const pos1 = line.a;
        const pos2 = line.b;

        const den = (pos1.x - pos2.x) * (pos3.y - pos4.y) - (pos1.y - pos2.y) * (pos3.x - pos4.x);

        // checks intersection
        if (den == 0) return;

        // at what point
        const t = ((pos1.x - pos3.x) * (pos3.y - pos4.y) - (pos1.y - pos3.y) * (pos3.x - pos4.x)) / den;
        const u = -((pos1.x - pos2.x) * (pos1.y - pos3.y) - (pos1.y - pos2.y) * (pos1.x - pos3.x)) / den;
        if (t > 0 && t < 1 && u > 0) {
          // create a pt vector
          const pt = new hlp.Vector(pos1.x + t * (pos2.x - pos1.x), pos1.y + t * (pos2.y - pos1.y));

          let distance = pt.dist(pos3);
          if (forwardHeading != null) {
            const a = hlp.toRadians(angle) - hlp.toRadians(forwardHeading);
            distance *= hlp.cos(a);
          }

          if (distance >= clipStart) {
            hits.push({
              distance: distance,
              line: line,
              body: body,
              point: pt,
            });
          }
        }
      });
    });

    // sort by distance
    hits.sort((a, b) => {
      return a.distance - b.distance;
    });

    return hits;
  }
};

/* scripts/../src/game/body2D.js from hlp.js */

// shapes so that physics and collision could be done easy

// line for intersections
hlp.Line = class Line {
  constructor(x1, y1, x2, y2) {
    if (x1 instanceof hlp.Vector) {
      this.a = x1.copy();
      this.b = y1.copy();
    } else {
      this.a = new hlp.Vector(x1, y1);
      this.b = new hlp.Vector(x2, y2);
    }
  }
};

// base shape2D for shapes to inherit
hlp.Body2D = class Body2D {
  constructor(x, y, lines = []) {
    this.pos = new hlp.Vector(x, y);
    this.lines = lines;
    this.lines.forEach((line) => {
      line.a.add(this.pos);
      line.b.add(this.pos);
    });

    this.fill = new hlp.Colour(255, 255, 255);
    this.stroke = new hlp.Colour(0, 0, 0);
  }

  addLine(line) {
    line.a.add(this.pos);
    line.b.add(this.pos);
    this.lines.push(line);
  }

  rotate(angle) {
    this.lines.forEach((line) => {
      line.a.sub(this.pos);
      line.b.sub(this.pos);
      line.a.rotate(angle);
      line.b.rotate(angle);
      line.a.add(this.pos);
      line.b.add(this.pos);
    });
  }

  rotateTo(angle) {
    this.lines.forEach((line) => {
      line.a.sub(this.pos);
      line.b.sub(this.pos);
      line.a.rotateTo(angle);
      line.b.rotateTo(angle);
      line.a.add(this.pos);
      line.b.add(this.pos);
    });
  }

  move(x, y) {
    const newPos = new hlp.Vector(x, y);
    const diff = hlp.Vector.sub(this.pos, newPos);
    this.pos = newPos;

    this.lines.forEach((line) => {
      line.a.add(diff);
      line.b.add(diff);
    });
  }

  draw(canvas) {
    canvas.beginShape();
    canvas.fill(this.fill.r, this.fill.b, this.fill.g);
    canvas.stroke(this.stroke.r, this.stroke.b, this.stroke.g);
    this.lines.forEach((line) => {
      canvas.vertex(line.a.x, line.a.y);
    });

    canvas.endShape();
  }
};

hlp.Rectangle2D = class Rectangle2D extends hlp.Body2D {
  constructor(x, y, w, h) {
    super(x, y);
    w = w / 2;
    h = h / 2;
    this.addLine(new Line(-w, -h, w, -h));
    this.addLine(new Line(w, -h, w, h));
    this.addLine(new Line(w, h, -w, h));
    this.addLine(new Line(-w, h, -w, -h));
  }
};

hlp.Triangle2D = class Triangle2D extends hlp.Body2D {
  constructor(x1, y1, x2, y2, x3, y3) {
    // prettier-ignore
    super(x, y, [
      new hlp.Line(x1, y1, x2, y2), 
      new hlp.Line(x2, y2, x3, y3), 
      new hlp.Line(x3, y3, x1, y1), 
    ]);
  }
};

hlp.Polygon2D = class Polygon2D extends hlp.Body2D {
  constructor(x, y, w, h = w, detail = 3) {
    // lots of detail = circle
    super(x, y, []);
    if (detail < 3) throw new Error("Cannot create shape with less than 3 detail!");

    const vertices = [];
    for (let i = 0; i < detail; i++) {
      const angle = 360 / detail;
      const x2 = x + w * Math.cos(hlp.toRadians(angle * i));
      const y2 = y + h * Math.sin(hlp.toRadians(angle * i));
      vertices.push(new hlp.Vector(x2, y2));
    }

    vertices.forEach((vertex, i) => {
      this.lines.push(new hlp.Line(vertex, vertices[(i + 1) % vertices.length]));
    });
  }
};

/* scripts/../src/game/audioSynth.js from hlp.js */

hlp.AudioSynth = class AudioSynth {
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
};

/* scripts/../src/misc/dictionary.js from hlp.js */

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

  forEach(func) {
    Object.keys(this.data).forEach(func);
  }
};

/* scripts/../src/utils/strings.js from hlp.js */

// useful for parsing strings

hlp.regexEscape = (str) => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

hlp.smartSplit = (str, charSplit = " ", insideChar, charToDiscludeInsideChar = "") => {
  // regex to avoid double chars
  let formattedStr = str.split(new RegExp(`${charSplit}+`, "g"));
  if (!formattedStr.slice(-1)[0]) formattedStr.pop(); // if last element is empty string

  if (insideChar != null) {
    // dont spilt inside the insideChar
    for (let i = 0; i < formattedStr.length; i++) {
      // if insdeChar is in portion of formstr
      if (formattedStr[i].includes(insideChar)) {
        // loop until end of string at start of the portion of the insidechar
        formattedStr.slice(i + 1).forEach((str, j) => {
          const stringIndex = str.indexOf(insideChar);
          if (stringIndex != -1 && str[stringIndex + 1] != charToDiscludeInsideChar) {
            // get string bewteen the inside chars
            const bewtweenInsideChar = formattedStr.slice(i, j + i + 2).join(charSplit);
            formattedStr.splice(i, j + 2, bewtweenInsideChar.replace(charToDiscludeInsideChar, "")); // replace
            return;
          }
        });
      }
    }
  }

  return formattedStr;
};

hlp.safeEscape = (unsafe) => {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/%/g, "&#37;");
};

hlp.onlyContainsSpaces = (str) => {
  return !str.replace(/\s/g, "").length;
};

hlp.copyToClipboard = async (str) => {
  if (!navigator.clipboard) {
    // fallback for comapatipility
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    if (!successful) return alert("Copy fallback not sucessful!");

    document.body.removeChild(textArea);
  } else {
    await navigator.clipboard.writeText(str);
  }
};

/* scripts/../src/utils/array.js from hlp.js */

// uses Fisher-Yates Shuffle Algorithm
hlp.shuffle = (arr, bool) => {
  arr = bool ? arr : arr.slice();

  let rnd,
    tmp,
    idx = arr.length;
  while (idx > 1) {
    rnd = (Math.random() * idx) | 0;

    tmp = arr[--idx];
    arr[idx] = arr[rnd];
    arr[rnd] = tmp;
  }

  return arr;
};
