// anything that are to small and so don't belong to any file

export const rainbow = () => {
  [...document.querySelectorAll("*")].forEach((element) => {
    element.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.borderColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  });
};

export const rainbowSeizure = () => {
  setInterval(modules.exports.rainbow, 1);
};

export const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
