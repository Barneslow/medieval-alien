import Phaser from 'phaser';
import initAnimations from './playerAnimations'


export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this)

    this.init()
    this.initEvents()
  }


  init() {
    this.gravity = 500;
    this.playerSpeed = 200;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims)

  }

  initEvents(){
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(...args: any[]): void {
    const {left, right, space, up} = this.cursors
    const onFloor = this.body?.onFloor()

    if (left.isDown) {
        this.setVelocityX(-this.playerSpeed);
        this.setFlipX(true)
      } else if (right.isDown) {
        this.setVelocityX(this.playerSpeed);
        this.setFlipX(false)
      } else {
        this.setVelocityX(0);
      }

      if((space.isDown || up.isDown) && onFloor){
        this.setVelocityY(-this.playerSpeed * 1.5)
      }
      onFloor ? this.body?.velocity.x !== 0 ?
      this.play('run', true) : this.play('idle', true) : this.play('jump', true)     
  }


   
}







export default Player;