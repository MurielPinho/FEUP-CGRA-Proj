/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene,dir,vel,x,y,z) {
        super(scene);
        this.dir = dir;
        this.vel = vel;
        this.pos = [x,y,z];
        this.pyramid = new MyTriangle(this.scene,);   
    }

    display(){
        this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
        this.pyramid.display();
    }

    update(){
        this.pos+=[1,0,1];
    }
}

