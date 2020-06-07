const canvas = new hlp.Canvas();
const shape = new hlp.Polygon2D(100, 100, 100, 100);

let img;

hlp.preload = async () => {
  img = await hlp.loadImage("cool.png");
};

hlp.setup = () => {
  hlp.setDrawingCanvas(canvas);
};

hlp.draw = () => {
  canvas.push();
  canvas.background(0);
  canvas.image(img, canvas.width / 2, canvas.height / 2);
  canvas.fill(255, 0, 0);
  shape.draw();
  shape.rotate(1);

  for (let i = 0; i < 360; i++) {
    const hit = hlp.raycast(canvas.mouse.x, canvas.mouse.y, i, [shape])[0];
    canvas.stroke(255);
    if (hit != null) canvas.line(canvas.mouse.x, canvas.mouse.y, hit.point.x, hit.point.y);
  }

  canvas.pop();
};
