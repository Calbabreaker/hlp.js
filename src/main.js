// init of hlp
if (window.hlp != null) {
  alert("Cannot import hlp, instance of the hlp libary is already in use!");
  console.error("Cannot import hlp, instance of the hlp libary is already in use!");
} else {
  const hlp = {};
  window.hlp = hlp;

  // import all the modules
  hlp.Engine = require("./game/engine").default;
  hlp.ECSWorld = require("./game/ecs_world").default;
  Object.assign(hlp, require("./game/ecs_primitives"));

  hlp.Canvas = require("./graphics/canvas").default;
  hlp.Colour = require("./graphics/colour").default;

  Object.assign(hlp, require("./math/calculations"));
  hlp.Matrix = require("./math/matrix").default;
  hlp.Vector = require("./math/vector").default;

  hlp.AudioSynth = require("./misc/audio_synth.js").default;
  Object.assign(hlp, require("./misc/constants"));
  Object.assign(hlp, require("./misc/misc"));

  Object.assign(hlp, require("./net/loaders"));
  Object.assign(hlp, require("./net/http"));

  Object.assign(hlp, require("./utils/array"));
  hlp.Dictionary = require("./utils/dictionary");
  Object.assign(hlp, require("./utils/strings"));
  hlp.UniqueIDGen = require("./utils/unique_id_gen");

  console.log("--- hlp.js ---");
}
