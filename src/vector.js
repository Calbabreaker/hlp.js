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
    planeNormal = Vector.normalise(planeNormal);
    const planeDirection = -planeNormal.dotProduct(planePoint);
    const ad = lineStart.dotProduct(planeNormal);
    const bd = lineEnd.dotProduct(planeNormal);
    const t = (-planeDirection - ad) / (bd - ad);
    const newLine = Vector.sub(lineEnd, lineStart).mult(t).add(lineStart);
    return newLine;
  }
}