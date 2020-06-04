// contains calls for preload, setup and draw and more

// wait for everything to be loaded
window.addEventListener("load", () => {
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

  hlp.keyPressingDict = {};
  hlp.keyCodePressingDict = {};

  // handle all the calls
  hlp._then = Date.now();
  hlp._deltaTimeMS = 0;
  hlp.deltaTime = 0;
  hlp.mouseIsLocked = false;

  hlp.frameCount = 0;
  hlp.targetFPS = 60;
  hlp.hasStopped = false;
  hlp.fpsInterval = 1000 / hlp.targetFPS;
  hlp.fps = hlp.targetFPS;

  hlp.unlockMouse = () => {
    document.exitPointerLock();
  };

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
  });

  document.addEventListener("keyup", (event) => {
    hlp.keyPressingDict[event.key] = false;
    hlp.keyCodePressingDict[event.code] = false;
  });

  const animationDrawFunc = () => {
    try {
      hlp._now = Date.now();
      hlp._deltaTimeMS = hlp._now - hlp._then; // get ellapsed time between draw call
      hlp.deltaTime = hlp._deltaTimeMS / 1000;

      if (hlp._deltaTimeMS > hlp.fpsInterval && !hlp.hasStopped) {
        // if time is next frame
        hlp.fps = 1000 / hlp._deltaTimeMS;
        hlp.draw(); // the user draw it
        hlp._then = hlp._now - (hlp._deltaTimeMS % hlp.fpsInterval); // get ready for next ani frame
      }
    } catch (err) {
      return console.error(err); // stop animation if error
    }

    requestAnimationFrame(animationDrawFunc);
  };

  // wait until preload has handled the async things
  hlp.preload().then(() => {
    hlp.setup();
    animationDrawFunc();
  });

  hlp.stop = () => {
    hlp.hasStopped = true;
  };

  hlp.start = () => {
    hlp.hasStopped = false;
    hlp._then = Date.now();
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
    hlp._then = Date.now();
  };
});

// functions for user to overide
hlp.setup = () => {};
hlp.draw = () => {};
hlp.preload = async () => {};
hlp.mousePressed = () => {};
hlp.mouseMove = () => {};
hlp.lockedMouseMove = () => {};
hlp.unlockedMouseMove = () => {};
