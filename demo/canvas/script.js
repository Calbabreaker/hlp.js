const canvas = new hlp.Canvas();

let img;

hlp.preload = async () => {
  img = await hlp.loadImage("cool.png");
};

hlp.draw = () => {
  canvas.background(0);
  canvas.image(img, canvas.mouse.x, canvas.mouse.y);
};
