/* 
  The hlp.js library by Calbabreaker. Free to use. 
*/


/* ./../src/canvas.js from hlp.js */

// the canvas object for canvas drawing
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

hlp.Canvas = class Canvas {
  constructor(width = 400, height = 400) {
    // initialize variables
    this.width = width;
    this.height = height;
    this.doFill = true;
    this.doStroke = true;
    this.prevDoFills = [];
    this.prevDoStrokes = [];

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
    this.mouse = new hlp.Vector(0, 0);
    this.mouseMovement = new hlp.Vector(0, 0);
    this.mouseIsLocked = false;

    // gets the mouse pos
    document.body.addEventListener("mousemove", event => {
      this.mouse.set(event.clientX - this.clientRect.left, event.clientY - this.clientRect.top);
      this.mouseMovement.set(event.movementX, event.movementY);
      this.mouseMove();
      if (!this.mouseIsLocked) this.unlockedMouseMove();
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

  // push and pop to restore and save states
  push() {
    this.prevDoFills.push(this.doFill);
    this.prevDoStrokes.push(this.doStroke);
    this.ctx.save();
  }

  pop() {
    this.doFill = this.prevDoFills.pop();
    this.doStroke = this.prevDoStrokes.pop();
    this.ctx.restore();
  }
}

/* ./../src/dictionary.js from hlp.js */

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
}

/* ./../src/math/additions.js from hlp.js */

// the default math object with some extra functions
hlp.Math = {};

// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach(funcName => {
  hlp.Math[funcName] = window.Math[funcName]; 
});

hlp.Math.map = (value, low1, high1, low2, high2) => {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

hlp.Math.toRadians = (degrees) => {
  return 1 / Math.tan(degrees * 0.5 / 180 * Math.PI);
}

hlp.Math.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.Math.constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
}

/* ./../src/math/matrix.js from hlp.js */

// This creates a multi dimensional array and stores it in this.data
// By Calbabreaker

