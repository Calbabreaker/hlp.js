hlp.Renderer3D = class Renderer3D {
  constructor(canvas) {
    this.c = canvas;

    this.rotation = 0;
    this.cameraPos = new hlp.Vector();
    this.lookDir = new hlp.Vector();
    this.yawY = 0;
    this.yawX = 0;

    // create light direction
    this.lightDirection = new hlp.Vector(0, 0, 1).normalise();

    // the projection matrix math
    this.near = 0.1;
    this.far = 1000;
    this.fov = 90;
    this.aspectRatio = this.c.height / this.c.width;
    this.projectionMatrix = hlp.Matrix.createProjectionPerspect(this.fov, this.aspectRatio, this.near, this.far);
  }

  draw(mesh) {
    this.c.noStroke();
    // this.c.stroke(255, 0, 0); // debug wireframe
    // this.rotation += 0.01;
    this.c.translate(this.c.width / 2, this.c.height / 2);
    this.c.scale(1, -1); // this flips the screen so y is correct
    this.rotation += 0.1;

    // let worldMatrix = Matrix.dotMult(Matrix.createRotationZ(this.rotation), Matrix.createRotationX(this.rotation)); // rotate
    // let worldMatrix = Matrix.dotMult(worldMatrix, Matrix.createTranslation(0, 0, 5)); // translate
    let worldMatrix = hlp.Matrix.createTranslation(0, 0, 5);

    const up = new hlp.Vector(0, 1, 0);
    let target = new hlp.Vector(0, 0, 1);
    const cameraRotation = hlp.Matrix.dotMult(hlp.Matrix.createRotationX(this.yawY), hlp.Matrix.createRotationY(this.yawX));
    this.lookDir = hlp.Matrix.multVector(target, cameraRotation);
    target = hlp.Vector.add(this.cameraPos, this.lookDir);
    const cameraMatrix = hlp.Matrix.createPointAt(this.cameraPos, target, up);
    const viewMatrix = hlp.Matrix.quickInverse(cameraMatrix);

    let trianglesToDraw = [];

    mesh.tris.forEach((tri, i) => {
      const newTri = new hlp.Triangle();

      // offset the pt and rotate it
      newTri.points[0] = hlp.Matrix.multVector(tri.points[0], worldMatrix);
      newTri.points[1] = hlp.Matrix.multVector(tri.points[1], worldMatrix);
      newTri.points[2] = hlp.Matrix.multVector(tri.points[2], worldMatrix);

      // calculate normals
      const line1 = hlp.Vector.sub(newTri.points[1], newTri.points[0]);
      const line2 = hlp.Vector.sub(newTri.points[2], newTri.points[0]);
      const normal = hlp.Vector.crossProduct(line1, line2).normalise(); // gets normal of triangle surface

      // get ray from camera
      const cameraRay = hlp.Vector.sub(newTri.points[0], this.cameraPos);

      // if ray is alligned with normal then the camera can see it
      if (normal.dotProduct(cameraRay) < 0) {

        // illumantion
        const dotProduct = normal.dotProduct(this.lightDirection);

        // convert from world to view scaleView
        newTri.points[0] = hlp.Matrix.multVector(newTri.points[0], viewMatrix);
        newTri.points[1] = hlp.Matrix.multVector(newTri.points[1], viewMatrix);
        newTri.points[2] = hlp.Matrix.multVector(newTri.points[2], viewMatrix);

        const clippedTris = hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, 0, 0.1), new hlp.Vector(0, 0, 1), newTri);

        clippedTris.forEach(clippedTri => {
          const triProjected = new hlp.Triangle();
          // project into 2d view (camera) from 3d
          triProjected.points[0] = hlp.Matrix.multVector(clippedTri.points[0], this.projectionMatrix);
          triProjected.points[1] = hlp.Matrix.multVector(clippedTri.points[1], this.projectionMatrix);
          triProjected.points[2] = hlp.Matrix.multVector(clippedTri.points[2], this.projectionMatrix);
          triProjected.illumination = dotProduct;

          // offset into view space
          const offsetView = new hlp.Vector(1, 1, 0);
          triProjected.points[0].add(offsetView);
          triProjected.points[1].add(offsetView);
          triProjected.points[2].add(offsetView);

          const scaleView = new hlp.Vector(0.5 * this.c.width, 0.5 * this.c.height, 1);
          triProjected.points[0].mult(scaleView);
          triProjected.points[1].mult(scaleView);
          triProjected.points[2].mult(scaleView);

          // store the triangle to sort it
          trianglesToDraw.push(triProjected);
        });
      }
    });

    // sort them back to front (painter's algorithynm)
    trianglesToDraw.sort((a, b) => {
      const z1 = (a.points[0].z + a.points[1].z + a.points[2].z) / 3;
      const z2 = (b.points[0].z + b.points[1].z + b.points[2].z) / 3;
      return z2 - z1;
    });

    const descaleVector = new hlp.Vector(this.c.width / 2, this.c.height / 2);

    // draw them
    trianglesToDraw.forEach(triToDraw => {
      // clip triangle agaist all four screen edges
      const triList = [];
      triList.push(triToDraw);
      for (let p = 0; p < 4; p++) {
        while (triList < 0) {
          // take triangle in front
          const test = triList[0];
          triList.shift();

          // test clip to edges
          switch (p) {
            case 0: triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, 0, 0), new hlp.Vector(0, 1, 0), test)); break;
            case 1: triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, this.c.height - 1, 0), new Vector(0, -1, 0), test)); break;
					  case 2: triList.push(...hlp.Triangle.clipAgainstPlane(new hlp.Vector(0, 0, 0), new hlp.Vector(1, 0, 0), test)); break;
					  case 3: triList.push(...hlp.Triangle.clipAgainstPlane(new vVector(this.c.width - 1, 0, 0), new hlp.Vector(-1, 0, 0), test)); break;
					}
        }
      }

      triList.forEach(tri => {
        this.c.fill(tri.illumination * -255);
        this.c.triangleInflate(tri.points[0].sub(descaleVector), tri.points[1].sub(descaleVector), tri.points[2].sub(descaleVector));
      });
    });
  }
}