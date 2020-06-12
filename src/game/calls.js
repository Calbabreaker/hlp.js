// contains calls for preload, setup and draw and more

// wait for everything to be loaded
window.addEventListener("load", () => {
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  hlp.keyPressingDict = {};
  hlp.keyCodePressingDict = {};

  // handle all the calls
  hlp._timeLastFrame = performance.now();
  hlp.deltaTime = 0;
  hlp.mouseIsLocked = false;

  hlp.frameCount = 0;
  hlp.targetFPS = 60;
  hlp.looping = true;
  hlp.fpsInterval = 1000 / hlp.targetFPS;
  hlp.fps = 0;

  document.addEventListener("mousemove", (event) => {
    if (!hlp.mouseIsLocked) hlp.unlockedMouseMove();
    else hlp.lockedMouseMove();
  });

  document.addEventListener("pointerlockchange", () => (hlp.mouseIsLocked = !hlp.mouseIsLocked), false);
  document.addEventListener("mozpointerlockchange", () => (hlp.mouseIsLocked = !hlp.mouseIsLocked), false);

  document.addEventListener("mousedown", (event) => {
    hlp.mousePressed();
  });

  // add to dictionary on keydown and removes and keyup
  document.addEventListener("keydown", (event) => {
    hlp.keyPressingDict[event.key] = true;
    hlp.keyCodePressingDict[event.code] = true;
    hlp.keyPressed();
  });

  document.addEventListener("keyup", (event) => {
    hlp.keyPressingDict[event.key] = false;
    hlp.keyCodePressingDict[event.code] = false;
    hlp.keyReleased();
  });

  hlp._draw = () => {
    if (hlp.looping) requestAnimationFrame(hlp._draw); // request another frame

    try {
      const now = performance.now();
      const deltaTimeMS = now - hlp._timeLastFrame; // get ellapsed time between draw call

      const elipson = 5;
      if (deltaTimeMS > hlp.fpsInterval - elipson) {
        // if time is next frame
        hlp.frameCount++;
        hlp.fps = 1000 / deltaTimeMS; // calculate real fps
        hlp.deltaTime = deltaTimeMS / 1000; // calculate deltaTime in secs
        hlp.draw(); // the user draw it
        hlp._timeLastFrame = now;
      }
    } catch (err) {
      hlp.looping = false;
      console.error(err); // stop animation if error
    }
  };

  // create loading text if haven't
  let loading = document.getElementById("hlp_loading");
  if (loading == null) {
    loading = document.createElement("p");
    loading.innerHTML = "Loading...";
    loading.id = "hlp_loading";
    document.body.appendChild(loading);
  }

  loading.style.position = "absolute";
  loading.style.top = "10px";
  loading.style.left = "10px";

  // wait until preload has handled the async things
  hlp.preload().then(() => {
    document.body.removeChild(loading);
    hlp.setup();
    hlp._draw();
  });
});

hlp.stop = () => {
  hlp.looping = false;
};

hlp.start = () => {
  hlp.looping = true;
  requestAnimationFrame(hlp._draw);
};

hlp.keyIsDown = (key) => {
  return hlp.keyPressingDict[key];
};

hlp.keyCodeIsDown = (keyCode) => {
  return hlp.keyCodePressingDict[keyCode];
};

hlp.changeFPS = (fps) => {
  hlp.targetFPS = fps;
  hlp.fps = fps;
  hlp.fpsInterval = 1000 / fps;
  hlp._timeLastFrame = performance.now();
};

hlp.unlockMouse = () => {
  document.exitPointerLock();
};

// functions for user to overide
hlp.setup = () => {};
hlp.draw = () => {};
hlp.preload = async () => {};
hlp.mousePressed = () => {};
hlp.mouseMove = () => {};
hlp.keyPressed = () => {};
hlp.keyReleased = () => {};
hlp.lockedMouseMove = () => {};
hlp.unlockedMouseMove = () => {};
