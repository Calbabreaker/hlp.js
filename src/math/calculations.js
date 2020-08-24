// some default math funcs (there will be some jsdoc soon)
export const abs = Math.abs;
export const ceil = Math.ceil;
export const exp = Math.exp;
export const log = Math.log;
export const max = Math.max;
export const min = Math.min;

export const map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

export const lerp = (start, stop, amt) => {
  return amt * (stop - start) + start;
};

export const constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
};

export const random = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }

  return Math.random() * (min - max) + max;
};

export const randInt = (min, max) => {
  if (max == null) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random(min, max + 1));
};

export const dist = (...args) => {
  if (args.length == 4) {
    // 2d
    return Math.hypot(args[2] - args[0], args[3] - args[1]);
  } else if (args.length == 6) {
    // 3d
    return Math.hypot(args[3] - args[0], args[4] - args[1], args[5] - args[2]);
  }
};

let y2Guass = 0;
let gaussianPrev = false;

// randomGaussian with mean and standard distribution
export const randomGaussian = (mean = 0, sd = 1) => {
  let y1, x1, x2, w;
  if (gaussianPrev) {
    y1 = y2Guass;
    gaussianPrev = false;
  } else {
    do {
      x1 = Math.random(0, 2) - 1;
      x2 = Math.random(0, 2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt((-2 * Math.log(w)) / w);
    y1 = x1 * w;
    y2Guass = x2 * w;
    gaussianPrev = true;
  }

  return y1 * sd + mean;
};
