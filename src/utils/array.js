// uses Fisher-Yates Shuffle Algorithm
hlp.shuffle = (array, bool) => {
  array = bool ? array : array.slice(); // create copy or not

  let random,
    temp,
    index = array.length;
  while (index > 1) {
    random = (Math.random() * index) | 0;

    temp = array[--index];
    array[index] = array[random];
    array[random] = temp;
  }

  return array;
};

hlp.arrayRandom = (array) => {
  const index = hlp.randInt(array.length);
  return array[index];
};
