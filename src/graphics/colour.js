hlp.Colour = class {
  constructor(c1, c2, c3, a = 255, colourMode = hlp.RGB) {
    this.colourMode = colourMode;

    this.a = 255;
    this.set(c1, c2, c3);
  }

  set(c1, c2 = this.c1, c3 = this.c1, a) {
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;

    if (this.colourMode.substr(-1) === "a") this.a = a || 255;
  }

  // creates string friendly for ctx
  toString() {
    return hlp.Colour.toString(this.c1, this.c2, this.c3, this.a, this.colourMode);
  }

  static toString(c1, c2 = c1, c3 = c1, a = 255, colourMode = hlp.RBG) {
    if (colourMode === hlp.RBG) {
      return `rgb(${c1}, ${c2}, ${c3}, ${a})`;
    }
  }
};
