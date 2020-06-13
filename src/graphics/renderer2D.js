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
