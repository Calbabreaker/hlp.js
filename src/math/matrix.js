import { Vector } from "./vector";
import * as math from "./calculations";

// This creates a multi dimensional array and stores it in this.data
export class Matrix {
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
      return this.map((val) => val + toAdd);
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
      return this.map((val) => val - toSub);
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
    newVec.x = vec.x * matrix.data[(0, 0)] + vec.y * matrix.data[(1, 0)] + vec.z * matrix.data[(2, 0)] + matrix.data[(3, 0)];
    newVec.y = vec.x * matrix.data[(0, 1)] + vec.y * matrix.data[(1, 1)] + vec.z * matrix.data[(2, 1)] + matrix.data[(3, 1)];
    newVec.z = vec.x * matrix.data[(0, 2)] + vec.y * matrix.data[(1, 2)] + vec.z * matrix.data[(2, 2)] + matrix.data[(3, 2)];
    const w = vec.x * matrix.data[(0, 3)] + vec.y * matrix.data[(1, 3)] + vec.z * matrix.data[(2, 3)] + matrix.data[(3, 3)];

    if (w != 0) newVec.div(w);
    return newVec;
  }

  static mult(a, b) {
    return new Matrix(a.rows, a.cols).mult(b);
  }

  mult(toMult) {
    if (toMult instanceof Matrix) {
      if (this.cols !== toMult.cols || this.rows !== toMult.rows) throw new Error("Both matrixs rows and cols must match!");
      return this.map((val, i, j) => val * toMult.data[i][j]);
    } else if (typeof toMult == "number") {
      return this.map((val) => val * toMult);
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
      return this.map((val) => val / toDiv);
    } else {
      throw new Error("Did not provide valid data for parameter toDiv!");
    }
  }

  randomize(min = 0, max = 1) {
    // sets every element to random number between min and max
    return this.map(() => math.random(min, max));
  }

  randomizeGuassian(mean = 0, sd = 1) {
    return this.map(() => math.randomGaussian(mean, sd));
  }

  max() {
    // gets the maxium val in matrix
    let maxValue = 0;
    Matrix.map(this, (val) => {
      if (val > maxValue) maxValue = val;
    });

    return maxValue;
  }

  sum() {
    // gets the sum of all vals in matrix
    let sum = 0;
    Matrix.map(this, (val) => (sum += val));
    return sum;
  }

  exp() {
    // aplies Math.exp (e^2) to all vals in matrix
    return this.map(math.exp);
  }

  floor() {
    // floors every val in matrix
    return this.map(math.floor);
  }

  fill(n) {
    // sets every val in matrix to n
    return this.map(() => n);
  }

  constrain(min, max) {
    // constrains every val in matrix
    return this.map((val) => min(max(val, min), max));
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
    return Matrix.map(this, (val) => val);
  }

  toArray(array1d = false) {
    if (array1d) {
      const array = [];
      this.data.forEach((cols) => array.push(...cols));
      return array;
    } else return this.copy().data;
  }

  static createFromVector(vector) {
    return new Matrix([[vector.x], [vector.y], [vector.z], [0]]);
  }

  toVector() {
    if (this.rows >= 3) {
      return new Vector(this.data[0][0], this.data[1][0], this.data[2][0]);
    } else throw new Error("Matrix cannot be converted to a vector!");
  }

  // down here are functions that create matrixs that can be used for multipliying
  static createIdentity() {
    return new Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationX(angle) {
    return new Matrix([
      [1, 0, 0, 0],
      [0, math.cos(angle), math.sin(angle), 0],
      [0, -math.sin(angle), math.cos(angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationY(angle) {
    return new Matrix([
      [math.cos(angle), 0, math.sin(angle), 0],
      [0, 1, 0, 0],
      [-math.sin(angle), 0, math.cos(angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationZ(angle) {
    return new Matrix([
      [math.cos(angle), math.sin(angle), 0, 0],
      [-math.sin(angle), math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  }

  static createTranslation(x, y, z) {
    return new Matrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [x, y, z, 1],
    ]);
  }

  static createProjectionPerspect(fovDegrees, aspectRatio, near, far) {
    const fovRadians = toRadians(fovDegrees);
    return new Matrix([
      [aspectRatio * fovRadians, 0, 0, 0],
      [0, fovRadians, 0, 0],
      [0, 0, far / (far - near), 1],
      [0, 0, (-far * near) / (far - near), 0],
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
