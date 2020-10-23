/*!
 * hlp.js v1.0.2 by Calbabreaker 2020-10-23 
 * Free to use. GPL-3.0.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp", function() { return exp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hypot", function() { return hypot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asin", function() { return asin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sin", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acos", function() { return acos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cos", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan", function() { return atan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan2", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atanh", function() { return atanh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tan", function() { return tan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceiling", function() { return ceiling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sigmoid", function() { return sigmoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dsigmoid", function() { return dsigmoid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "relu", function() { return relu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drelu", function() { return drelu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radians", function() { return radians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "constrain", function() { return constrain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randInt", function() { return randInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomGaussian", function() { return randomGaussian; });
/* harmony import */ var _misc_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


// some default math funcs (there will be some jsdoc soon)
const abs = Math.abs;
const exp = Math.exp;
const log = Math.log;
const max = Math.max;
const min = Math.min;
const sqrt = Math.sqrt;

const hypot = Math.hypot;
const asin = Math.asin;
const sin = Math.sin;
const acos = Math.acos;
const cos = Math.cos;
const atan = Math.atan;
const atan2 = Math.atan2;
const atanh = Math.atanh;
const tan = Math.tan;

const round = (num, decimalPlaces = 0) => {
  const numToRound = num * 10 ** decimalPlaces;
  return Math.round(numToRound) / 10 ** decimalPlaces;
};

const floor = (num, decimalPlaces = 0) => {
  const numToRound = num * 10 ** decimalPlaces;
  return Math.floor(numToRound) / 10 ** decimalPlaces;
};

const ceiling = (num, decimalPlaces = 0) => {
  const numToRound = num * 10 ** decimalPlaces;
  return Math.ceil(numToRound) / 10 ** decimalPlaces;
};

// ml activation functions
const sigmoid = (n) => {
  return 1 / (1 + Math.exp(-n));
};

const dsigmoid = (n) => {
  return sigmoid(n) * (1 - sigmoid(n));
};

const relu = (n) => {
  return n < 0 ? 0.1 * n : n;
};

const drelu = (n) => {
  return n < 0 ? 0.5 : 1;
};

const radians = (deg) => deg * _misc_constants__WEBPACK_IMPORTED_MODULE_0__["DEG_TO_RAD"];
const degrees = (rad) => rad * _misc_constants__WEBPACK_IMPORTED_MODULE_0__["RAD_TO_DEG"];

const map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

const lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
};

const random = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }

  return Math.random() * (min - max) + max;
};

const randInt = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }

  return Math.floor(random(min, max + 1));
};

const dist = (...args) => {
  if (args.length == 4) {
    // 2d
    return Math.hypot(args[2] - args[0], args[3] - args[1]);
  } else if (args.length == 6) {
    // 3d
    return Math.hypot(args[3] - args[0], args[4] - args[1], args[5] - args[2]);
  }
};

let y2Guass = 0;
let gaussianPrev = false;

