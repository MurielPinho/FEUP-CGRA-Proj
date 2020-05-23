/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(this);
        this.sphere = new MySphere(this, 8, 8);
        this.cylinder = new MyCylinder(this, 10, 1);
        this.vehicle = new MyVehicle(this);
        this.plane = new MyPlane(this,60);
        this.cubemap = new MyCubeMap(this)
        this.rudder = new MyRudder(this)
        this.supplies = new Array(5); 
        this.nSuppliesDelivered = 0;
        for (let index = 0; index < this.supplies.length; index++) {
            this.supplies[index] = new MySupply(this, 0, 9, 0);
        }

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.selectedTexture = 0;
        this.selectedScene = 0;
        
        
        this.esfera = new CGFappearance(this);
        this.esfera.setAmbient(0.1, 0.1, 0.1, 1);
        this.esfera.setDiffuse(0.9, 0.9, 0.9, 1);
        this.esfera.setSpecular(0.1, 0.1, 0.1, 1);
        this.esfera.setShininess(10.0);
        this.esfera.loadTexture('images/earth.jpg');
        this.esfera.setTextureWrap('REPEAT', 'REPEAT');

        this.cilindro = new CGFappearance(this);
        this.cilindro.setAmbient(0.1, 0.1, 0.1, 1);
        this.cilindro.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cilindro.setSpecular(0.1, 0.1, 0.1, 1);
        this.cilindro.setShininess(10.0);
        this.cilindro.loadTexture('images/testMap.jpg');
        this.cilindro.setTextureWrap('REPEAT', 'REPEAT');

        this.paisagem = new CGFappearance(this);
        this.paisagem.setAmbient(0.1, 0.1, 0.1, 1);
        this.paisagem.setDiffuse(0.9, 0.9, 0.9, 1);
        this.paisagem.setSpecular(0.1, 0.1, 0.1, 1);
        this.paisagem.setShininess(10.0);
        this.paisagem.loadTexture('images/mountains.png');
        this.paisagem.setTextureWrap('REPEAT', 'REPEAT');

        this.sky = new CGFtexture(this, 'images/sky.png');
        this.polar = new CGFtexture(this, 'images/polar.jpg');
        this.mountains = new CGFtexture(this, 'images/mountains.png');

        this.textures = [ this.mountains,this.polar,this.sky, ];
        this.textureIds = { 'Mountains': 0, 'Polar': 1, 'Sky': 2 };
        this.scenesIds = { 'Complete': 0 ,'Sphere': 1, 'Cylinder': 2, 'Cubemap': 3, 'Terrain': 4, };
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-80, 60, 70), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    updateAppliedTexture() {
        this.paisagem.setTexture(this.textures[this.selectedTexture]);
    }
    updateSelectedScene(v){
        this.selectedScene = v;
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.lastTime = this.lastTime || 0;
        this.deltaTime = t - this.lastTime;
        this.lastTime = t;

        this.checkKeys(t, this.deltaTime);

        this.vehicle.update(t);

    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        if (this.selectedScene == 0) {
            this.pushMatrix();
            this.vehicle.display(this.scaleFactor);
            this.popMatrix();

            this.pushMatrix();
            this.terrain.display();
            this.popMatrix();

            this.pushMatrix();
            this.scale(50,50,50);
            this.paisagem.apply();
            this.cubemap.display();
            this.popMatrix();
            this.pushMatrix();

            for (let index = 0; index < this.supplies.length; index++) {
                this.supplies[index].display(this.scaleFactor,this.lastTime);
            }

            this.popMatrix();


        }
        else if(this.selectedScene == 1)
        {
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.esfera.apply();
            this.sphere.display();

        }
        else if (this.selectedScene == 2) {
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.rudder.display();
        }
        else if (this.selectedScene == 3) {
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.pushMatrix();
            this.scale(50,50,50);
            this.paisagem.apply();
            this.cubemap.display();
            this.popMatrix();
        }
        else if (this.selectedScene == 4) {

            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.pushMatrix();
            this.terrain.display();
            this.popMatrix();
        }
    
        

        // ---- END Primitive drawing section
    }
    resetSupplies(){
        for (let index = 0; index < this.supplies.length; index++) {

            this.supplies[index].reset();
        }
        this.nSuppliesDelivered = 0;
    }
    dropSupplies() {
        if (this.nSuppliesDelivered < 5) {
            this.supplies[this.nSuppliesDelivered].drop(this.vehicle.position.x, this.vehicle.position.z);
            this.nSuppliesDelivered++;
        }
    }

    checkKeys(t, deltaTime) {
        var text = "Keys pressed: ";
        var keysPressed = false;
        var timeIndependence = deltaTime / 1000;
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            this.vehicle.accelerate(timeIndependence * this.speedFactor*10);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            this.vehicle.accelerate(-timeIndependence * this.speedFactor * 10);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            this.vehicle.turn(timeIndependence * this.speedFactor * 5 * 10);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            this.vehicle.turn(-timeIndependence * this.speedFactor * 5 * 10);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            this.vehicle.reset();
            this.resetSupplies();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            this.vehicle.auto();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            text += " L ";
            this.dropSupplies();
            keysPressed = true;
        }
        
        if(!this.vehicle.autoP)
        {
            if (!(text.includes("A") ^ text.includes("D"))) {
            this.vehicle.turnleft = false;
            this.vehicle.turnright = false;
            }
        }
        if (keysPressed)
            console.log(text);
       
 

    }
    onScaleFactorChanged(v) {
       this.scaleFactor = v;
    }
    onSpeedFactorChanged(v) {
        this.speedFactor = v;
    }

}
