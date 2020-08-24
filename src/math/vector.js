import {} from "./trigonometry"
import from "./calculations"

// a vector for storing positions and doing math with it
class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(val) {
    // adds every axis with a number or a vector
    if (val instanceof Vector) (this.x += val.x), (this.y += val.y), (this.z += val.z);
    else (this.x += val), (this.y += val), (this.z += val);
    return this;
  }

  static add(vec, val) {
    // same as normal add but creates a new vector
    return vec.copy().add(val);
  }

  sub(val) {
    if (val instanceof Vector) (this.x -= val.x), (this.y -= val.y), (this.z -= val.z);
    else (this.x -= val), (this.y -= val), (this.z -= val);
    return this;
  }

  static sub(vec, val) {
    return vec.copy().sub(val);
  }

  div(val) {
    if (val instanceof Vector) (this.x /= val.x), (this.y /= val.y), (this.z /= val.z);
    else (this.x /= val), (this.y /= val), (this.z /= val);
    return this;
  }

  static div(vec, val) {
    return vec.copy().div(val);
  }

  mult(val) {
    if (val instanceof Vector) (this.x *= val.x), (this.y *= val.y), (this.z *= val.z);
    else (this.x *= val), (this.y *= val), (this.z *= val);
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

  clone() {
    return new Vector(this.x, this.y, this.z);
  }

  set(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  magSq() {
    // gets the len of the vector squared
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  mag() {
    // gets the len of the vector
    return sqrt(this.magSq());
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
    return dist(this.x, this.y, this.z, vec.x, vec.y, vec.z);
  }

  static dist(vec1, vec2) {
    return vec1.dist(vec2);
  }

  setMag(len) {
    // set the len of the vector
    return this.normalise().mult(len);
  }

  heading() {
    const h = atan2(this.y, this.x);
    return toDegrees(h);
  }

  rotate(a) {
    const newHeading = radians(this.heading() + a);
    const mag = this.mag();
    this.x = cos(newHeading) * mag;
    this.y = sin(newHeading) * mag;
    return this;
  }

  rotateTo(a) {
    const mag = this.mag();
    this.x = cos(a) * mag;
    this.y = sin(a) * mag;
    return this;
  }

  toString() {
    return `x: ${this.x}, y: ${this.y}, z: ${this.z}`;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  static fromAngle(angle, len = 1) {
    angle = radians(angle);
    return new Vector(len * Math.cos(angle), len * sin(angle), 0);
  }

  static random2D(len = 1) {
    return Vector.fromAngle(random(0, 360)).mult(len);
  }
};

export default Vector;