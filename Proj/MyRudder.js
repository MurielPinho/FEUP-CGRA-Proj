/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRudder extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.15, 0);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.translate(1,0,0);
        this.quad.display();
        this.scene.translate(-2, 0, 0);
        this.quad.display();
        this.scene.translate(0.25, 0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0, 0);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();

        this.scene.popMatrix();  
        this.scene.pushMatrix();

        this.scene.rotate((Math.PI * 180) / 180, 0, 1, 0);
        this.scene.translate(-0.75, -0.5, 0);

        this.scene.pushMatrix();
        this.scene.translate(0, 1.15, 0);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.translate(1, 0, 0);
        this.quad.display();
        this.scene.translate(-2, 0, 0);
        this.quad.display();
        this.scene.translate(0.25, 0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0, 0);
        this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
        this.quad.display();

        this.scene.popMatrix();
        this.scene.popMatrix();


        


        this.scene.popMatrix();
    }



}

