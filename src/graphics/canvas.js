// the canvas object for canvas drawing

hlp.Canvas = class {
  constructor(width, height, renderer = hlp.hlp2D) {
    // initialize variables
    if (width === hlp.FULL) {
      if (height != null) this.aspectRatio = height;
      this.isFull = true;
      this._resizeFull();
    } else {
      this.width = width || 400;
      this.height = height || 400;
      this.aspectRatio = this.height / this.width;
    }

    // initialize the canvas (creates new one)
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("hlpDefaultCanvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;

    if (renderer == hlp.hlp2D) {
      this._renderer = new hlp.Renderer2D(this.canvas);
    } else if (renderer == hlp.hlpWEBGL) {
      this._renderer = new hlp.RendererGL(this.canvas);
    } else return console.error("Unknown renderer!");

    document.body.appendChild(this.canvas); // adds to the body

    if (this.isFull) {
      window.addEventListener("resize", (event) => {
        this._resizeFull();
      });
    }

    this.mouse = new hlp.Vector(0, 0);
    this.mouseMovement = new hlp.Vector(0, 0);

    document.body.addEventListener("mousemove", (event) => {
      const clientRect = this.canvas.getBoundingClientRect();
      this.mouse.set(event.clientX - clientRect.left, event.clientY - clientRect.top);
      this.mouseMovement.set(event.movementX, event.movementY);
    });

    // get all functions of renderer
    Object.getOwnPropertyNames(Object.getPrototypeOf(this._renderer))
      .filter((p) => p[0] != "_" && typeof this._renderer[p] == "function")
      .forEach((func) => {
        this[func] = (...args) => this._renderer[func](...args);
      });
  }

  lockMouse() {
    this.canvas.requestPointerLock();
  }

  resizeCanvas(w, h) {
    if (this.isFull) this.aspectRatio = this.height / this.width;
    this._renderer._rendererResize(w, h);

    this.width = w;
    this.height = h;
    if (this.cavnas != null) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  _resizeFull() {
    let newInnerHeight = innerHeight;
    if (this.aspectRatio != null) {
      const aspectHeight = innerWidth / this.aspectRatio;
      if (aspectHeight < innerHeight) newInnerHeight = aspectHeight;
    }

    this.resizeCanvas(this.aspectRatio != null ? newInnerHeight * this.aspectRatio : innerWidth, newInnerHeight);
  }
};
