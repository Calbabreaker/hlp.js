import Vector from "../math/vector";

class Renderer2D {
  constructor(canvas) {
    this.canvas = canvas;

    if (this.canvas.getContext) this.ctx = this.canvas.getContext("2d");
    else return alert("Browser does not support the canvas!");
    if (this.ctx == null) return alert("Browser does not support the canvas!");

    this._doFill = true;
    this._doStroke = true;
    this._firstPosShape = new Vector(0, 0);
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
    const center = new Vector(v1.x + v2.x + v3.x, v1.y + v2.y + v3.y).div(3);
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

export default Renderer2D;
