export class Dictionary {
  constructor(data = {}) {
    this.data = data;

    return new Proxy(this, {
      get(target, name, receiver) {
        if (Reflect.has(target, name)) return Reflect.get(target, name, receiver);
        return target.data[name];
      },
      set(target, name, value, receiver) {
        if (Reflect.has(target, name)) return Reflect.set(target, name, value, receiver);
        target.data[name] = value;
      },
      deleteProperty(target, name, receiver) {
        if (Reflect.has(target, name)) return Reflect.set(target, name, receiver);
        delete target.data[name];
      },
    });
  }

  contains(key) {
    return this.data[key] != null;
  }

  clone() {
    return new Dictionary(this.data);
  }

  serialise() {
    return JSON.stringify(this.data);
  }

  deserialise(str) {
    return new Dictionary(JSON.parse(str));
  }
}
