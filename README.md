# The hlp.js Library
Welcome to The hlp.js library where there is bunch of useful tools.
You will see different sections for the different parts to the library.

### Notes: 
* The source code is in the src/ directory
* The library code you probaly want to use is in the lib/ directory with hlp.js and hlp.min.js (minified version)

# Documentation
W.I.P.

## SRC files
These are the script tags for the lastest hlp.js
```html
<script src="/src/main.js"></script>
<script src="/src/dictionary.js"></script>
<script src="/src/audioSynth.js"></script>

<script src="/src/math/additions.js"></script>
<script src="/src/math/matrix.js"></script>
<script src="/src/math/vector.js"></script>
<script src="/src/math/meshes.js"></script>

<script src="/src/graphics/canvas.js"></script>
<script src="/src/graphics/renderer.js"></script>
```

To compile the source files yourselves into lib/hlp.js
```sh
sh scripts/compile.sh
```

To minify the compiled file
```sh
sh scripts/minify.sh
```

# LICENSE
GPL-3.0
