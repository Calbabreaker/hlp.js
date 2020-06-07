hlp.setDrawingCanvas = (canvas) => {
  hlp.drawingCanvas = canvas;
};

hlp.Line = class Line {
  constructor(x1, y1, x2, y2) {
    if (x1 instanceof hlp.Vector) {
      this.a = x1.copy();
      this.b = y1.copy();
    } else {
      this.a = new hlp.Vector(x1, y1);
      this.b = new hlp.Vector(x2, y2);
    }
  }
};

hlp.Shape2D = class Shape2D {
  constructor(x, y, lines) {
    this.pos = new hlp.Vector(x, y);
    this.lines = lines;
    this.lines.forEach((line) => {
      line.a.add(this.pos);
      line.b.add(this.pos);
    });
  }

  move(x, y) {
    const newPos = new hlp.Vector(x, y);
    const diff = hlp.Vector.sub(this.pos, newPos);
    this.pos = newPos;

    this.lines.forEach((line) => {
      line.a.add(diff);
      line.b.add(diff);
    });
  }

  draw(close = true) {
    if (hlp.drawingCanvas == null) return;
    hlp.drawingCanvas.beginShape();
    this.lines.forEach((line) => {
      hlp.drawingCanvas.vertex(line.a.x, line.a.y);
    });

    hlp.drawingCanvas.endShape(close);
  }
};

hlp.Rectangle2D = class Rectangle2D extends hlp.Shape2D {
  constructor(x, y, w = 1, h = 1) {
    // prettier-ignore
    super(x, y, [
      new hlp.Line(0, 0, w, 0), 
      new hlp.Line(w, 0, w, h), 
      new hlp.Line(w, h, 0, 1), 
      new hlp.Line(0, h, 0, 0)
    ]);
  }
};

hlp.Triangle2D = class Triangle2D extends hlp.Shape2D {
  constructor(x1, y1, x2, y2, x3, y3) {
    // prettier-ignore
    super(x, y, [
      new hlp.Line(x1, y1, x2, y2), 
      new hlp.Line(x2, y2, x3, y3), 
      new hlp.Line(x3, y3, x1, y1), 
    ]);
  }
};
