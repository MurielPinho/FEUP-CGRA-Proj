/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRudder extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            0,1,0,	//0
            2,1,0,	//1
            2,3,0,	//2
            0,3,0, //3
            -2,1,0, //4
            2,-1,0, //5 
            0,-1,0, //6 
            0,-3,0, //7 
            2,-3,0, //8 
            -2,-1,0 //9
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            2,1,0,
            2,0,3,
            3,0,4,
            4,0,6,
            9,4,6,
            8,6,5,
            7,6,8,
            9,6,7,
            0,1,2,
            3,0,2,
            4,0,3,
            6,0,4,
            6,4,9,
            5,6,8,
            8,6,7,
            7,6,9
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
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

