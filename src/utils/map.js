export class Map {
  constructor(data = {}) {
    Object.defineProperty(this, "_data", {
      enumerable: false,
      writable: true,
      value: Object.assign({}, data),
    });

    return new Proxy(this, {
      get(target, name, receiver) {
        if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);
        return target._data[name];
      },
      set(target, name, value, receiver) {
        if (Reflect.has(target, name)) return Reflect.set(target, name, value, receiver);
        target._data[name] = value;
      },
      deleteProperty(target, name) {
        delete target._data[name];
      },
    });
  }

  contains(key) {
    return this._data[key] != null;
  }

  clone() {
    return new Map(this._data);
  }

  forEach(func) {
    for (let item in this._data) {
      func(item);
    }
  }

  serialise() {
    return JSON.stringify(this._data);
  }

  deserialise(str) {
    return new Map(JSON.parse(str));
  }
}
