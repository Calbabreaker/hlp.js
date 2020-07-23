// anything that are to small and so don't belong to any file
hlp.rainbow = () => {
  [...document.querySelectorAll("*")].forEach((element) => {
    element.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.borderColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  });
};

hlp.rainbowSeizure = () => {
  setInterval(hlp.rainbow, 1);
};

hlp.sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
