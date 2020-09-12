import * as constants from "../misc/constants";

// some default math funcs (there will be some jsdoc soon)
export const abs = Math.abs;
export const exp = Math.exp;
export const log = Math.log;
export const max = Math.max;
export const min = Math.min;
export const sqrt = Math.sqrt;

export const hypot = Math.hypot;
export const asin = Math.asin;
export const sin = Math.sin;
export const acos = Math.acos;
export const cos = Math.cos;
export const atan = Math.atan;
export const atan2 = Math.atan2;
export const atanh = Math.atanh;
export const tan = Math.tan;

export const round = (num, decimalPlaces = 0) => {
  const numToRound = num * 10 ** decimalPlaces;
  return Math.round(numToRound) / 10 ** decimalPlaces;
};

export const floor = (num, decimalPlaces = 0) => {
  const numToRound = num * 10 ** decimalPlaces;
  return Math.floor(numToRound) / 10 ** decimalPlaces;
};

export const ceiling = (num, decimalPlaces = 0) => {
  const numToRound = num * 10 ** decimalPlaces;
  return Math.ceil(numToRound) / 10 ** decimalPlaces;
};

// ml activation functions
export const sigmoid = (n) => {
  return 1 / (1 + Math.exp(-n));
};

export const dsigmoid = (n) => {
  return sigmoid(n) * (1 - sigmoid(n));
};

export const relu = (n) => {
  return n < 0 ? 0.1 * n : n;
};

export const drelu = (n) => {
  return n < 0 ? 0.5 : 1;
};

export const radians = (deg) => deg * constants.DEG_TO_RAD;
export const degrees = (rad) => rad * constants.RAD_TO_DEG;

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

  return Math.floor(random(min, max + 1));
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
