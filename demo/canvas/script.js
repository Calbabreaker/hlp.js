const canvas = new hlp.Canvas();

const body = new hlp.Polygon2D(100, 100, 100, 100, 5);
const controller = new hlp.Controller2D(canvas);
controller.add(body);
body.fill.set(255, 0, 0);

let img;
let font;

hlp.preload = async () => {
  img = await hlp.loadImage("cool.png");
  font = await hlp.loadFont("AmaticSC.ttf");
};

hlp.setup = () => {};

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
  body.rotate(100 * hlp.deltaTime);
  controller.draw();

  for (let i = 0; i < 360; i += 1) {
    const hit = controller.raycast(canvas.mouse.x, canvas.mouse.y, i)[0];
    canvas.stroke(255);
    if (hit != null) canvas.line(canvas.mouse.x, canvas.mouse.y, hit.point.x, hit.point.y);
  }

  canvas.pop();
};
