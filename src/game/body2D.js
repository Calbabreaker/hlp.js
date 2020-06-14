// shapes so that physics and collision could be done easy

// line for intersections
hlp.Line = class {
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

// base shape2D for shapes to inherit
hlp.Body2D = class {
  constructor(x, y, lines = []) {
    this.pos = new hlp.Vector(x, y);
    this.lines = lines;
    this.lines.forEach((line) => {
      line.a.add(this.pos);
      line.b.add(this.pos);
    });

    this.fill = new hlp.Colour(255, 255, 255);
    this.stroke = new hlp.Colour(0, 0, 0);
  }

  addLine(line) {
    line.a.add(this.pos);
    line.b.add(this.pos);
    this.lines.push(line);
  }

  rotate(angle) {
    this.lines.forEach((line) => {
      line.a.sub(this.pos);
      line.b.sub(this.pos);
      line.a.rotate(angle);
      line.b.rotate(angle);
      line.a.add(this.pos);
      line.b.add(this.pos);
    });
  }

  rotateTo(angle) {
    this.lines.forEach((line) => {
      line.a.sub(this.pos);
      line.b.sub(this.pos);
      line.a.rotateTo(angle);
      line.b.rotateTo(angle);
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

  draw(canvas) {
    canvas.beginShape();
    canvas.fill(this.fill);
    canvas.stroke(this.stroke);
    this.lines.forEach((line) => {
      canvas.vertex(line.a.x, line.a.y);
    });

    canvas.endShape();
  }
};

hlp.Rectangle2D = class extends hlp.Body2D {
  constructor(x, y, w, h) {
    super(x, y);
    w = w / 2;
    h = h / 2;
    this.addLine(new Line(-w, -h, w, -h));
    this.addLine(new Line(w, -h, w, h));
    this.addLine(new Line(w, h, -w, h));
    this.addLine(new Line(-w, h, -w, -h));
  }
};

hlp.Triangle2D = class extends hlp.Body2D {
  constructor(x1, y1, x2, y2, x3, y3) {
    // prettier-ignore
    super(x, y, [
      new hlp.Line(x1, y1, x2, y2), 
      new hlp.Line(x2, y2, x3, y3), 
      new hlp.Line(x3, y3, x1, y1), 
    ]);
  }
};

hlp.Polygon2D = class extends hlp.Body2D {
  constructor(x, y, w, h = w, detail = 3) {
    // lots of detail = circle
    super(x, y, []);
    if (detail < 3) throw new Error("Cannot create shape with less than 3 detail!");

    const vertices = [];
    for (let i = 0; i < detail; i++) {
      const angle = 360 / detail;
      const x2 = x + w * Math.cos(hlp.toRadians(angle * i));
      const y2 = y + h * Math.sin(hlp.toRadians(angle * i));
      vertices.push(new hlp.Vector(x2, y2));
    }

    vertices.forEach((vertex, i) => {
      this.lines.push(new hlp.Line(vertex, vertices[(i + 1) % vertices.length]));
    });
  }
};
