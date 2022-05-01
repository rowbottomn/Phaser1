//game constants and variables
const speed = 160;
const DEBUG = true;

var boost = 800;
const boostMax = boost;
const boostDecay = 2;
const boostRecovery = 0.4;

function preload() {
    this.load.image('player', 'assets/images/ship.png');
     
}

function create() {

  this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
 
//note this places the player sprite at the x, y, name then sets the scale
    this.player = this.physics.add.image(config.width / 4, config.height / 4, 'player').setScale(0.50, 0.50);
  this.player.setAngle(-90);
    log(this.player);
    this.player.boost = false;    this.player.setCollideWorldBounds(true);
    this.boostRect = this.add.rectangle(410, 25, boost, 30, 0x11cc66);
 
}

function update() {
   
  if (this.a.isDown ){
    this.player.setVelocityX(-speed);
  } 
  else if(this.d.isDown){
    this.player.setVelocityX(speed);
  } 
  else {
    this.player.setVelocityX(0);
  }
  if (this.w.isDown ){
    this.player.setVelocityY(-speed);
  } 
  else if(this.s.isDown){
    this.player.setVelocityY(speed);
  } 
  else {
    this.player.setVelocityY(0);
  }



  //make the velocity length 1 in the proper direction
  this.player.body.velocity.normalize();
  
  //are we boosted?
  if (this.shift.isDown && boost>2){
    this.player.body.velocity.scale(2*speed); 
    boost -= boostDecay;
  }
  else{
    this.player.body.velocity.scale(speed);    
    if (boost<boostMax){
      boost += boostRecovery;  
    }
    
  }
  this.boostRect.width = boost;
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    backgroundColor: '#d9d9d9',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

limit = function(vel, max){
  vel.normalize();
  vel.scale(max);
}

log = function(msg){
  if (DEBUG){
    console.log(msg);  
  }
}