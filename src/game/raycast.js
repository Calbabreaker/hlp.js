hlp.raycast = (x, y, angle, shapes, forwardHeading, clipStart = 0, clipEnd = 10000) => {
  const hits = [];
  shapes.forEach((shape) => {
    shape.lines.forEach((line) => {
      // anonymous function so return is like a continue
      (() => {
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
          const pt = new hlp.Vector();
          pt.x = pos1.x + t * (pos2.x - pos1.x);
          pt.y = pos1.y + t * (pos2.y - pos1.y);

          let distance = pt.dist(pos3);
          if (forwardHeading != null) {
            const a = hlp.toRadians(this.angle) - hlp.toRadians(Player.instance.heading);
            distance *= hlp.cos(a);
          }

          if (distance >= clipStart) {
            hits.push({
              distance: distance,
              line: line,
              shape: shape,
              point: pt,
            });
          }
        }
      })();
    });
  });

  // sort by distance
  hits.sort((a, b) => {
    return a.distance - b.distance;
  });

  return hits;
};
