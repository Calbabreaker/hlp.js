hlp.RendererGL = class {
  constructor(canvas) {
    this.canvas = canvas;

    this._doFill = true;
    this._doStroke = true;
    this._prevStates = [];

    this.gl = canvas.getContext("webgl");
    if (!this.gl) {
      console.warn("WebGL context not supported, falling back on experimental.");
      this.gl = canvas.getContext("experimental-webgl");
    }

    if (!this.gl) return alert("Browser does not support WebGL!");
  }
};
