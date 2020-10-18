// contains calls for preload, setup and draw and more

// class to be extended from
export class Engine {
  constructor(targetFPS = 60) {
    this._keyPressingDict = {};
    this._keyCodePressingDict = {};

    // handle all the calls
    this.deltaTime = 0;
    this.mouseIsLocked = false;

    this.frameCount = 0;
    this.looping = true;
    this.changeFPS(targetFPS);

    // wait for everything to be loaded
    window.addEventListener("load", () => {
      document.addEventListener("mousemove", (event) => {
        if (!this.mouseIsLocked) this.unlockedMouseMove();
        else this.lockedMouseMove();
        this.mouseMove();
      });

      document.addEventListener("pointerlockchange", () => (this.mouseIsLocked = !this.mouseIsLocked), false);
      document.addEventListener("mozpointerlockchange", () => (this.mouseIsLocked = !this.mouseIsLocked), false);

      document.addEventListener("mousedown", (event) => {
        this.mousePressed();
      });

      document.addEventListener("mouseup", (event) => {
        this.mouseReleased();
      });

      // add to dictionary on keydown and removes and keyup
      document.addEventListener("keydown", (event) => {
        this._keyPressingDict[event.key] = true;
        this._keyCodePressingDict[event.code] = true;
        this.keyPressed();
      });

      document.addEventListener("keyup", (event) => {
        this._keyPressingDict[event.key] = false;
        this._keyCodePressingDict[event.code] = false;
        this.keyReleased();
      });

      // only create loading if user has a preload function
      if (this.preload != null) {
        let loading = document.getElementById("this_loading");
        // create loading text if haven't got loading element
        if (loading == null) {
          loading = document.createElement("p");
          loading.innerHTML = "Loading...";
          loading.id = "this_loading";
          document.body.appendChild(loading);
        }

        loading.style.position = "absolute";
        loading.style.top = "10px";
        loading.style.left = "10px";

        // wait until preload has handled the async things then start
        this.preload().then(() => {
          document.body.removeChild(loading);
          this._start();
        });
      } else {
        this._start();
      }
    });
  }

  // called only once
  _start() {
    if (this.setup != null) this.setup();
    this._timeStarted = performance.now();
    this._timeLastFrame = performance.now();
    this.resume();
  }

  _draw() {
    if (this.looping) requestAnimationFrame(() => this._draw()); // request another frame

    try {
      const now = performance.now();
      const deltaTimeMS = now - this._timeLastFrame; // get ellapsed time between draw call

      const elipson = 5;
      if (deltaTimeMS > this.fpsInterval - elipson) {
        // if time is next frame
        this.frameCount++;
        this.fps = 1000 / deltaTimeMS; // calculate real fps
        this.deltaTime = deltaTimeMS / 1000; // calculate deltaTime in secs
        this.draw(); // the user draw function
        this._timeLastFrame = now;
      }
    } catch (err) {
      this.looping = false;
      console.error(err); // stop animation if error
    }
  }

  // helping functions for user
  stop() {
    this.looping = false;
  }

  resume() {
    if (this.draw != null) {
      this.looping = true;
      this._draw();
    }
  }

  millis() {
    performance.now() - this._timeStarted;
  }

  keyIsDown(key) {
    this._keyPressingDict[key];
  }

  keyCodeIsDown(keyCode) {
    this._keyCodePressingDict[keyCode];
  }

  changeFPS(fps) {
    this.targetFPS = fps;
    this.fps = fps;
    this.fpsInterval = 1000 / fps;
    this._timeLastFrame = performance.now();
  }

  unlockPointer() {
    if (document.exitPointerLock) document.exitPointerLock();
    else document.mozExitPointerLock();
  }

  // functions to overide on user side
  mousePressed() {}
  mouseReleased() {}
  mouseMove() {}
  keyPressed() {}
  keyReleased() {}
  lockedMouseMove() {}
  unlockedMouseMove() {}
  // these functions wont be called if user didn't overide
  // async preload() {}
  // draw() {}
  // setup() {}
}
