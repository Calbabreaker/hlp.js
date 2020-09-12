function doTest(testName, testFunc, testNum = 10) {
  let total = 0;
  for (let i = 0; i < testNum; i++) {
    const startTime = performance.now();
    for (let j = 0; j < 10000; j++) {
      testFunc();
    }

    total += performance.now() - startTime;
  }

  console.log(`${testName} took ${total / testNum}ms avarage.`);
}

doTest("buffer", Math.random);

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let set = new hlp.Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// hlp test
doTest("hlp.Set random", () => {
  set.map(() => hlp.random(1, 2));
});

// js test
doTest("array random", () => {
  array = array.map(() => hlp.random(1, 2));
});

// hlp test
doTest("hlp.Set random", () => {
  set.map(() => hlp.random(1, 2));
});

// js test
doTest("array random", () => {
  array = array.map(() => hlp.random(1, 2));
});

// hlp test
doTest("hlp.Set random", () => {
  set.map(() => hlp.random(1, 2));
});

// js test
doTest("array random", () => {
  array = array.map(() => hlp.random(1, 2));
});
