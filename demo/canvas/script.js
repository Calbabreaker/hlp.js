const canvas = new hlp.Canvas();
const shape = new hlp.Polygon2D(100, 100, 100, 100, 5);

let img;
let font;

hlp.preload = async () => {
  Promise.all([(img = await hlp.loadImage("cool.png")), (font = await hlp.loadFont("AmaticSC.ttf"))]);
};

hlp.setup = () => {
  hlp.setDrawingCanvas(canvas);
};

hlp.draw = () => {
  canvas.push();
  canvas.background(0);
  canvas.image(img, canvas.width / 2, canvas.height / 2);

  canvas.fill(0, 255, 100);
  canvas.textSize(44);
  canvas.textFont(font);
  canvas.text("Me rn", 250, 250);
  canvas.text(hlp.round(hlp.fps), 10, canvas.height - 10);

  canvas.fill(255, 0, 0);
  shape.draw();
  shape.rotate(1);

  for (let i = 0; i < 360; i += 10) {
    const hit = hlp.raycast(canvas.mouse.x, canvas.mouse.y, i, [shape])[0];
    canvas.stroke(255);
    if (hit != null) canvas.line(canvas.mouse.x, canvas.mouse.y, hit.point.x, hit.point.y);
  }

  canvas.pop();
};
