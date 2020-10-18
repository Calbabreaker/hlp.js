class Game extends hlp.Engine {
  async preload() {
    this.img = await hlp.loadImage("cool.png");
    this.font = await hlp.loadFont("AmaticSC.ttf");
  }

  setup() {
    this.canvas = new hlp.CanvasGraphics();
  }

  draw() {
    this.canvas.push();
    this.canvas.background(0);

    // draw image
    this.canvas.image(this.img, this.canvas.width / 2, this.canvas.height / 2);

    // draw text
    this.canvas.fill(0, 255, 100);
    this.canvas.textSize(44);
    this.canvas.textFont(this.font);
    this.canvas.text("Nice", 250, 250);
    this.canvas.text(hlp.round(this.fps), 10, this.canvas.height - 10);

    // draw rect at mouse pos
    this.canvas.rect(hlp.Vector.sub(this.canvas.mouse, 25), 50, 50);

    this.canvas.pop();
  }
}

const game = new Game();
