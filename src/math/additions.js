// the default math object with some extra functions
// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach((funcName) => {
  hlp[funcName] = window.Math[funcName];
});

hlp.TWO_PI = hlp.PI * 2;
hlp.FOUR_PI = hlp.PI * 4;
hlp.HALF_PI = hlp.PI / 2;
hlp.QUARTER_PI = hlp.PI / 4;

hlp._y2Guass = 0;

hlp.map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

hlp.toRadians = (degrees) => {
  return (degrees * hlp.PI) / 180;
};

hlp.toDegrees = (radians) => {
  return radians * (180 / hlp.PI);
};

hlp.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.constrain = (n, low, high) => {
  return hlp.max(hlp.min(n, high), low);
};

hlp.random = (min, max) => {
  return Math.random() * (min - max) + max;
};

hlp.dist = (...args) => {
  if (args.length == 4) {
    // 2d
    return hlp.hypot(args[2] - args[0], args[3] - args[1]);
  } else if (args.length == 6) {
    // 3d
    return hlp.hypot(args[3] - args[0], args[4] - args[1], args[5] - args[2]);
  }
};

hlp.randomGaussian = (mean = 0, sd = 1) => {
  let y1, x1, x2, w;
  if (this._gaussianPrev) {
    y1 = hlp._y2Guass;
    hlp._gaussianPrev = false;
  } else {
    do {
      x1 = hlp.random(0, 2) - 1;
      x2 = hlp.random(0, 2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = hlp.sqrt((-2 * hlp.log(w)) / w);
    y1 = x1 * w;
    hlp._y2Guass = x2 * w;
    hlp._gaussianPrev = true;
  }

  return y1 * sd + mean;
};
