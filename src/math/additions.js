// the default math object with some extra functions
hlp.math = {};

// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach(funcName => {
  hlp.math[funcName] = window.Math[funcName]; 
});

hlp.math.map = (value, low1, high1, low2, high2) => {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

hlp.math.toRadians = (degrees) => {
  return 1 / hlp.math.tan(degrees * 0.5 / 180 * hlp.math.PI);
}

hlp.math.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.math.constrain = (n, low, high) => {
  return hlp.math.max(hlp.math.min(n, high), low);
}