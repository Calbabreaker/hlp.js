const canvas = new hlp.Canvas(600, 600);
const renderer = new hlp.Renderer3D(canvas);

let model;

canvas.preload = async () => {
  model = await hlp.Mesh.loadFromFile("assets/suzzane.obj");
}

canvas.setup = () => {
  canvas.changeFPS(60);
}

canvas.draw = () => {
  canvas.background(0);
  const velocity = new hlp.Vector();
  if (canvas.keyCodeIsDown("KeyW")) velocity.add(renderer.lookDir);
  if (canvas.keyCodeIsDown("KeyS")) velocity.sub(renderer.lookDir);
  renderer.cameraPos.add(velocity.normalise().mult(canvas.keyCodeIsDown("ShiftLeft") ? 16 : 4 * canvas.deltaTime));

  renderer.draw(model);
}

canvas.mousePressed = () => {
  canvas.lockMouse();
}

canvas.lockedMouseMove = () => {
  renderer.yawX -= canvas.mouseMovement.x * 0.1 * canvas.deltaTime;
  renderer.yawY = hlp.Math.constrain(renderer.yawY + canvas.mouseMovement.y * 0.1 * canvas.deltaTime, -1.5, 1.5);
}