/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.position = [];
        this.directionvector = [];
        this.orientation = 0;
        this.speed = 0;
        this.lastSpeed = 0;
        this.position.x = 0;
        this.position.y = 10;
        this.position.z = 0; 
        this.propellerAng = 0;
        this.turnleft = false;
        this.turnright = false;
        this.autoP = false;
        this.sphere = new MySphere(this.scene, 16, 8);  
        this.cylinder = new MyCylinder(this.scene, 20, 1);
        this.rudder = new MyRudder(this.scene);
        this.propeller = new MyPropeller(this.scene);
        this.flag = new MyFlag(this.scene,10);
        this.initMaterials();

    }
initMaterials() {

    this.frontMaterial = new CGFappearance(this.scene);
    this.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.frontMaterial.setShininess(10.0);
    this.frontMaterial.loadTexture('images/front.png');
    this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.bodyMaterial = new CGFappearance(this.scene);
    this.bodyMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.bodyMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.bodyMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.bodyMaterial.setShininess(10.0);
    this.bodyMaterial.loadTexture('images/body.png');
    this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.baseMaterial = new CGFappearance(this.scene);
    this.baseMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.baseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.baseMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.baseMaterial.setShininess(10.0);
    this.baseMaterial.loadTexture('images/base.png');
    this.baseMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.flagMaterial = new CGFappearance(this.scene);
    this.flagMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.flagMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.flagMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.flagMaterial.setShininess(10.0);
    this.flagMaterial.loadTexture('images/ficaemcasa.jpg');
    this.flagMaterial.setTextureWrap('REPEAT', 'REPEAT');
    this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
    this.flagMotion = new CGFtexture(this.scene.gl, "images/flagMotion.jpg");
    this.flagShader.setUniformsValues({ texture: 1, speedFactor: 0.1, timeFactor: 0, uSampler2: 1 });

}
    display(scale){
        var radAng = (Math.PI * this.orientation) / 180;
        
        this.scene.pushMatrix();

        //Setting base angle orientation and scale
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(radAng, 0, 1, 0);
        this.scene.scale(scale, scale, scale);

        //Drawing main body
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.scale(1, 1, 2);
        this.sphere.display();
        this.scene.popMatrix();

        //Drawing passanger compartment
        this.baseMaterial.apply();

        this.scene.scale(0.3,0.3,0.3);
        this.scene.translate(0,-4,0);
        this.scene.translate(0,0,-1.5);
        this.sphere.display();

        this.scene.pushMatrix();
        this.scene.scale(1, 1, 3);
        this.scene.rotate((Math.PI * 90) / 180, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 3);
        this.scene.rotate((Math.PI * 180) / 180, 0, 1, 0);
        this.frontMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //Drawing propellers
        this.scene.pushMatrix();
        this.baseMaterial.apply();

        this.scene.translate(1.5, 0, -1);
        this.scene.scale(0.4, 0.4, 0.4);

        this.scene.pushMatrix();
        this.scene.rotate((Math.PI * this.propellerAng) / 180, 0, 0, 1);
        this.propeller.display();
        this.scene.popMatrix();

        this.scene.translate(-7.5, 0, 0);
        this.scene.rotate((Math.PI * this.propellerAng) / 180, 0, 0, 1);
        this.propeller.display();
        this.scene.popMatrix();

        //Drawing Engines
        this.scene.pushMatrix();
        this.baseMaterial.apply();

        this.scene.translate(1.5, 0, 0);
        this.scene.scale(0.5, 0.3, 1);
        this.sphere.display();
        this.scene.translate(-6, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        //Display Rudders
        this.scene.pushMatrix();
        this.baseMaterial.apply();
        this.scene.scale(1.5,1.5,1.5);
        this.scene.translate(0, 2.75, -3.5);
        this.scene.rotate((Math.PI * 90) / 180, 1, 0, 0);
        this.rudder.display();
        this.scene.rotate((Math.PI * -90) / 180, 0, 1,0 );
        if(this.turnleft)
            this.scene.rotate((Math.PI * 20) / 180, 1, 0, 0);
        if(this.turnright)
            this.scene.rotate((Math.PI * -20) / 180, 1, 0, 0);
        this.rudder.display();
        this.scene.popMatrix();

        //Display Flag Ropes
        this.scene.pushMatrix();
        this.baseMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, -8);
        this.scene.scale(0.05, 5, 0.05);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.rotate((Math.PI * -90) / 180, 1, 0, 0);
        this.scene.translate(0, 4,4);
        this.scene.scale(0.05, 4, 0.05);
        this.cylinder.display();
        this.scene.popMatrix();

        //Display Flag
        this.scene.pushMatrix();
        this.flagMotion.bind(1);
   
        this.scene.translate(0,4,-13);

        this.scene.setActiveShader(this.flagShader);
        this.flagMaterial.apply();
        this.flag.display();
        this.scene.popMatrix();

        
        this.scene.popMatrix(); 
        this.scene.setActiveShader(this.scene.defaultShader);


        
    }

    update(t){

        this.lastTime = this.lastTime || 0;
        this.deltaTime = t - this.lastTime;
        this.lastTime = t;
        var timeIndependence = this.deltaTime / 1000;

        if(this.autoP){
            this.orientation+= (360/5) * timeIndependence;
        }

        var radAng = (Math.PI * this.orientation) / 180;
        this.directionvector.x = Math.sin(radAng);
        this.directionvector.y = 0;
        this.directionvector.z = Math.cos(radAng);
        this.position.x += this.directionvector.x * this.speed * timeIndependence;
        this.position.y += this.directionvector.y * this.speed * timeIndependence;
        this.position.z += this.directionvector.z * this.speed * timeIndependence;
        this.propellerAng = (this.propellerAng + 10 + (this.speed *100))%360;
        this.flagShader.setUniformsValues({ speedFactor:this.speed/50  ,timeFactor: t / 100 % 1000 });
        ;
    }
    turn(val){
        if(!this.autoP)
        {
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
    
    }
    accelerate(val){
        if (!this.autoP) {
        this.speed += val;
        if(this.speed < 0)
            this.speed = 0;
        }
    }

    reset(){
        this.position.x = 0;
        this.position.y = 10;
        this.position.z = 0;
        this.speed = 0;
        this.orientation = 0;
        this.propellerAng = 0;
        this.autoP = false;
        this.dropCounter = 0; 



    }
    auto(){
        if(!this.autoP)
        {
            this.lastSpeed = this.speed;
            this.speed = 31.42 / 5;
            this.autoP = true;
            this.turnleft = true;
        }
        else
        {
            this.speed = this.lastSpeed;
            this.autoP = false;
            this.turnleft = false;
        }
    }

}

