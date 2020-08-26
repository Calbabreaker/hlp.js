// init of hlp
if (window.hlp != null) {
  alert("Cannot import hlp, instance of the hlp libary is already in use!");
  console.error("Cannot import hlp, instance of the hlp libary is already in use!");
} else {
  const hlp = {};
  window.hlp = hlp;

  // import all the modules
  Object.assign(hlp, require("./game/engine"));
  Object.assign(hlp, require("./game/ecs_world"));
  Object.assign(hlp, require("./game/ecs_primitives"));

  Object.assign(hlp, require("./graphics/canvas"));
  Object.assign(hlp, require("./graphics/colour"));

  Object.assign(hlp, require("./math/calculations"));
  Object.assign(hlp, require("./math/matrix"));
  Object.assign(hlp, require("./math/vector"));

  Object.assign(hlp, require("./misc/audio_synth.js"));
  Object.assign(hlp, require("./misc/constants"));
  Object.assign(hlp, require("./misc/misc"));

  Object.assign(hlp, require("./net/loaders"));
  Object.assign(hlp, require("./net/http"));

  Object.assign(hlp, require("./utils/array"));
  Object.assign(hlp, require("./utils/dictionary"));
  Object.assign(hlp, require("./utils/strings"));
  Object.assign(hlp, require("./utils/unique_id_gen"));

  console.log("--- hlp.js ---");
}
