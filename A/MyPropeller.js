/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPropeller extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0, 0, 0,	
            0.3, 1.5, 0,
            0, 2, 0,
            -0.3,1.5,0,
            0.3, -1.5, 0,
            0, -2, 0,
            -0.3, -1.5, 0,

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            3, 1, 0,
            3, 2, 1,
            0, 1, 3,
            1, 2, 3,
            0, 6, 4,
            6, 5, 4,
            4, 6, 0,
            4, 5, 6

        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            



        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

