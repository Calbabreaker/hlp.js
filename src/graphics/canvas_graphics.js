import { Renderer2D } from "./renderer2D";
import { Vector } from "../math/vector";
import { Colour } from "./colour";
import * as constants from "../misc/constants";
import { CanvasBase } from "./canvas_base";

// the canvas object for canvas drawing

export class CanvasGraphics extends CanvasBase {
  constructor(width, height, renderer = constants.renderer2D) {
    super(width, height);

    if (renderer == constants.renderer2D) {
      this._renderer = new Renderer2D(this.canvas);
    } else return console.error("Unknown Renderer!");
  }

  fill(c1, c2, c3, a) {
    if (typeof c1 == "string") {
      // if using string
      this._renderer.fill(c1);
    } else if (c1 instanceof Colour) {
      // if using cool colour
      this._renderer.fill(c1.toString());
    } else {
      // just numbers
      this._renderer.fill(Colour.toString(c1, c2, c3, a));
    }
  }

  stroke(c1, c2, c3, a) {
    // same thing as fill
    if (typeof c1 == "string") {
      this._renderer.stroke(c1);
    } else if (c1 instanceof Colour) {
      this._renderer.stroke(c1.toString());
    } else {
      this._renderer.stroke(Colour.toString(c1, c2, c3, a));
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
    if (x instanceof Vector) {
      // if vector, treat x as a vector
      this._renderer.vertex(x.x, x.y);
    } else {
      // else treat parameters normally
      this._renderer.vertex(x, y);
    }
  }

  rect(x, y, width, height) {
    if (x instanceof Vector) this._renderer.rect(x.x, x.y, y, width);
    else this._renderer.rect(x, y, width, height);
  }

  image(img, x, y, width = img.width, height = img.height) {
    if (x instanceof Vector) this._renderer.image(img, x.x, x.y, y, width);
    else this._renderer.image(img, x, y, width, height);
  }

  triangle(x1, y1, x2, y2, x3, y3) {
    if (x1 instanceof Vector) this._renderer.triangle(x1.x, x1.y, y1.x, y1.y, x2.x, x2.y);
    else this._renderer.triangle(x1, y1, x2, y2, x3, y3);
  }

  triangleInflate(x1, y1, x2, y2 = 1, x3, y3, inflateAmount = 1) {
    if (x1 instanceof Vector) this._renderer.triangleInflate(x1, y1, x2, y2);
    else this._renderer.triangleInflate(new Vector(x1, y1), new Vector(x2, y2), new Vector(x3, y3), inflateAmount);
  }

  point(x, y) {
    if (x instanceof Vector) this._renderer.point(x.x, x.y);
    else this._renderer.point(x, y);
  }

  line(x1, y1, x2, y2) {
    if (x1 instanceof Vector) this._renderer.line(x1.x, x1.y, y1.x, y1.y);
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
    if (x instanceof Vector) this._renderer.translate(x.x, x.y);
    else this._renderer.translate(x, y);
  }

  rotate(x) {
    this._renderer.rotate(toRadians(x));
  }

  scale(x, y = 0) {
    if (x instanceof Vector) this._renderer.scale(x.x, x.y);
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
    if (x instanceof Vector) this._renderer.text(str, x.x, x.y);
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
