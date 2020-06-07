hlp.loadStrings = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

hlp.loadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
};
