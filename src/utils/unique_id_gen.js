hlp.UniqueIDGen = class {
  constructor(incrementerCount = 5) {
    this.increments = new Array(incrementerCount).fill(0);
    this.incrementPointer = 0;
  }

  gen() {
    let id = "";
    this.increments.forEach((num) => {
      id += `${num}`;
    });

    // increment to get new uuid
    this.increments[this.incrementPointer]++;
    this.incrementPointer++;
    if (this.incrementPointer > this.increments.length - 1) {
      this.incrementPointer = 0;
    }

    return id;
  }
};
