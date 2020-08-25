// init of hlp
if (window.hlp != null) {
  alert("Cannot import hlp, instance of the hlp libary is already in use!");
  console.error("Cannot import hlp, instance of the hlp libary is already in use!");
} else {
  const hlp = {};
  window.hlp = hlp;

  // import all the modules
  hlp.Canvas = require("./graphics/canvas").default;

  Object.assign(hlp, require("./misc/constants"));
  Object.assign(hlp, require("./math/calculations"));

  console.log("--- hlp.js ---");
}
