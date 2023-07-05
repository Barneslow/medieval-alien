import Phaser from 'phaser';


export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this)

    this.init()
  }



  init() {
    this.gravity = 500;
    this.playerSpeed = 200;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
  }

  protected preUpdate(time: number, delta: number): void {

    super.preUpdate(time, delta);
    const {left, right} = this.cursors

    if (left.isDown) {
        this.setVelocityX(-this.playerSpeed);
      } else if (right.isDown) {
        this.setVelocityX(this.playerSpeed);
      } else {
        this.setVelocityX(0);
      }
      
  }
}







export default Player;