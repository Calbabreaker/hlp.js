const canvas = new hlp.Canvas(hlp.FULL, 1);
const renderer = new hlp.RendererCPU(canvas);

let model;

hlp.preload = async () => {
  model = await hlp.loadMesh("suzzane.obj");
  console.log(model);
};

hlp.setup = () => {
  hlp.changeFPS(60);
};

hlp.draw = () => {
  canvas.background(0);
  const velocity = new hlp.Vector();
  if (hlp.keyCodeIsDown("KeyW")) velocity.add(renderer.lookDir);
  if (hlp.keyCodeIsDown("KeyS")) velocity.sub(renderer.lookDir);
  renderer.cameraPos.add(velocity.normalise().mult((hlp.keyCodeIsDown("ShiftLeft") ? 16 : 4) * hlp.deltaTime));
  renderer.draw(model);

  canvas.fill(255);
  canvas.ctx.font = "30px Arial";
  canvas.ctx.fillText(hlp.math.round(hlp.fps), 10, 50);
};

hlp.mousePressed = () => {
  canvas.lockMouse();
};

hlp.lockedMouseMove = () => {
  renderer.yawX -= canvas.mouseMovement.x * 0.1 * hlp.deltaTime;
  renderer.yawY = hlp.math.constrain(renderer.yawY + canvas.mouseMovement.y * 0.1 * hlp.deltaTime, -1.5, 1.5);
};
