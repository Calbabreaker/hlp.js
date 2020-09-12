import * as arr from "../primitives/array";

// like a normal array but with more features
export class Set {
  constructor(count = 0) {
    Object.defineProperty(this, "_array", {
      enumerable: false,
      writable: true,
      // use prexisting array or new Array with count
      value: count instanceof Array ? count.slice() : new Array(count).fill(),
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
          // then if function
          if (typeof target._array[name] == "function") {
            // create a function that does the call
            return (...args) => {
              let result = target._array[name](...args);
              if (result instanceof Array) target._array = result;
            };
          } else {
            // else return property in the array object
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

  log() {
    console.log(this._array);
  }

  clone() {
    return this._array.slice();
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

// create funcs from arr thing
const funcs = Object.keys(arr);
funcs.forEach((func) => {
  Set.prototype[func] = function (...args) {
    return arr[func](...[this._array, ...args]);
  };
});
