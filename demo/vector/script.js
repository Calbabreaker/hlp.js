const canvas = new hlp.Canvas(hlp.FULL);

canvas.draw = () => {
  canvas.background(0, 0, 0);
  canvas.translate(canvas.width / 2, canvas.height / 2);
  let vector = hlp.Vector.fromAngle(hlp.Vector.sub(canvas.mouse, new hlp.Vector(canvas.width / 2, canvas.height / 2)).heading(), 100);
  canvas.stroke(255, 100, 0);
  canvas.strokeWeight(5);
  canvas.line(0, 0, vector.x, vector.y);
}