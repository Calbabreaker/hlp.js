// uses Fisher-Yates Shuffle Algorithm
export const shuffle = (array, createCopy) => {
  array = createCopy ? array : array.slice(); // create copy or not

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

export const getRandom = (array) => {
  const index = hlp.randInt(array.length);
  return array[index];
};
