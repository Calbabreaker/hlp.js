if (window.hlp != null) {
  alert("An instance of the hlp libary is already in use!");
  console.error("An instance of the hlp libary is already in use! Things will not work as expected.");
} else {
  const hlp = {};
  window.hlp = hlp;

  // some constants
  hlp.FULL = "FULL";
  hlp.hlp2D = "hlp2D";
  hlp.hlpWEBGL = "hlpWEGL";

  hlp.json = "json";
  hlp.text = "text";
  hlp.blob = "blob";

  hlp.RGB = "RGB";
  hlp.RGBA = "RGBA";
  hlp.HSL = "HSL";
  hlp.HSLA = "HSLA";

  hlp.CENTER = "center";
  hlp.LEFT = "left";
  hlp.RIGHT = "right";
  hlp.START = "start";
  hlp.END = "end";

  console.log("--- hlp.js ---");
}
