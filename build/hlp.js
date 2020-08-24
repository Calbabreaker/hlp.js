/*!
 * hlp.js v1.0.2 by Calbabreaker 2020-08-24 
 * Free to use. GPL-3.0.
 * 
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// init of hlp
if (window.hlp != null) {
  alert("Cannot import hlp, instance of the hlp libary is already in use!");
  console.error("Cannot import hlp, instance of the hlp libary is already in use!");
} else {
  const hlp = {};
  window.hlp = hlp;

  // import all the modules
  hlp.Canvas = __webpack_require__(1);

  console.log("--- hlp.js ---");
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// the canvas object for canvas drawing

class Canvas {
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
    } else return console.error("Unknown Renderer!");

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
  }

  fill(c1, c2, c3, a) {
    if (typeof c1 == "string") {
      // if using string
      this._renderer.fill(c1);
    } else if (c1 instanceof hlp.Colour) {
      // if using cool hlp colour
      this._renderer.fill(c1.toString());
    } else {
      // just numbers
      this._renderer.fill(hlp.Colour.toString(c1, c2, c3, a));
    }
  }

  stroke(c1, c2, c3, a) {
    // same thing as fill
    if (typeof c1 == "string") {
      this._renderer.stroke(c1);
    } else if (c1 instanceof hlp.Colour) {
      this._renderer.stroke(c1.toString());
    } else {
      this._renderer.stroke(hlp.Colour.toString(c1, c2, c3, a));
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
    if (x instanceof hlp.Vector) {
      // if vector, treat x as a vector
      this._renderer.vertex(x.x, x.y);
    } else {
      // else treat parameters normally
      this._renderer.vertex(x, y);
    }
  }

  rect(x, y, width, height) {
    if (x instanceof hlp.Vector) this._renderer.rect(x.x, x.y, y, width);
    else this._renderer.rect(x, y, width, height);
  }

  image(img, x, y, width = img.width, height = img.height) {
    if (x instanceof hlp.Vector) this._renderer.image(img, x.x, x.y, y, width);
    else this._renderer.image(img, x, y, width, height);
  }

  triangle(x1, y1, x2, y2, x3, y3) {
    if (x1 instanceof hlp.Vector) this._renderer.triangle(x1.x, x1.y, y1.x, y1.y, x2.x, x2.y);
    else this._renderer.triangle(x1, y1, x2, y2, x3, y3);
  }

  triangleInflate(x1, y1, x2, y2 = 1, x3, y3, inflateAmount = 1) {
    if (x1 instanceof hlp.Vector) this._renderer.triangleInflate(x1, y1, x2, y2);
    else this._renderer.triangleInflate(new Vector(x1, y1), new Vector(x2, y2), new Vector(x3, y3), inflateAmount);
  }

  point(x, y) {
    if (x instanceof hlp.Vector) this._renderer.point(x.x, x.y);
    else this._renderer.point(x, y);
  }

  line(x1, y1, x2, y2) {
    if (x1 instanceof hlp.Vector) this._renderer.line(x1.x, x1.y, y1.x, y1.y);
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
    if (x instanceof hlp.Vector) this._renderer.translate(x.x, x.y);
    else this._renderer.translate(x, y);
  }

  rotate(x) {
    this._renderer.rotate(hlp.toRadians(x));
  }

  scale(x, y = 0) {
    if (x instanceof hlp.Vector) this._renderer.scale(x.x, x.y);
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
    if (x instanceof hlp.Vector) this._renderer.text(str, x.x, x.y);
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

/* harmony default export */ __webpack_exports__["default"] = (Canvas);


/***/ })
/******/ ]);