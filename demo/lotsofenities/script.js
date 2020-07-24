const canvas = new hlp.Canvas(hlp.FULL, 1);

hlp.setup = () => {};

hlp.draw = () => {
  canvas.push();
  canvas.background(0);
  canvas.fill(155);
  canvas.rect(100, 100, 100, 100);
  canvas.pop();
};
