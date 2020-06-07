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

hlp.loadBytes = (url) => {
  return new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = this.result;
      const array = new Uint8Array(arrayBuffer);
      resolve(array);
    };

    const fileData = await hlp.loadStrings(url);
    reader.readAsArrayBuffer(new File([fileData], url));
  });
};

hlp.loadSound = (url) => {
  return new Audio(url);
};

hlp.loadFont = async (url) => {
  const fontName = url.split("/").pop().split(".")[0];
  const font = new FontFace(fontName, `url(${url})`);
  const fontFace = await font.load();
  document.fonts.add(fontFace);
  return fontName;
};
