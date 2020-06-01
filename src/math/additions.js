// the default math object with some extra functions
hlp.Math = {};

// dynamically create the default
Object.getOwnPropertyNames(window.Math).forEach(funcName => {
  hlp.Math[funcName] = window.Math[funcName]; 
});

hlp.Math.map = (value, low1, high1, low2, high2) => {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

hlp.Math.toRadians = (degrees) => {
  return 1 / Math.tan(degrees * 0.5 / 180 * Math.PI);
}

hlp.Math.lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

hlp.Math.constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
}