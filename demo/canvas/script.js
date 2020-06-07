const canvas = new hlp.Canvas();
const shape = new hlp.Rectangle2D(10, 10, 100, 100);

let img;

hlp.preload = async () => {
  img = await hlp.loadImage("cool.png");
};

hlp.setup = () => {
  hlp.setDrawingCanvas(canvas);
};

hlp.draw = () => {
  canvas.background(0);
  canvas.image(img, canvas.width / 2, canvas.height / 2);
  canvas.fill(255, 0, 0);
  shape.draw();
};
