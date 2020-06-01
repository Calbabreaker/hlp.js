helper.Matrix = class Matrix {
  constructor(rows = 0, cols = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(rows).fill().map(() => new Array(cols).fill(0));
  }

  static add(a, b) {
    //same as normal add but creates new matrix
    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error("Both matrixs rows and cols must match!");
    }

    return new Matrix(a.rows, a.cols).map((val, i, j) => a.data[i][j] + b.data[i][j]);
  }

  add(toAdd) {
    // check if is matrix then add matrix with hadamard else add number to every element
    if (toAdd instanceof Matrix) {
      if (this.cols !== toAdd.cols || this.rows !== toAdd.rows) {
        throw new Error("Both matrixs rows and cols must match! \n Use Matrix.add instead.");
      }

      return this.map((val, i, j) => val + toAdd.data[i][j]);
    } else if (typeof toAdd == "number") {
      return this.map(val => val + toAdd);
    } else {
      throw new Error("Did not provide valid data for parameter toAdd!");
    }
  }

  static sub(a, b) {
    //same as normal add but creates new matrix
    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error("Both matrixs rows and cols must match!");
    }

    return new Matrix(a.rows, a.cols).map((val, i, j) => a.data[i][j] - b.data[i][j]);
  }

  sub(toSub) {
    // check if is matrix then add matrix with hadamard else subtract number to every element
    if (toSub instanceof Matrix) {
      if (this.cols !== toSub.cols || this.rows !== toSub.rows) {
        throw new Error("Both matrixs rows and cols must match! \n Use Matrix.sub instead.");
      }

      return this.map((val, i, j) => val - toSub.data[i][j]);
    } else if (typeof toSub == "number") {
      return this.map(val => val - toSub);
    } else {
      throw new Error("Did not provide valid data for parameter toSub!");
    }
  }

  static mult(a, b) {
    // multiplies with the dot product
    if (a.cols !== b.rows) {
      throw new Error("Matrix a cols must match matrix b rows!");
    }

    return new Matrix(a.rows, b.cols).map((val, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }

      return sum;
    });
  }

  mult(toMult) {
    // check if is matrix then add matrix else add number to every element
    if (toMult instanceof Matrix) {
      if (this.cols !== toMult.cols || this.rows !== toMult.rows) {
        throw new Error("Both matrixs rows and cols must match! \n Use Matrix.mult instead.");
      }

      return this.map((val, i, j) => val * toMult.data[i][j]);
    } else if (typeof toMult == "number") {
      return this.map(val => val * toMult);
    } else {
      throw new Error("Did not provide valid data for parameter toMult!");
    }
  }

  static div(a, b) {
    //same as normal div but creates new matrix
    if (a.cols !== b.cols || a.rows !== b.rows) {
      throw new Error("Both matrixs rows and cols must match!");
    }

    return new Matrix(a.rows, a.cols).map((val, i, j) => a.data[i][j] / b.data[i][j]);
  }

  div(toDiv) {
    // check if is matrix then div matrix else div number to every element
    if (toDiv instanceof Matrix) {
      if (this.cols !== toDiv.cols || this.rows !== toDiv.rows) {
        throw new Error("Both matrixs rows and cols must match! \n Use Matrix.div instead.");
      }

      return this.map((val, i, j) => val / toDiv.data[i][j]);
    } else if (typeof toDiv == "number") {
      return this.map(val => val / toDiv);
    } else {
      throw new Error("Did not provide valid data for parameter toSiv!");
    }
  }

  randomize(min = 0, max = 1) {
    // sets every element to random number between min and max
    return this.map(x => Math.random() * (min - max) + max);
  }

  randomizeGuassian(mean = 0, sd = 1) {
    // uses p5 randomGaussian function (to lazy to make one) to set every val in matrix 
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
    return this.map((val) => Math.exp(val));
  }

  floor() {
    // floors every val in matrix
    return this.map((val) => Math.floor(val));
  }

  fill(n) {
    // sets every val in matrix to n
    return this.map(() => n);
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
    // basically flips the matrix
    return new Matrix(matrix.cols, matrix.rows).map((val, i, j) => matrix.data[j][i]);
  }

  log() {
    // logs as a table
    console.table(this.data);
    return this;
  }

  static createFromArray(array) {
    // create new matrix from an array to make it esier for user
    return new Matrix(array.length, 1).map((val, i, j) => array[i]);
  }

  copy() {
    return Matrix.map(this, val => val);
  }

  toArray() {
    // creates long big array from matrix
    const array = new Array(this.rows * this.cols);
    Matrix.map(this, (val, i, j) => (array[i * this.cols + j] = val));
    return array;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == "string") {
      data = JSON.parse(data);
    }

    const matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }
}