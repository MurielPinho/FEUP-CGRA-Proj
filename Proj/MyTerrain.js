/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(scene, 40);

        this.initBuffers();


        this.terrain_shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrain_shader.setUniformsValues({ uSampler: 0 });
        this.terrain_shader.setUniformsValues({ tex: 1 });
        this.terrain_shader.setUniformsValues({ colorTex: 2 });
        this.terrain_shader.setUniformsValues({ scale: 15.0 });

        this.initMaterials();
    }

    initBuffers() {
        this.vertices = [];

        //Counter-clockwise reference of vertices
        this.indices = [];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initMaterials() {

        //Terrian material - the whole terrain, mainly a diffuse material
        this.terrain_material = new CGFappearance(this.scene);
        this.terrain_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrain_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.terrain_material.setSpecular(0.2, 0.2, 0.2, 1);
        this.terrain_material.setShininess(100);

        this.terrain_texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrain_material.setTexture(this.terrain_texture);

        this.heightmap_texture = new CGFtexture(this.scene, "images/heightmap.jpg");

       
    }


    display() {
        this.scene.setActiveShader(this.terrain_shader);

        this.terrain_material.apply();
        this.heightmap_texture.bind(1);

        this.scene.pushMatrix();
        this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);

        this.scene.scale(50, 50, 1);
        
        this.scene.translate(0, 0, -5.3);   

        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}