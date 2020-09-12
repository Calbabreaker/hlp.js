import * as math from "../math/calculations";

export const arrayChoose = (array) => {
  const index = math.randInt(array.length - 1);
  return array[index];
};

// uses Fisher-Yates Shuffle Algorithm
export const arrayShuffle = (array, modifyOriginal = true) => {
  array = modifyOriginal ? array : array.slice();

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

// like a normal array but with more features
export class Set {
  constructor(count = 0) {
    Object.defineProperty(this, "_array", {
      enumerable: false,
      writable: true,
      // use prexisting array or new Array with count
      value: typeof count == "Array" ? count.slice() : new Array(count).fill(),
    });

    return new Proxy(this, {
      get(target, name, receiver) {
        const index = Number(name);
        // first check the index
        if (!isNaN(index)) {
          return target._array[index];
        } else {
          // if not then check if name is in Set
          if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);
          // then if funcition
          if (typeof target._array[name] == "function") {
            // create a function that does the call
            return (...args) => {
              let result = target._array[name](...args);
              if (result instanceof Array) target._array = result;
            };
          } else {
            // else return the array[name] property
            return target._array[name];
          }
        }
      },
      set(target, name, value, receiver) {
        const index = Number(name);
        if (!isNaN(index)) {
          target._array[name] = value;
        } else {
          return Reflect.set(target, name, value, receiver);
        }
      },
    });
  }

  choose() {
    return arrayChoose(this._array);
  }

  shuffle() {
    arrayShuffle(this._array, true);
  }

  toArray() {
    return this._array;
  }

  serialise() {
    return JSON.stringify(this._array);
  }

  deserialise(str) {
    return new Set(JSON.parse(str));
  }
}
