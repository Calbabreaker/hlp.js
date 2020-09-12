import * as math from "../math/calculations";

export const choose = (array) => {
  const index = math.randInt(array.length - 1);
  return array[index];
};

// uses Fisher-Yates Shuffle Algorithm
export const shuffle = (array) => {
  let random,
    temp,
    index = array.length;
  while (index > 1) {
    random = (Math.random() * index) | 0;
    temp = array[--index];
    array[index] = array[random];
    array[random] = temp;
  }

  return this;
};

export const sum = (array) => {
  let sum = 0;
  array.forEach((item) => (sum += item));
  return sum;
};

export const product = (array) => {
  let sum = 0;
  array.forEach((item) => (product *= item));
  return sum;
};

export const mean = (array) => {
  const arrSum = sum(array);
  const mean = arrSum / array.length;
  return mean;
};

export const randomise = (array, min, max) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = math.random(min, max);
  }
};

export const min = (array) => {
  return Math.min(...array);
};

export const max = (array) => {
  return Math.max(...array);
};
