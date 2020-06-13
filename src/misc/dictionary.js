hlp.Dictionary = class Dictionary {
  constructor() {
    this.data = {};
  }

  contains(key) {
    return this.data[key.toString()] != null;
  }

  get(key) {
    return this.data[key.toString()];
  }

  set(key, val) {
    this.data[key.toString()] = val;
    return this;
  }

  add(key, val) {
    this.data[key.toString()] = val;
    return this;
  }

  remove(key) {
    this.data[key.toString()] = null;
    return this;
  }

  forEach(func) {
    Object.keys(this.data).forEach(func);
  }
};
