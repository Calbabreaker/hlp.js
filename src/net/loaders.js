// loading functions that uses promises

export const loadString = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

export const loadJSON = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
};

export const loadBytes = async (url) => {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  return new Int8Array(data);
};

export const loadSound = (url) => {
  return new Promise((resolve) => {
    resolve(new Audio(url)); // idk if this works
  });
};

export const loadFont = async (url) => {
  const fontName = url.split("/").pop().split(".")[0];
  const font = new FontFace(fontName, `url(${url})`);
  const fontFace = await font.load();
  document.fonts.add(fontFace);
  return fontName;
};
