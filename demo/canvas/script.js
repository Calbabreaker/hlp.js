const canvas = new hlp.Canvas();

let img;

hlp.preload = async () => {
  img = await hlp.loadImage("cool.png");
};

hlp.draw = () => {
  canvas.background(hlp.random(0, 255), hlp.random(0, 255), hlp.random(0, 255));
  canvas.image(img, canvas.width / 2, canvas.height / 2);
};
