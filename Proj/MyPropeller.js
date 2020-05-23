/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPropeller extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.4,1,1);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0);
        this.scene.scale(0.4, 1, 1);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.6, 2, 1);
        this.quad.display();
        this.scene.popMatrix();


        this.scene.rotate((Math.PI * 180) / 180, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.scale(0.6, 2, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.scale(0.4, 1, 1);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0);
        this.scene.scale(0.4, 1, 1);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();

        


        this.scene.popMatrix();
    }



}

