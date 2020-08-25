class Dictionary {
  constructor() {
    this.data = {};
  }

  contains(key) {
    return this.data[key] != null;
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    return this;
  }

  add(key, val) {
    this.data[key] = val;
    return this;
  }

  remove(key) {
    delete this.data[key];
    return this;
  }

  forEach(func) {
    Object.keys(this.data).forEach(func);
  }
}

export default Dictionary;
