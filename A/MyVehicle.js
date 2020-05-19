/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.orientation = 0;
        this.speed = 0;
        this.position = [];
        this.directionvector = [];
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.sphere = new MySphere(this.scene, 16, 8);  
        this.cylinder = new MyCylinder(this.scene, 20, 1);
        this.rudder = new MyRudder(this.scene);
        this.propeller = new MyPropeller(this.scene);
        this.turnleft = false;
        this.turnright = false;
        this.propellerAng=0;
    }

    display(){
        this.scene.pushMatrix(); 
        //this.scene.translate(0, 10,0);
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        var radAng = (Math.PI * this.orientation) / 180;
        this.scene.rotate(radAng, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(0,-4,0);
        this.scene.translate(0,0,-1.5);
        this.sphere.display();
        this.scene.pushMatrix();
        this.scene.translate(1.5,0,0);
        this.scene.scale(0.5,0.3,1);
        this.sphere.display();
        this.scene.translate(-6, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0, -1);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.pushMatrix();
        this.scene.rotate((Math.PI * this.propellerAng) / 180, 0, 0, 1);

        this.propeller.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-7.5, 0, 0);
        this.scene.rotate((Math.PI * this.propellerAng) / 180, 0, 0, 1);

        this.propeller.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(1,1,3);
        this.cylinder.display();
        this.scene.popMatrix();
        this.scene.translate(0, 0, 3);    
        this.scene.rotate((Math.PI * 180) / 180, 0, 1, 0);
        this.sphere.display();
        this.scene.rotate((Math.PI * -90) / 180, 0, 1, 0);
        this.scene.translate(7, 4, 0);
        this.scene.pushMatrix();
        if(this.turnleft)
            this.scene.rotate((Math.PI * -20) / 180, 0, 1, 0);
        if(this.turnright)
            this.scene.rotate((Math.PI * 20) / 180, 0, 1, 0);
        this.rudder.display();
        this.scene.popMatrix();
        this.scene.rotate((Math.PI * -90) / 180, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    }

    update(){
        var radAng = (Math.PI * this.orientation) / 180;
        this.directionvector.x = Math.sin(radAng);
        this.directionvector.y = 0;
        this.directionvector.z = Math.cos(radAng);
        this.position.x += this.directionvector.x * this.speed;
        this.position.y += this.directionvector.y * this.speed;
        this.position.z += this.directionvector.z * this.speed;
        this.propellerAng = (this.propellerAng + (this.speed*100))%360;
        
    }
    turn(val){
        this.temp = this.orientation;
        if(val > 0)
        {
            this.orientation += val;
            this.turnleft = true;
            this.turnright = false;
        }
        else if(val< 0)
        {
            this.orientation += val;
            this.turnright = true;
            this.turnleft = false;
        }
    
    }
    accelerate(val){
        this.speed += val;
        if(this.speed < 0)
            this.speed = 0;
    }

    reset(){
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.speed = 0;
        this.orientation = 0;
        this.propellerAng = 0;
    }
}

