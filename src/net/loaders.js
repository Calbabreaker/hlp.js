hlp.loadStrings = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

hlp.loadMesh = async (url) => {
  if (url.split(".").pop() != "obj") throw new Error("Can only support obj models");
  // load using fetch
  const data = await hlp.loadStrings(url);

  const mesh = new hlp.Mesh();
  const vertices = []; // temperary pool of vertices
  data.split("\n").forEach((line) => {
    line = line.split(/ +/g); // split by spaces (uses regex to counteract double spaces)
    if (line[0] == "v") {
      // create the vertex
      vertices.push(new hlp.Vector(parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])));
    } else if (line[0] == "f") {
      // connect the faces using triangles with the vertices
      const triPts = [line[1].split(/\/+/g)[0], line[2].split(/\/+/g)[0], line[3].split(/\/+/g)[0]];
      const tri = new hlp.Triangle();
      tri.points[0] = vertices[parseInt(triPts[0]) - 1];
      tri.points[1] = vertices[parseInt(triPts[1]) - 1];
      tri.points[2] = vertices[parseInt(triPts[2]) - 1];
      mesh.tris.push(tri);
    }
  });

  return mesh;
};
