// uses Fisher-Yates Shuffle Algorithm
hlp.shuffle = (arr, bool) => {
  arr = bool ? arr : arr.slice();

  let rnd,
    tmp,
    idx = arr.length;
  while (idx > 1) {
    rnd = (Math.random() * idx) | 0;

    tmp = arr[--idx];
    arr[idx] = arr[rnd];
    arr[rnd] = tmp;
  }

  return arr;
};
