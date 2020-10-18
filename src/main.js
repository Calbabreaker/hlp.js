// init of hlp
if (window.hlp != null) {
  alert("Cannot import hlp, instance of the hlp libary is already in use!");
  console.error("Cannot import hlp, instance of the hlp libary is already in use!");
} else {
  const hlp = {};
  window.hlp = hlp;

  if (window.Proxy == null) alert("Your browser does not support Proxy which is required in some modules in hlp.js!");

  // import all the modules
  Object.assign(hlp, require("./game/engine"));
  Object.assign(hlp, require("./game/ecs_world"));
  Object.assign(hlp, require("./game/ecs_primitives"));

  Object.assign(hlp, require("./graphics/canvas_graphics"));
  Object.assign(hlp, require("./graphics/colour"));

  Object.assign(hlp, require("./math/calculations"));
  Object.assign(hlp, require("./math/matrix"));
  Object.assign(hlp, require("./math/vector"));

  Object.assign(hlp, require("./misc/audio_synth.js"));
  Object.assign(hlp, require("./misc/constants"));
  Object.assign(hlp, require("./misc/misc"));

  Object.assign(hlp, require("./net/loaders"));
  Object.assign(hlp, require("./net/http"));

  hlp.string = {};
  Object.assign(hlp.string, require("./primitives/strings"));
  hlp.array = {};
  Object.assign(hlp.array, require("./primitives/array"));

  Object.assign(hlp, require("./utils/set"));
  Object.assign(hlp, require("./utils/map"));
  Object.assign(hlp, require("./utils/dom"));
  Object.assign(hlp, require("./utils/unique_id_gen"));

  console.log("--- hlp.js ---");
}
