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
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.vehicle = new MyVehicle(this);
        this.plane = new MyPlane(this,60);
        this.cubemap = new MyCubeMap(this)

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.selectedTexture = 0;
        this.textureIds = { 'Board': 0, 'Floor': 1, 'Window': 2 };
        
        this.paisagem = new CGFappearance(this);
        this.paisagem.setAmbient(0.1, 0.1, 0.1, 1);
        this.paisagem.setDiffuse(0.9, 0.9, 0.9, 1);
        this.paisagem.setSpecular(0.1, 0.1, 0.1, 1);
        this.paisagem.setShininess(10.0);
        this.paisagem.loadTexture('images/cubemap.png');
        this.paisagem.setTextureWrap('REPEAT', 'REPEAT');
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
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update();

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

        //This sphere does not have defined texture coordinates
        //this.incompleteSphere.display();
        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
        this.pushMatrix();

        this.vehicle.display();
        this.popMatrix();

        this.pushMatrix();

        this.terrain.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.scale(50,50,50);
        this.paisagem.apply();
        this.cubemap.display();
        this.popMatrix();
        
        

        // ---- END Primitive drawing section
    }
    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            this.vehicle.accelerate(this.speedFactor);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            this.vehicle.accelerate(-this.speedFactor);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            this.vehicle.turn(2);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            this.vehicle.turn(-2);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            this.vehicle.reset();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            this.vehicle.auto();
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
    updateAppliedTexture(v){
        this.selectedTexture = v;
    };
}
