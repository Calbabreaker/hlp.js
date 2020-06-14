if (window.hlp != null) {
  alert("An instance of the hlp libary is already in use!");
  console.error("An instance of the hlp libary is already in use! Things will not work as expected.");
} else {
  const hlp = {};
  window.hlp = hlp;

  // some constants
  hlp.FULL = 0x00;
  hlp.hlp2D = 0x01;
  hlp.hlpWEBGL = 0x02;

  hlp.json = 0x10;
  hlp.text = 0x11;
  hlp.blob = 0x12;

  hlp.CENTER = "center";
  hlp.LEFT = "left";
  hlp.RIGHT = "right";
  hlp.START = "end";
  hlp.END = "end";

  console.log("--- hlp.js ---");
}