// randomGaussian with mean and standard distribution
const randomGaussian = (mean = 0, sd = 1) => {
  let y1, x1, x2, w;
  if (gaussianPrev) {
    y1 = y2Guass;
    gaussianPrev = false;
  } else {
    do {
      x1 = Math.random(0, 2) - 1;
      x2 = Math.random(0, 2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt((-2 * Math.log(w)) / w);
    y1 = x1 * w;
    y2Guass = x2 * w;
    gaussianPrev = true;
  }

  return y1 * sd + mean;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
/* harmony import */ var _calculations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


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
    return vec.clone().add(val);
  }

  sub(val) {
    if (val instanceof Vector) (this.x -= val.x), (this.y -= val.y), (this.z -= val.z);
    else (this.x -= val), (this.y -= val), (this.z -= val);
    return this;
  }

  static sub(vec, val) {
    return vec.clone().sub(val);
  }

  div(val) {
    if (val instanceof Vector) (this.x /= val.x), (this.y /= val.y), (this.z /= val.z);
    else (this.x /= val), (this.y /= val), (this.z /= val);
    return this;
  }

  static div(vec, val) {
    return vec.clone().div(val);
  }

  mult(val) {
    if (val instanceof Vector) (this.x *= val.x), (this.y *= val.y), (this.z *= val.z);
    else (this.x *= val), (this.y *= val), (this.z *= val);
    return this;
  }

  static mult(vec, val) {
    return vec.clone().mult(val);
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
    return _calculations__WEBPACK_IMPORTED_MODULE_0__["sqrt"](this.magSq());
  }

  normalise() {
    // normalises the vector (bewtween 0, 1)
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  static normalise(vec) {
    return vec.clone().normalise();
  }

  dist(vec) {
    return _calculations__WEBPACK_IMPORTED_MODULE_0__["dist"](this.x, this.y, this.z, vec.x, vec.y, vec.z);
  }

  static dist(vec1, vec2) {
    return vec1.dist(vec2);
  }

  setMag(len) {
    // set the len of the vector
    return this.normalise().mult(len);
  }

  heading() {
    const h = _calculations__WEBPACK_IMPORTED_MODULE_0__["atan2"](this.y, this.x);
    return toDegrees(h);
  }

  rotate(a) {
    const newHeading = radians(this.heading() + a);
    const mag = this.mag();
    this.x = _calculations__WEBPACK_IMPORTED_MODULE_0__["cos"](newHeading) * mag;
    this.y = _calculations__WEBPACK_IMPORTED_MODULE_0__["sin"](newHeading) * mag;
    return this;
  }

  rotateTo(a) {
    const mag = this.mag();
    this.x = _calculations__WEBPACK_IMPORTED_MODULE_0__["cos"](a) * mag;
    this.y = _calculations__WEBPACK_IMPORTED_MODULE_0__["sin"](a) * mag;
    return this;
  }

  toString() {
    return `x: ${this.x}, y: ${this.y}, z: ${this.z}`;
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  static fromAngle(angle, len = 1) {
    angle = _calculations__WEBPACK_IMPORTED_MODULE_0__["radians"](angle);
    return new Vector(len * _calculations__WEBPACK_IMPORTED_MODULE_0__["cos"](angle), len * _calculations__WEBPACK_IMPORTED_MODULE_0__["sin"](angle), 0);
  }

  static random2D(len = 1) {
    return Vector.fromAngle(_calculations__WEBPACK_IMPORTED_MODULE_0__["random"](0, 360)).mult(len);
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PI", function() { return PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TWO_PI", function() { return TWO_PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOUR_PI", function() { return FOUR_PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HALF_PI", function() { return HALF_PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUARTER_PI", function() { return QUARTER_PI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return E; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEG_TO_RAD", function() { return DEG_TO_RAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RAD_TO_DEG", function() { return RAD_TO_DEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FULL", function() { return FULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderer2D", function() { return renderer2D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON", function() { return JSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT", function() { return TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLOB", function() { return BLOB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB", function() { return RGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return RGBA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HSL", function() { return HSL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HSLA", function() { return HSLA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CENTER", function() { return CENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEFT", function() { return LEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT", function() { return RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START", function() { return START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "END", function() { return END; });
const PI = Math.PI;
const TWO_PI = Math.PI * 2;
const FOUR_PI = Math.PI * 4;
const HALF_PI = Math.PI / 2;
const QUARTER_PI = Math.PI / 4;
const E = Math.E;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const FULL = "full";
const renderer2D = "renderer2D";

const JSON = "json";
const TEXT = "text";
const BLOB = "blob";

const RGB = "rgb";
const RGBA = "rgba";
const HSL = "hsl";
const HSLA = "hsla";

const CENTER = "center";
const LEFT = "left";
const RIGHT = "right";
const START = "start";
const END = "end";


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colour", function() { return Colour; });
/* harmony import */ var _misc_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Colour {
  constructor(c1, c2, c3, a = 255, colourMode = _misc_constants__WEBPACK_IMPORTED_MODULE_0__["RGB"]) {
    this.colourMode = colourMode;

    this.a = 255;
    this.set(c1, c2, c3);
  }

  set(c1, c2 = this.c1, c3 = this.c1, a) {
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;

    // if string ends with A (alpha)
    if (this.colourMode.substr(-1) === "a") this.a = a || 255;
  }

  toString() {
    return Colour.toString(this.c1, this.c2, this.c3, this.a, this.colourMode);
  }

  // creates a string friendly with css styles
  static toString(c1, c2 = c1, c3 = c1, a = 255, colourMode = _misc_constants__WEBPACK_IMPORTED_MODULE_0__["RGB"]) {
    if (colourMode == _misc_constants__WEBPACK_IMPORTED_MODULE_0__["RGB"] || colourMode == _misc_constants__WEBPACK_IMPORTED_MODULE_0__["RGBA"]) {
      return `rgb(${c1}, ${c2}, ${c3}, ${a})`; // red, green, blue, alpha
    } else if (colourMode == _misc_constants__WEBPACK_IMPORTED_MODULE_0__["HSL"] || colourMode == _misc_constants__WEBPACK_IMPORTED_MODULE_0__["HSLA"]) {
      return `hsl(${c1}, ${c2}%, ${c3}%, ${a})`; // hue, saturation, lightness, alpha
    }
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UniqueIDGen", function() { return UniqueIDGen; });
// not to be used for cryptoagraphy
class UniqueIDGen {
  constructor(incrementerCount = 5) {
    this.increments = new Array(incrementerCount).fill(0);
    this.incrementPointer = 0;
  }

  gen() {
    let id = "";
    this.increments.forEach((num) => {
      id += `${num}`;
    });

    // increment to get new uuid
    this.increments[this.incrementPointer]++;
    this.incrementPointer++;
    if (this.incrementPointer > this.increments.length - 1) {
      this.incrementPointer = 0;
    }

    return id;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return Map; });
class Map {
  constructor(data = {}) {
    Object.defineProperty(this, "_data", {
      enumerable: false,
      writable: true,
      value: Object.assign({}, data),
    });

    return new Proxy(this, {
      get(target, name, receiver) {
        if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);
        return target._data[name];
      },
      set(target, name, value, receiver) {
        if (Reflect.has(target, name)) return Reflect.set(target, name, value, receiver);
        target._data[name] = value;
      },
      deleteProperty(target, name) {
        delete target._data[name];
      },
    });
  }

  contains(key) {
    return this._data[key] != null;
  }

  clone() {
    return new Map(this._data);
  }

  forEach(func) {
    for (let item in this._data) {
      func(item);
    }
  }

  serialise() {
    return JSON.stringify(this._data);
  }

  deserialise(str) {
    return new Map(JSON.parse(str));
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "choose", function() { return choose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return shuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return sum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "product", function() { return product; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return mean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomise", function() { return randomise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony import */ var _math_calculations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


const choose = (array) => {
  const index = _math_calculations__WEBPACK_IMPORTED_MODULE_0__["randInt"](array.length - 1);
  return array[index];
};

// uses Fisher-Yates Shuffle Algorithm
const shuffle = (array) => {
  let random,
    temp,
    index = array.length;
  while (index > 1) {
    random = (Math.random() * index) | 0;
    temp = array[--index];
    array[index] = array[random];
    array[random] = temp;
  }

  return undefined;
};

const sum = (array) => {
  let sum = 0;
  array.forEach((item) => (sum += item));
  return sum;
};

const product = (array) => {
  let sum = 0;
  array.forEach((item) => (product *= item));
  return sum;
};

const mean = (array) => {
  const arrSum = sum(array);
  const mean = arrSum / array.length;
  return mean;
};

const randomise = (array, min, max) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = _math_calculations__WEBPACK_IMPORTED_MODULE_0__["random"](min, max);
  }
};

const min = (array) => {
  return Math.min(...array);
};

const max = (array) => {
  return Math.max(...array);
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
class System {}

class Entity {}

class Component {}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// init of hlp
if (window.hlp != null) {
  alert("Cannot import hlp, instance of the hlp libary is already in use!");
  console.error("Cannot import hlp, instance of the hlp libary is already in use!");
} else {
  const hlp = {};
  window.hlp = hlp;

  if (window.Proxy == null) alert("Your browser does not support Proxy which is required in some modules in hlp.js!");

  // import all the modules
  Object.assign(hlp, __webpack_require__(9));
  Object.assign(hlp, __webpack_require__(10));
  Object.assign(hlp, __webpack_require__(7));

  Object.assign(hlp, __webpack_require__(19));
  Object.assign(hlp, __webpack_require__(3));

  Object.assign(hlp, __webpack_require__(0));
  Object.assign(hlp, __webpack_require__(11));
  Object.assign(hlp, __webpack_require__(1));

  Object.assign(hlp, __webpack_require__(12));
  Object.assign(hlp, __webpack_require__(2));
  Object.assign(hlp, __webpack_require__(13));

  Object.assign(hlp, __webpack_require__(14));
  Object.assign(hlp, __webpack_require__(15));

  hlp.string = {};
  Object.assign(hlp.string, __webpack_require__(16));
  hlp.array = {};
  Object.assign(hlp.array, __webpack_require__(6));

  Object.assign(hlp, __webpack_require__(17));
  Object.assign(hlp, __webpack_require__(5));
  Object.assign(hlp, __webpack_require__(18));
  Object.assign(hlp, __webpack_require__(4));

  console.log("--- hlp.js ---");
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return Engine; });
// contains calls for preload, setup and draw and more

// class to be extended from
class Engine {
  constructor(targetFPS = 60) {
    this._keyPressingDict = {};
    this._keyCodePressingDict = {};

    // handle all the calls
    this.deltaTime = 0;
    this.mouseIsLocked = false;

    this.frameCount = 0;
    this.looping = true;
    this.changeFPS(targetFPS);

    // wait for everything to be loaded
    window.addEventListener("load", () => {
      document.addEventListener("mousemove", (event) => {
        if (!this.mouseIsLocked) this.unlockedMouseMove();
        else this.lockedMouseMove();
        this.mouseMove();
      });

      document.addEventListener("pointerlockchange", () => (this.mouseIsLocked = !this.mouseIsLocked), false);
      document.addEventListener("mozpointerlockchange", () => (this.mouseIsLocked = !this.mouseIsLocked), false);

      document.addEventListener("mousedown", (event) => {
        this.mousePressed();
      });

      document.addEventListener("mouseup", (event) => {
        this.mouseReleased();
      });

      // add to dictionary on keydown and removes and keyup
      document.addEventListener("keydown", (event) => {
        this._keyPressingDict[event.key] = true;
        this._keyCodePressingDict[event.code] = true;
        this.keyPressed();
      });

      document.addEventListener("keyup", (event) => {
        this._keyPressingDict[event.key] = false;
        this._keyCodePressingDict[event.code] = false;
        this.keyReleased();
      });

      // only create loading if user has a preload function
      if (this.preload != null) {
        let loading = document.getElementById("this_loading");
        // create loading text if haven't got loading element
        if (loading == null) {
          loading = document.createElement("p");
          loading.innerHTML = "Loading...";
          loading.id = "this_loading";
          document.body.appendChild(loading);
        }

        loading.style.position = "absolute";
        loading.style.top = "10px";
        loading.style.left = "10px";

        // wait until preload has handled the async things then start
        this.preload().then(() => {
          document.body.removeChild(loading);
          this._start();
        });
      } else {
        this._start();
      }
    });
  }

  // called only once
  _start() {
    if (this.setup != null) this.setup();
    this._timeStarted = performance.now();
    this._timeLastFrame = performance.now();
    this.resume();
  }

  _draw() {
    if (this.looping) requestAnimationFrame(() => this._draw()); // request another frame

    try {
      const now = performance.now();
      const deltaTimeMS = now - this._timeLastFrame; // get ellapsed time between draw call

      const elipson = 5;
      if (deltaTimeMS > this.fpsInterval - elipson) {
        // if time is next frame
        this.frameCount++;
        this.fps = 1000 / deltaTimeMS; // calculate real fps
        this.deltaTime = deltaTimeMS / 1000; // calculate deltaTime in secs
        this.draw(); // the user draw function
        this._timeLastFrame = now;
      }
    } catch (err) {
      this.looping = false;
      console.error(err); // stop animation if error
    }
  }

  // helping functions for user
  stop() {
    this.looping = false;
  }

  resume() {
    if (this.draw != null) {
      this.looping = true;
      this._draw();
    }
  }

  millis() {
    performance.now() - this._timeStarted;
  }

  keyIsDown(key) {
    this._keyPressingDict[key];
  }

  keyCodeIsDown(keyCode) {
    this._keyCodePressingDict[keyCode];
  }

  changeFPS(fps) {
    this.targetFPS = fps;
    this.fps = fps;
    this.fpsInterval = 1000 / fps;
    this._timeLastFrame = performance.now();
  }

  unlockPointer() {
    if (document.exitPointerLock) document.exitPointerLock();
    else document.mozExitPointerLock();
  }

  // functions to overide on user side
  mousePressed() {}
  mouseReleased() {}
  mouseMove() {}
  keyPressed() {}
  keyReleased() {}
  lockedMouseMove() {}
  unlockedMouseMove() {}
  // these functions wont be called if user didn't overide
  // async preload() {}
  // draw() {}
  // setup() {}
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "World", function() { return World; });
/* harmony import */ var _utils_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _utils_unique_id_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _ecs_primitives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);




class World {
  constructor() {
    this.components = new _utils_map__WEBPACK_IMPORTED_MODULE_0__["Map"]();
    this.systems = new _utils_map__WEBPACK_IMPORTED_MODULE_0__["Map"]();
    this.uniqueIdGen = new _utils_unique_id_gen__WEBPACK_IMPORTED_MODULE_1__["UniqueIDGen"]();
  }

  registerComponent(name, properties) {}

  registerSystem(systemGroup, systemClass) {}

  createEntity(properties) {}
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return Matrix; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _calculations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);



// This creates a multi dimensional array and stores it in this.data
class Matrix {
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
    if (!(vec instanceof _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"])) throw new Error("vec must be a vector");
    if (matrix.cols != 4 || matrix.rows != 4) throw new Error("matrix must have 4 cols and 4 rows!");

    const newVec = new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](vec.x, vec.y, vec.z);
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

  randomise(min = 0, max = 1) {
    // sets every element to random number between min and max
    return this.map(() => _calculations__WEBPACK_IMPORTED_MODULE_1__["random"](min, max));
  }

  randomiseGuassian(mean = 0, sd = 1) {
    return this.map(() => _calculations__WEBPACK_IMPORTED_MODULE_1__["randomGaussian"](mean, sd));
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
    return this.map(_calculations__WEBPACK_IMPORTED_MODULE_1__["exp"]);
  }

  floor() {
    // floors every val in matrix
    return this.map(_calculations__WEBPACK_IMPORTED_MODULE_1__["floor"]);
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

  clone() {
    return Matrix.map(this, (val) => val);
  }

  toArray(array1d = false) {
    if (array1d) {
      const array = [];
      this.data.forEach((cols) => array.push(...cols));
      return array;
    } else return this.clone().data;
  }

  static createFromVector(vector) {
    return new Matrix([[vector.x], [vector.y], [vector.z], [0]]);
  }

  toVector() {
    if (this.rows >= 3) {
      return new _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"](this.data[0][0], this.data[1][0], this.data[2][0]);
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
      [0, _calculations__WEBPACK_IMPORTED_MODULE_1__["cos"](angle), _calculations__WEBPACK_IMPORTED_MODULE_1__["sin"](angle), 0],
      [0, -_calculations__WEBPACK_IMPORTED_MODULE_1__["sin"](angle), _calculations__WEBPACK_IMPORTED_MODULE_1__["cos"](angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationY(angle) {
    return new Matrix([
      [_calculations__WEBPACK_IMPORTED_MODULE_1__["cos"](angle), 0, _calculations__WEBPACK_IMPORTED_MODULE_1__["sin"](angle), 0],
      [0, 1, 0, 0],
      [-_calculations__WEBPACK_IMPORTED_MODULE_1__["sin"](angle), 0, _calculations__WEBPACK_IMPORTED_MODULE_1__["cos"](angle), 0],
      [0, 0, 0, 1],
    ]);
  }

  static createRotationZ(angle) {
    return new Matrix([
      [_calculations__WEBPACK_IMPORTED_MODULE_1__["cos"](angle), _calculations__WEBPACK_IMPORTED_MODULE_1__["sin"](angle), 0, 0],
      [-_calculations__WEBPACK_IMPORTED_MODULE_1__["sin"](angle), _calculations__WEBPACK_IMPORTED_MODULE_1__["cos"](angle), 0, 0],
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

  static createPerspective(fovDegrees, aspectRatio, near, far) {
    const fovRadians = toRadians(fovDegrees);
    return new Matrix([
      [aspectRatio * fovRadians, 0, 0, 0],
      [0, fovRadians, 0, 0],
      [0, 0, far / (far - near), 1],
      [0, 0, (-far * near) / (far - near), 0],
    ]);
  }

  static createPointAt(pos, target, up) {
    const newForward = _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].sub(target, pos).normalise();
    const newUp = _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].sub(up, _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].mult(newForward, up.dotProduct(newForward))).normalise();
    const newRight = _vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].crossProduct(newUp, newForward);
    return new Matrix([
      [newRight.x, newRight.y, newRight.z],
      [newUp.x, newUp.y, newUp.z],
      [newForward.x, newForward.y, newForward.z],
      [pos.x, pos.y, pos.z],
    ]);
  }
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AudioSynth", function() { return AudioSynth; });
/* harmony import */ var _utils_unique_id_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


// this is a synth to create simple sounds
// this runs in threads so that multiple sounds can be created
// the thread is a index in the player instead of an onject so not instanciating performance issues

class AudioSynth {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext == null) return alert("Your browser does not support the AudioContext!");
    this.context = new AudioContext();
    this.threads = {};
    this.uniqueIdGen = new _utils_unique_id_gen__WEBPACK_IMPORTED_MODULE_0__["UniqueIDGen"]();
  }

  play(thread, freq, vol, wave) {
    if (freq != null) this.setFreq(thread, freq);
    if (wave != null) this.setWaveType(thread, wave);
    if (vol != null) this.setVolume(thread, vol);

    const selThread = this.threads[thread];
    selThread.oscillator.start(selThread.startTime);
    return this;
  }

  stop(thread, when = 0, useExpRamp = false) {
    const selThread = this.threads[thread];
    if (useExpRamp) this.setVolume(thread, 0.00001, this.context.currentTime + when, true);

    selThread.oscillator.stop(this.context.currentTime + when);
    return this;
  }

  dispose(thread) {
    delete this.threads[thread];
    return this;
  }

  newThread(filter = this.context.destination) {
    const selThread = {};
    this.context.resume();

    // basic setup of oscillator
    selThread.gain = this.context.createGain();
    selThread.gain.connect(filter);
    selThread.oscillator = this.context.createOscillator();
    selThread.oscillator.connect(selThread.gain);
    selThread.compressor = this.context.createDynamicsCompressor();
    selThread.compressor.connect(this.context.destination);

    const id = this.uniqueIdGen.gen();
    this.threads[id] = selThread;
    return id;
  }

  setWaveType(thread, wave) {
    this.threads[thread].oscillator.type = wave;
    return this;
  }

  setFreq(thread, freq, when = 0) {
    const selThread = this.threads[thread];
    const timeNow = this.context.currentTime;
    selThread.oscillator.frequency.setTargetAtTime(freq, timeNow + when, 0);
    return this;
  }

  setVolume(thread, vol, when = 0, useExpRamp = false) {
    const selThread = this.threads[thread];
    const timeNow = this.context.currentTime;

    if (useExpRamp) {
      selThread.gain.gain.setValueAtTime(selThread.gain.gain.value, this.context.currentTime); // reset the gain
      selThread.gain.gain.exponentialRampToValueAtTime(vol, timeNow + when);
    } else {
      selThread.gain.gain.value = vol;
    }

    return this;
  }
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rainbow", function() { return rainbow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rainbowSeizure", function() { return rainbowSeizure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
// anything that are to small and so don't belong to any file

const rainbow = () => {
  [...document.querySelectorAll("*")].forEach((element) => {
    element.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.borderColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  });
};

const rainbowSeizure = () => {
  setInterval(modules.exports.rainbow, 1);
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadString", function() { return loadString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJSON", function() { return loadJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadBytes", function() { return loadBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSound", function() { return loadSound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFont", function() { return loadFont; });
// loading functions that uses promises

const loadString = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const loadJSON = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
};

const loadBytes = async (url) => {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  return new Int8Array(data);
};

const loadSound = (url) => {
  return new Promise((resolve) => {
    resolve(new Audio(url)); // idk if this works
  });
};

const loadFont = async (url) => {
  const fontName = url.split("/").pop().split(".")[0];
  const font = new FontFace(fontName, `url(${url})`);
  const fontFace = await font.load();
  document.fonts.add(fontFace);
  return fontName;
};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "httpPost", function() { return httpPost; });
const httpPost = async (url, type, data, options = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: options.mode || "cors",
    cache: options.cache || "no-cache",
    credentials: options.credentials || "same-origin",
    headers: options.headers || {
      "Content-Type": "application/json",
    },
    redirect: options.redirect || "follow",
    referrerPolicy: options.referrerPolicy || "no-referrer",
    body: JSON.stringify(data),
  });

  if (type == hlp.JSON) return await response.json();
  else if (type == hlp.BLOB) return await response.blob();
  else return await response.text();
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regexEscape", function() { return regexEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smartSplit", function() { return smartSplit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeEscape", function() { return safeEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyToClipboard", function() { return copyToClipboard; });
// useful for parsing strings

const regexEscape = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const smartSplit = (str, charSplit = " ", insideChar, charToDiscludeInsideChar = "") => {
  let formattedStr = str.split(new RegExp(`${hlp.regexEscape(charSplit)}+`, "g")); // regex to avoid double chars
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

const safeEscape = (unsafe) => {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/%/g, "&#37;");
};

const copyToClipboard = async (str) => {
  if (!navigator.clipboard) {
    console.warn("Navigator copy not supported. Using manual copy.");
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


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Set", function() { return Set; });
/* harmony import */ var _primitives_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


// like a normal array but with more features
class Set {
  constructor(count = 0) {
    Object.defineProperty(this, "_array", {
      enumerable: false,
      writable: true,
      // use prexisting array or new Array with count
      value: count instanceof Array ? count.slice() : new Array(count).fill(),
    });

    return new Proxy(this, {
      get(target, name, receiver) {
        const index = Number(name);
        // first check the index
        if (!isNaN(index)) {
          return target._array[index];
        } else {
          // if not then check if name is in Set
          if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);
          // then if function
          if (typeof target._array[name] == "function") {
            // create a function that does the call
            return (...args) => {
              let result = target._array[name](...args);
              if (result instanceof Array) target._array = result;
            };
          } else {
            // else return property in the array object
            return target._array[name];
          }
        }
      },
      set(target, name, value, receiver) {
        const index = Number(name);
        if (!isNaN(index)) {
          target._array[name] = value;
        } else {
          return Reflect.set(target, name, value, receiver);
        }
      },
    });
  }

  log() {
    console.log(this._array);
  }

  clone() {
    return this._array.slice();
  }

  toArray() {
    return this._array;
  }

  serialise() {
    return JSON.stringify(this._array);
  }

  deserialise(str) {
    return new Set(JSON.parse(str));
  }
}

// create funcs from arr thing
const funcs = Object.keys(_primitives_array__WEBPACK_IMPORTED_MODULE_0__);
funcs.forEach((func) => {
  Set.prototype[func] = function (...args) {
    return _primitives_array__WEBPACK_IMPORTED_MODULE_0__[func](...[this._array, ...args]);
  };
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMList", function() { return DOMList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDOM", function() { return selectDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDOM", function() { return createDOM; });
// acts like kindof a normal dom element except it contains and modifies many elements
class DOMList {
  constructor(nodeList) {
    // make _nodeList "hidden"
    Object.defineProperty(this, "_nodeList", {
      enumerable: false,
      writable: false,
      value: [...nodeList],
    });

    // this is so users can get elements using the index operator
    Object.assign(this, nodeList);

    // proxy for styling
    // need to put in func somehow
    // prettier-ignore
    this.style = new Proxy({}, {
      get(target, name) {
        let output = "";
        nodeList.forEach((node) => {
          if (node.style[name] != null) {
            output += node.style[name];
          }
        });

        return output;
      },
      set(target, name, value) {
        nodeList.forEach((node) => {
          if (node.style[name] != null) {
            node.style[name] = value;
          }
        });
      },
    });

    // uses proxy to intercept get and set
    return new Proxy(this, {
      get(target, name, receiver) {
        // if DOMList has a property of name then just use that
        if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);

        // else get property in a string of every node
        const output = [];
        // when user calls function it needs to return a funcion so this does here
        const nodeFuncs = [];
        nodeList.forEach((node) => {
          if (typeof node[name] == "function") {
            // had to be this to avoid illegal invocation
            nodeFuncs.push(node);
          } else if (node[name] != null && nodeFuncs.length < 1) {
            let out = node[name];
            if (out) output.push(out);
          }
        });

        if (nodeFuncs.length > 0) {
          return (...args) => {
            const outputFunc = [];
            nodeFuncs.forEach((node) => {
              let out = node[name](...args);
              if (out) outputFunc.push(out);
            });

            return outputFunc;
          };
        } else {
          return output;
        }
      },
      set(target, name, value, receiver) {
        // same thing but set instead
        if (Reflect.has(target, name)) return Reflect.set(target, name, value, receiver);

        // set every node
        nodeList.forEach((node) => {
          if (node[name] != null) {
            node[name] = value;
          }
        });
      },
    });
  }

  toArray() {
    return this._nodeList;
  }

  forEach(func) {
    for (let i = 0; i < this._nodeList.length; i++) {
      func(this._nodeList[i], i);
    }
  }
}
// helper function for easier use
const selectDOM = (selector) => {
  const nodeList = document.querySelectorAll(selector);
  return new DOMList(nodeList);
};

const createDOM = (name) => {
  const element = document.createElement(name);
  return new DOMList([element]);
};


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "CanvasGraphics", function() { return /* binding */ canvas_graphics_CanvasGraphics; });

// EXTERNAL MODULE: ./src/math/vector.js
var vector = __webpack_require__(1);

// CONCATENATED MODULE: ./src/graphics/renderer2D.js


class renderer2D_Renderer2D {
  constructor(canvas) {
    this.canvas = canvas;

    if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
    else return alert("Browser does not support the canvas!");
    if (this.ctx == null) return alert("Browser does not support the canvas!");

    this._doFill = true;
    this._doStroke = true;
    this._firstPosShape = new vector["Vector"](0, 0);
    this._firstPosShape._using = false;
    this._font = "Arial";
    this._fontSize = 10;
    this._prevStates = [];

    this._cacheFill = null;
    this._cacheStroke = null;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  fill(str) {
    this._doFill = true;
    if (str !== this._cacheFill) {
      this.ctx.fillStyle = str;
      this._cacheFill = str;
    }
  }

  stroke(str) {
    this._doStroke = true;
    if (str !== this._cacheStroke) {
      this.ctx.strokeStyle = str;
      this._cacheStroke = str;
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
    this.ctx.beginPath();
  }

  endShape(close) {
    if (close) this.ctx.closePath(this._firstPosShape.x, this._firstPosShape.y);
    if (this._doFill) this.ctx.fill();
    if (this._doStroke) this.ctx.stroke();
  }

  vertex(x, y) {
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

  image(img, x, y, width, height) {
    this.ctx.drawImage(img, x, y, width, height);
  }

  triangle(x1, y1, x2, y2, x3, y3) {
    this.beginShape();
    this.vertex(x1, y1);
    this.vertex(x2, y2);
    this.vertex(x3, y3);
    this.endShape();
  }

  triangleInflate(v1, v2, v3, inflateAmount) {
    // calculate middle
    const center = new vector["Vector"](v1.x + v2.x + v3.x, v1.y + v2.y + v3.y).div(3);
    v1 = hlp.Vector.sub(v1, center);
    v2 = hlp.Vector.sub(v2, center);
    v3 = hlp.Vector.sub(v3, center);

    // inflate tri by inflantAmount px
    this.triangle(v1.setMag(v1.mag() + inflateAmount).add(center), v2.setMag(v2.mag() + inflateAmount).add(center), v3.setMag(v3.mag() + inflateAmount).add(center));
  }

  point(x, y) {
    this.rect(x, y, 1, 1);
  }

  line(x1, y1, x2, y2) {
    this.beginShape();
    this.vertex(x1, y1);
    this.vertex(x2, y2);
    this.endShape(false);
  }

  // make a rectangle that fills the screen (clears it)
  background() {
    this.rect(0, 0, this.width, this.height);
  }

  translate(x, y) {
    this.ctx.translate(x, y);
  }

  rotate(x) {
    this.ctx.rotate(x);
  }

  scale(x, y) {
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

  rendererResize(w, h) {
    this.width = w;
    this.height = h;
  }
}

// EXTERNAL MODULE: ./src/graphics/colour.js
var colour = __webpack_require__(3);

// EXTERNAL MODULE: ./src/misc/constants.js
var constants = __webpack_require__(2);

// CONCATENATED MODULE: ./src/graphics/canvas_base.js



class canvas_base_CanvasBase {
  constructor(width, height) {
    // initialize variables
    if (width === constants["FULL"]) {
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
    this.canvas.classList.add("hlpCanvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;

    document.body.appendChild(this.canvas); // adds to the body

    if (this.isFull) {
      window.addEventListener("resize", (event) => {
        this._resizeFull();
      });
    }

    this.mouse = new vector["Vector"](0, 0);
    this.mouseMovement = new vector["Vector"](0, 0);

    document.body.addEventListener("mousemove", (event) => {
      const clientRect = this.canvas.getBoundingClientRect();
      this.mouse.set(event.clientX - clientRect.left, event.clientY - clientRect.top);
      this.mouseMovement.set(event.movementX, event.movementY);
    });
  }

  lockMouse() {
    this.canvas.requestPointerLock();
  }

  resizeCanvas(w, h) {
    if (this._renderer != null) this._renderer.rendererResize(w, h);

    this.width = w;
    this.height = h;
    if (this.canvas != null) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  _resizeFull() {
    let newInnerHeight = window.innerHeight;
    if (this.aspectRatio != null) {
      const aspectHeight = window.innerWidth / this.aspectRatio;
      if (aspectHeight < window.innerHeight) newInnerHeight = aspectHeight;
    }

    this.resizeCanvas(this.aspectRatio != null ? newInnerHeight * this.aspectRatio : innerWidth, newInnerHeight);
  }

  remove() {
    document.body.removeChild(this.canvas);
  }
}

// CONCATENATED MODULE: ./src/graphics/canvas_graphics.js






// the canvas object for canvas drawing

class canvas_graphics_CanvasGraphics extends canvas_base_CanvasBase {
  constructor(width, height, renderer = constants["renderer2D"]) {
    super(width, height);

    if (renderer == constants["renderer2D"]) {
      this._renderer = new renderer2D_Renderer2D(this.canvas);
    } else return console.error("Unknown Renderer!");
  }

  fill(c1, c2, c3, a) {
    if (typeof c1 == "string") {
      // if using string
      this._renderer.fill(c1);
    } else if (c1 instanceof colour["Colour"]) {
      // if using cool colour
      this._renderer.fill(c1.toString());
    } else {
      // just numbers
      this._renderer.fill(colour["Colour"].toString(c1, c2, c3, a));
    }
  }

  stroke(c1, c2, c3, a) {
    // same thing as fill
    if (typeof c1 == "string") {
      this._renderer.stroke(c1);
    } else if (c1 instanceof colour["Colour"]) {
      this._renderer.stroke(c1.toString());
    } else {
      this._renderer.stroke(colour["Colour"].toString(c1, c2, c3, a));
    }
  }

  noFill() {
    this._renderer.noFill();
  }

  noStroke() {
    this._renderer.noStroke();
  }

  strokeWeight(s) {
    this._renderer.strokeWeight(s);
  }

  beginShape() {
    this._renderer.beginShape();
  }

  endShape(close = true) {
    if (!this._renderer._firstPosShape._using) throw new Error("Cannot close shape before beggining!");
    this._renderer.endShape(close);
    this._renderer._firstPosShape._using = false;
  }

  vertex(x, y) {
    if (x instanceof vector["Vector"]) {
      // if vector, treat x as a vector
      this._renderer.vertex(x.x, x.y);
    } else {
      // else treat parameters normally
      this._renderer.vertex(x, y);
    }
  }

  rect(x, y, width, height) {
    if (x instanceof vector["Vector"]) this._renderer.rect(x.x, x.y, y, width);
    else this._renderer.rect(x, y, width, height);
  }

  image(img, x, y, width = img.width, height = img.height) {
    if (x instanceof vector["Vector"]) this._renderer.image(img, x.x, x.y, y, width);
    else this._renderer.image(img, x, y, width, height);
  }

  triangle(x1, y1, x2, y2, x3, y3) {
    if (x1 instanceof vector["Vector"]) this._renderer.triangle(x1.x, x1.y, y1.x, y1.y, x2.x, x2.y);
    else this._renderer.triangle(x1, y1, x2, y2, x3, y3);
  }

  triangleInflate(x1, y1, x2, y2 = 1, x3, y3, inflateAmount = 1) {
    if (x1 instanceof vector["Vector"]) this._renderer.triangleInflate(x1, y1, x2, y2);
    else this._renderer.triangleInflate(new vector["Vector"](x1, y1), new vector["Vector"](x2, y2), new vector["Vector"](x3, y3), inflateAmount);
  }

  point(x, y) {
    if (x instanceof vector["Vector"]) this._renderer.point(x.x, x.y);
    else this._renderer.point(x, y);
  }

  line(x1, y1, x2, y2) {
    if (x1 instanceof vector["Vector"]) this._renderer.line(x1.x, x1.y, y1.x, y1.y);
    else this._renderer.line(x1, y1, x2, y2);
  }

  // make a rectangle that fills the screen (clears it)
  background(...args) {
    this.push();
    this.fill(...args);
    this.noStroke();
    this._renderer.background();
    this.pop();
  }

  translate(x, y = 0) {
    if (x instanceof vector["Vector"]) this._renderer.translate(x.x, x.y);
    else this._renderer.translate(x, y);
  }

  rotate(x) {
    this._renderer.rotate(toRadians(x));
  }

  scale(x, y = 0) {
    if (x instanceof vector["Vector"]) this._renderer.scale(x.x, x.y);
    else this._renderer.scale(x, y);
  }

  // push and pop to restore and save states
  push() {
    this._renderer.push();
  }

  pop() {
    this._renderer.pop();
  }

  // TEXT STUFF DOWN HERE
  text(str, x, y) {
    if (x instanceof vector["Vector"]) this._renderer.text(str, x.x, x.y);
    else this._renderer.text(str, x, y);
  }

  textFont(font) {
    this._renderer.textFont(font);
  }

  textSize(size) {
    this._renderer.textSize(size);
  }

  textAlign(mode) {
    this._renderer.textAlign(mode);
  }
}


/***/ })
/******/ ]);