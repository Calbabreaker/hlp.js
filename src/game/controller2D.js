hlp.Controller2D = class Controller2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.bodies = [];
  }

  remove(body) {
    if (body._index < 0 || body_index > this.bodies.length - 1) throw new Error("Invalid Body for removing");

    // swaps last element of array to the body index and removes last (should be O(1))
    const lastBody = this.bodies[this.bodies.length - 1];
    this.bodies[body._index] = lastBody;
    lastBody._index = body._index;
    this.bodies.pop();
  }

  // array or single
  add(body) {
    if (body instanceof Array) {
      body.forEach((b) => {
        this._addBody(b);
      });
    } else {
      this._addBody(body);
    }
  }

  // for no repetition
  _addBody(body) {
    if (!(body instanceof hlp.Body2D)) throw new Error("Body not a Body2D!");
    body._index = this.bodies.length;
    this.bodies.push(body);
  }

  draw() {
    this.canvas.push();
    this.bodies.forEach((body) => {
      body.draw(this.canvas);
    });

    this.canvas.pop();
  }

  update() {}

  raycast(x, y, angle, clipStart = 0, clipEnd = 10000, forwardHeading) {
    const hits = [];
    this.bodies.forEach((body) => {
      body.lines.forEach((line) => {
        // anonymous function so return is like a continue
        const pos1 = line.a;
        const pos2 = line.b;
        const pos3 = new hlp.Vector(x, y);
        const pos4 = hlp.Vector.add(pos3, hlp.Vector.fromAngle(angle, clipEnd));

        const den = (pos1.x - pos2.x) * (pos3.y - pos4.y) - (pos1.y - pos2.y) * (pos3.x - pos4.x);

        // checks intersection
        if (den == 0) return;

        // at what point
        const t = ((pos1.x - pos3.x) * (pos3.y - pos4.y) - (pos1.y - pos3.y) * (pos3.x - pos4.x)) / den;
        const u = -((pos1.x - pos2.x) * (pos1.y - pos3.y) - (pos1.y - pos2.y) * (pos1.x - pos3.x)) / den;
        if (t > 0 && t < 1 && u > 0) {
          // create a pt vector
          const pt = new hlp.Vector(pos1.x + t * (pos2.x - pos1.x), pos1.y + t * (pos2.y - pos1.y));

          let distance = pt.dist(pos3);
          if (forwardHeading != null) {
            const a = hlp.toRadians(angle) - hlp.toRadians(forwardHeading);
            distance *= hlp.cos(a);
          }

          if (distance >= clipStart) {
            hits.push({
              distance: distance,
              line: line,
              body: body,
              point: pt,
            });
          }
        }
      });
    });

    // sort by distance
    hits.sort((a, b) => {
      return a.distance - b.distance;
    });

    return hits;
  }
};