hlp.Matrix = class Matrix {
  constructor(rows = 0, cols = 0) {
    if (rows instanceof Array) {
      // create a new Matrix with data 
      this.data = rows;
      this.rows = this.data.length;
      this.cols = this.data[0].length;
    } else {
      // creates a new Matrix that is filled with 0s
      this.rows = rows;
      this.cols = cols;
      this.data = new Array(rows).fill().map(() => new Array(cols).fill(0));
    }
  }

  static add(a, b) {
    //same as normal add but creates new matrix
    return new Matrix(a.rows, a.cols).add(b);
  }

  add(toAdd) {
    // check if is matrix then add matrix with hadamard else add number to every element
    if (toAdd instanceof Matrix) {
      if (this.cols !== toAdd.cols || this.rows !== toAdd.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val + toAdd.data[i][j]);
    } else if (typeof toAdd == "number") {
      return this.map(val => val + toAdd);
    } else {
      throw new Error("Did not provide valid data for parameter toAdd!");
    }
  }

  static sub(a, b) {
    return new Matrix(a.rows, a.cols).sub(b);
  }

  sub(toSub) {
    if (toSub instanceof Matrix) {
      if (this.cols !== toSub.cols || this.rows !== toSub.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val - toSub.data[i][j]);
    } else if (typeof toSub == "number") {
      return this.map(val => val - toSub);
    } else {
      throw new Error("Did not provide valid data for parameter toSub!");
    }
  }

  static dotMult(a, b) {
    // multiplies with the dot product
    if (a.cols !== b.rows) throw new Error("Matrix a cols must match matrix b rows!");

    return new Matrix(a.rows, b.cols).map((val, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) sum += a.data[i][k] * b.data[k][j];
      return sum;
    });
  }

  static multVector(vec, matrix) {
    if (!(vec instanceof Vector)) throw new Error("vec must be a vector");
    if (matrix.cols != 4 || matrix.rows != 4) throw new Error("matrix must have 4 cols and 4 rows!");

    const newVec = new Vector(vec.x, vec.y, vec.z);
    newVec.x = vec.x * matrix.getVal(0, 0) + vec.y * matrix.getVal(1, 0) + vec.z * matrix.getVal(2, 0) + matrix.getVal(3, 0);
    newVec.y = vec.x * matrix.getVal(0, 1) + vec.y * matrix.getVal(1, 1) + vec.z * matrix.getVal(2, 1) + matrix.getVal(3, 1);
    newVec.z = vec.x * matrix.getVal(0, 2) + vec.y * matrix.getVal(1, 2) + vec.z * matrix.getVal(2, 2) + matrix.getVal(3, 2);
    const w = vec.x * matrix.getVal(0, 3) + vec.y * matrix.getVal(1, 3) + vec.z * matrix.getVal(2, 3) + matrix.getVal(3, 3);

    if (w != 0) newVec.div(w);
    return newVec;
  }

  static quickInverse(m) { // only for rotation/translation matrixs
    const matrix = new Matrix([
      [m.getVal(0, 0), m.getVal(1, 0), m.getVal(2, 0), 0],
      [m.getVal(0, 1), m.getVal(1, 1), m.getVal(2, 1), 0],
      [m.getVal(0, 2), m.getVal(1, 2), m.getVal(2, 2), 0],
      [0, 0, 0, 0],
    ]);

		matrix.setVal(3, 0, -(m.getVal(3, 0) * matrix.getVal(0, 0) + m.getVal(3, 1) * matrix.getVal(1, 0) + m.getVal(3, 2) * matrix.getVal(2, 0)));
		matrix.setVal(3, 1, -(m.getVal(3, 0) * matrix.getVal(0, 1) + m.getVal(3, 1) * matrix.getVal(1, 1) + m.getVal(3, 2) * matrix.getVal(2, 1)));
		matrix.setVal(3, 2, -(m.getVal(3, 0) * matrix.getVal(0, 2) + m.getVal(3, 1) * matrix.getVal(1, 2) + m.getVal(3, 2) * matrix.getVal(2, 2)));
		matrix.setVal(3, 3, 1);
		return matrix;
	}


  static mult(a, b) {
    return new Matrix(a.rows, a.cols).mult(b);
  }

  mult(toMult) {
    if (toMult instanceof Matrix) {
      if (this.cols !== toMult.cols || this.rows !== toMult.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val * toMult.data[i][j]);
    } else if (typeof toMult == "number") {
      return this.map(val => val * toMult);
    } else {
      throw new Error("Did not provide valid data for parameter toMult!");
    }
  }

  static div(a, b) {
    return new Matrix(a.rows, a.cols).div(b);
  }

  div(toDiv) {
    if (toDiv instanceof Matrix) {
      if (this.cols !== toDiv.cols || this.rows !== toDiv.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val / toDiv.data[i][j]);
    } else if (typeof toDiv == "number") {
      return this.map(val => val / toDiv);
    } else {
      throw new Error("Did not provide valid data for parameter toDiv!");
    }
  }

  randomize(min = 0, max = 1) {
    // sets every element to random number between min and max
    return this.map(x => Math.random() * (min - max) + max);
  }

  randomizeGuassian(mean = 0, sd = 1) {
    // uses p5 randomGaussian function (to lazzy to make one) to set every val in matrix 
    if (typeof p5 === "undefined") throw new Error("Cant use randomGaussian (no p5)");
    return this.map(() => randomGaussian(mean, sd));
  }

  max() {
    // gets the maxium val in matrix
    let maxValue = 0;
    Matrix.map(this, val => {
      if (val > maxValue) maxValue = val;
    });

    return maxValue;
  }

  sum() {
    // gets the sum of all vals in matrix
    let sum = 0;
    Matrix.map(this, val => (sum += val));
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

  setVal(row, col, val) {
    this.data[row][col] = val;
    return this;
  }

  getVal(row, col) {
    return this.data[row][col];
  }

  constrain(min, max) {
    // constrains every val in matrix
    return this.map(val => Math.min(Math.max(val, min), max));
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
    return new Matrix(matrix.rows, matrix.cols).map((val, i, j) => func(matrix.data[i][j], i, j));
  }

  static transpose(matrix) {
    // basically rotates the matrix
    return new Matrix(matrix.cols, matrix.rows).map((val, i, j) => matrix.data[j][i]);
  }

  log() {
    // logs as a table
    console.table(this.data);
    return this;
  }

  copy() {
    return Matrix.map(this, val => val);
  }

  toArray() {
    // creates long big array from matrix
    return this.copy().data;
  }

  static createFromVector(vector) {
    return new Matrix([[vector.x], [vector.y], [vector.z], [0]]);
  }

  toVector() {
    if (this.rows >= 3) {
      return new Vector(this.data[0][0], this.data[1][0], this.data[2][0]);
    } else throw new Error("Matrix cannot be converted to a vector");
  }

  // down here are functions that create matrixs that can be used for multipliying
  static createIdentity() {
    return new Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]);
  }

  static createRotationX(angle) {
    return new Matrix([
      [1, 0, 0, 0],
      [0, Math.cos(angle), Math.sin(angle), 0],
      [0, -Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1]
    ]);
  }

  static createRotationY(angle) {
    return new Matrix([
      [Math.cos(angle), 0, Math.sin(angle), 0],
      [0, 1, 0, 0],
      [-Math.sin(angle), 0, Math.cos(angle), 0],
      [0, 0, 0, 1]
    ]);
  }

  static createRotationZ(angle) {
    return new Matrix([
      [Math.cos(angle), Math.sin(angle), 0, 0],
      [-Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]);
  }

  static createTranslation(x, y, z) {
    return new Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [x, y, z, 1]
    ]);
  }

  static createProjectionOrtho() {
    return new Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  }

  static createProjectionPerspect(fovDegrees, aspectRatio, near, far) {
    const fovRadians = Math.toRadians(fovDegrees);
    return new Matrix([
      [aspectRatio * fovRadians, 0, 0, 0],
      [0, fovRadians, 0, 0],
      [0, 0, far / (far - near), 1],
      [0, 0, (-far * near) / (far - near), 0]
    ]);
  }

  static createPointAt(pos, target, up) {
    const newForward = Vector.sub(target, pos).normalise();
    const newUp = Vector.sub(up, Vector.mult(newForward, up.dotProduct(newForward))).normalise();
    const newRight = Vector.crossProduct(newUp, newForward);
    return new Matrix([
      [newRight.x, newRight.y, newRight.z],
      [newUp.x, newUp.y, newUp.z],
      [newForward.x, newForward.y, newForward.z],
      [pos.x, pos.y, pos.z],
    ]);
  }
}

