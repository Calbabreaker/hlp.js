const canvas = new hlp.Canvas();

let img;
let font;

hlp.preload = async () => {
  const result = await Promise.all([hlp.loadImage("cool.png"), hlp.loadFont("AmaticSC.ttf")]);
  img = result[0];
  font = result[1];
};

hlp.setup = () => {
  hlp.changeFPS(60);
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

  canvas.pop();
};
