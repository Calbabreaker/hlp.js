// the default math object with some extra functions
hlp.math = {};

hlp.math.TWO_PI = hlp.math.PI * 2;
hlp.math.FOUR_PI = hlp.math.PI * 4;
hlp.math.HALF_PI = hlp.math.PI / 2;
hlp.math.QUARTER_PI = hlp.math.PI / 4;

// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach((funcName) => {
  hlp.math[funcName] = window.Math[funcName];
});

hlp.math.map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

hlp.math.toRadians = (degrees) => {
  return (degrees * hlp.math.PI) / 180;
};

hlp.math.toDegrees = (radians) => {
  return radians * (180 / hlp.math.PI);
};

hlp.math.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.math.constrain = (n, low, high) => {
  return hlp.math.max(hlp.math.min(n, high), low);
};

hlp.math.random = (min, max) => {
  return Math.random() * (min - max) + max;
};