/* ./../src/math/meshes.js from hlp.js */

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
    const dist = point => {
      return planeNormal.x * point.x + planeNormal.y * point.y + planeNormal.z * point.z - planeNormal.dotProduct(planePoint);
    }

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
      outputTri.points[1] = Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);
      outputTri.points[2] = Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[1]);
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
}

hlp.Mesh = class Mesh {
  constructor(tris = []) {
    this.tris = tris;
  }

  static async loadFromFile(url) {
    if (url.split('.').pop() != "obj") throw new Error("Can only support obj models");
    // load using fetch
    const response = await fetch(url);
    const data = await response.text();

    const mesh = new hlp.Mesh();
    const vertices = []; // temperary pool of vertices
    data.split("
").forEach((line) => {
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
}

/* ./../src/math/vector.js from hlp.js */

// a vector for storing positions and doing math with it

hlp.Vector = class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(val) {
    // adds every axis with a number or a vector
    if (val instanceof Vector) this.x += val.x, this.y += val.y, this.z += val.z;
    else this.x += val, this.y += val, this.z += val;
    return this;
  }

  static add(vec, val) {
    // same as normal add but creates a new vector
    return vec.copy().add(val);
  }

  sub(val) {
    if (val instanceof Vector) this.x -= val.x, this.y -= val.y, this.z -= val.z;
    else this.x -= val, this.y -= val, this.z -= val;
    return this;
  }

  static sub(vec, val) {
    return vec.copy().sub(val);
  }

  div(val) {
    if (val instanceof Vector) this.x /= val.x, this.y /= val.y, this.z /= val.z;
    else this.x /= val, this.y /= val, this.z /= val;
    return this;
  }

  static div(vec, val) {
    return vec.copy().div(val);
  }

  mult(val) {
    if (val instanceof Vector) this.x *= val.x, this.y *= val.y, this.z *= val.z;
    else this.x *= val, this.y *= val, this.z *= val;
    return this;
  }

  static mult(vec, val) {
    return vec.copy().mult(val);
  }

  static crossProduct(v1, v2) {
    const vector = new Vector();
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
  }

  dotProduct(vec2) {
    return this.x * vec2.x + this.y * vec2.y + this.z * vec2.z; 
  }

  copy() {
    return new Vector(this.x, this.y, this.z);
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
    return Math.sqrt(this.magSq());
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
}
