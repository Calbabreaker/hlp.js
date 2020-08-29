import * as constants from "../misc/constants";

export class Colour {
  constructor(c1, c2, c3, a = 255, colourMode = constants.RGB) {
    this.colourMode = colourMode;

    this.a = 255;
    this.set(c1, c2, c3);
  }

  set(c1, c2 = this.c1, c3 = this.c1, a) {
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;

    // if string ends with A (alpha)
    if (this.colourMode.substr(-1) === "a") this.a = a || 255;
  }

  toString() {
    return Colour.toString(this.c1, this.c2, this.c3, this.a, this.colourMode);
  }

  // creates a string friendly with css styles
  static toString(c1, c2 = c1, c3 = c1, a = 255, colourMode = constants.RGB) {
    if (colourMode === constants.RGB || colourMode == constants.RGBA) {
      return `rgb(${c1}, ${c2}, ${c3}, ${a})`;
    }
  }
}
