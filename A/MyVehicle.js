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
        
    }

    display(){
        this.scene.pushMatrix(); 
         this.scene.translate(this.position.x, this.position.y, this.position.z);
        var radAng = (Math.PI * this.orientation) / 180;
        this.scene.rotate(radAng, 0, 1, 0);
        this.scene.pushMatrix();
        this.scene.scale(1, 1.1, 2);
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(0,-4,0);
        this.scene.translate(0,0,-1.5);
        this.sphere.display();
        this.cylinder.display();
        this.scene.translate(0, 0, 1);
        this.cylinder.display();
        this.scene.translate(0, 0, 1);
        this.cylinder.display();
        this.scene.translate(0, 0, 1);
        this.scene.rotate((Math.PI * 180) / 180, 0, 1, 0);

        this.sphere.display();
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
    
    }
    turn(val){
        
        this.orientation += val;
    
    }
    accelerate(val){
        this.speed += val;
    }

    reset(){
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        this.speed = 0;
        this.orientation = 0;
    }
}

