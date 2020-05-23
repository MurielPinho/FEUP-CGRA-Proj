/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};
class MySupply extends CGFobject {
    constructor(scene,x,y,z) {
        super(scene);
        this.initBuffers();
        this.position = [];
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.speed = this.position.y / 3 ;
        this.quad = new MyQuad(scene);
        this.state = SupplyStates.INACTIVE;
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
        this.supply_material = new CGFappearance(this.scene);
        this.supply_material.setAmbient(0.1, 0.1, 0.1, 1);
        this.supply_material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.supply_material.setSpecular(0.1, 0.1, 0.1, 1);
        this.supply_material.setShininess(10.0);
        this.supply_material.loadTexture('images/crate.png');
        this.supply_material.setTextureWrap('REPEAT', 'REPEAT');

      
    }
    display(scaleFactor,time) {
        this.supply_material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.update(time);
        if(this.state != SupplyStates.INACTIVE)
        {
            if(this.state == SupplyStates.FALLING)
            {
                this.displayFalling(scaleFactor); 
            }
            else if(this.state == SupplyStates.LANDED){
                this.displayLanded(scaleFactor);
            }
  
        }

    }

    displayFalling(scaleFactor){
        //Front Face
        
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);

        this.scene.scale(scaleFactor*0.5, scaleFactor*0.5, scaleFactor*0.5);


        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //Back Face 
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Left Face
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Right Face
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Top Face
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //Bottom Face
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }

    displayLanded(scaleFactor){
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(scaleFactor * 0.5, scaleFactor * 0.5, scaleFactor * 0.5);


        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.translate(1, 0, 0);
        this.quad.display();
        this.scene.translate(-2, 0, 0);
        this.quad.display();
        this.scene.translate(1, 1, 0 );
        this.quad.display();
        this.scene.translate(0, -2, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    update(time)
    {
        this.lastTime = this.lastTime || 0;
        this.deltaTime = time - this.lastTime;
        this.lastTime = time;
        var timeIndependence = this.deltaTime / 1000;

        if(this.state == SupplyStates.FALLING)
        {
            this.position.y -= this.speed*timeIndependence;

            if(this.position.y <= 0)
            {
                this.position.y = 0;
                this.state = SupplyStates.LANDED;
            }
        }
    }

    drop(x,z)
    {
        this.position.z = z;
        this.position.x = x;
        this.state = SupplyStates.FALLING;
    }

    reset()
    {
        this.position.x = 0;
        this.position.y = 10;
        this.position.z = 0;
        this.state = SupplyStates.INACTIVE;

    }

    
}

