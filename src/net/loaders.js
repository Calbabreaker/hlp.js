// loading functions that uses promises

hlp.loadString = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

hlp.loadJSON = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

hlp.loadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
};

hlp.loadBytes = async (url) => {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  return new Int8Array(data);
};

hlp.loadSound = (url) => {
  return new Promise((resolve) => {
    resolve(new Audio(url)); // idk if this works
  });
};

hlp.loadFont = async (url) => {
  const fontName = url.split("/").pop().split(".")[0];
  const font = new FontFace(fontName, `url(${url})`);
  const fontFace = await font.load();
  document.fonts.add(fontFace);
  return fontName;
};
