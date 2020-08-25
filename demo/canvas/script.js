class Game extends hlp.Engine {
  async preload() {
    this.img = await hlp.loadImage("cool.png");
    this.font = await hlp.loadFont("AmaticSC.ttf");
  }

  setup() {
    this.canvas = new hlp.Canvas();
  }

  draw() {
    this.canvas.push();
    this.canvas.background(0);
    this.canvas.image(this.img, this.canvas.width / 2, this.canvas.height / 2);

    this.canvas.fill(0, 255, 100);
    this.canvas.textSize(44);
    this.canvas.textFont(this.font);
    this.canvas.text("Me rn", 250, 250);
    this.canvas.text(hlp.round(this.fps), 10, this.canvas.height - 10);

    this.canvas.rect(this.canvas.mouse, 50, 50);

    this.canvas.pop();
  }
}

const game = new Game();
