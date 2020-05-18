/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, wrapTexture) {
        super(scene);

      
        
        this.slices = slices;

        this.wrap = wrapTexture;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), -Math.sin(ang), 0);
            this.vertices.push(Math.cos(ang), -Math.sin(ang), 1);         
            this.vertices.push(Math.cos(ang+alphaAng), -Math.sin(ang+alphaAng), 0);
            this.vertices.push(Math.cos(ang+alphaAng), -Math.sin(ang+alphaAng),1);
            
            this.indices.push(4*i, (4*i+1)%(4*this.slices), (4*i+3) % (4*this.slices));
            this.indices.push(4*i, (4*i+3)%(4*this.slices), (4*i+2) % (4*this.slices));
            this.normals.push(Math.cos(ang), -Math.sin(ang), 0);
            this.normals.push(Math.cos(ang), -Math.sin(ang), 0);
            this.normals.push(Math.cos(ang+alphaAng), -Math.sin(ang+alphaAng), 0);
            this.normals.push(Math.cos(ang+alphaAng), -Math.sin(ang+alphaAng), 0);
            
            if(this.wrap){
                this.texCoords.push(i/this.slices, 1);
                this.texCoords.push(i/this.slices, 0);
                this.texCoords.push((i+1)/this.slices, 1);
                this.texCoords.push((i+1)/this.slices, 0);
            }   
            else{
                this.texCoords.push(0, 1);
                this.texCoords.push(0, 0);
                this.texCoords.push(1, 1);
                this.texCoords.push(1, 0);
            }
            
            ang+=alphaAng;   
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}


