/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		this.flag = new MyPlane(this.scene, 60);

	}
	display()
	{
		this.scene.pushMatrix();
		this.scene.scale(5, 5, 10);
		this.scene.rotate((Math.PI * -90) / 180, 0, 1, 0);
		this.flag.display();
		this.scene.rotate((Math.PI * -180) / 180, 0, 1, 0);
		this.flag.display();
		this.scene.popMatrix();
	}
}

