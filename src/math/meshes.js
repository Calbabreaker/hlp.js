// a triangle
hlp.Triangle = class Triangle {
  constructor() {
    this.points = new Array(3); // points not created inline because it is neater that way
    this.illumination = 0;
  }

  static clipAgainstPlane(planePoint, planeNormal, inTri) {
    hlp.Vector.normalise(planeNormal);
    
    const insidePoints = [];
    const outsidePoints = [];

    // return signed shortest distance
    const dist = point => {
      return planeNormal.x * point.x + planeNormal.y * point.y + planeNormal.z * point.z - planeNormal.dotProduct(planePoint);
    }

    // get signed distacnce of each point in triangle to plane
    const d0 = dist(inTri.points[0]);
    const d1 = dist(inTri.points[1]);
    const d2 = dist(inTri.points[2]);

    if (d0 >= 0) insidePoints.push(inTri.points[0]);
    else outsidePoints.push(inTri.points[0]);
    if (d1 >= 0) insidePoints.push(inTri.points[1]);
    else outsidePoints.push(inTri.points[1]);
    if (d2 >= 0) insidePoints.push(inTri.points[2]);
    else outsidePoints.push(inTri.points[2]);

    // classify the triangle points (break them into smaller parts)
    if (insidePoints.length == 0) {
      // if all points is outside of plane
      return [];
    } else if (insidePoints.length == 3) {
      // if all points are inside of plane
      return [inTri];
    } else if (insidePoints.length == 1 && outsidePoints.length == 2) {
      // triangle should be clipped
      const outputTri = new hlp.Triangle();
      outputTri.illumination = inTri.illumination;
      outputTri.points[0] = insidePoints[0].copy();
      outputTri.points[1] = Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);
      outputTri.points[2] = Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[1]);
      return [outputTri];
    } else if (insidePoints.length == 2 && outsidePoints.length == 1) {
      // triangle should be clipped but now a quad
      const outputTri1 = new hlp.Triangle();
      const outputTri2 = new hlp.Triangle();
      outputTri1.illumination = inTri.illumination;
      outputTri2.illumination = inTri.illumination;
      
      outputTri1.points[0] = insidePoints[0].copy();
      outputTri1.points[1] = insidePoints[1].copy();
      outputTri1.points[2] = hlp.Vector.intersectPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);

      outputTri2.points[0] = insidePoints[1].copy();
      outputTri2.points[1] = outputTri1.points[2].copy();
      outputTri2.points[2] = hlp.Vector.intersectPlane(planePoint, planeNormal, insidePoints[1], outsidePoints[0]);
      return [outputTri1, outputTri2];
    }
  }
}

hlp.Mesh = class Mesh {
  constructor(tris = []) {
    this.tris = tris;
  }

  static async loadFromFile(url) {
    if (url.split('.').pop() != "obj") throw new Error("Can only support obj models");
    // load using fetch
    const response = await fetch(url);
    const data = await response.text();

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
  }
}