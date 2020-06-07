// the default math object with some extra functions
// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach((funcName) => {
  hlp[funcName] = window.Math[funcName];
});

hlp.TWO_PI = hlp.PI * 2;
hlp.FOUR_PI = hlp.PI * 4;
hlp.HALF_PI = hlp.PI / 2;
hlp.QUARTER_PI = hlp.PI / 4;

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
