import mapJson from "../assets/json/platformer.json";
import Sprites from "../assets/images/main_lev_build_1.png";
import Player from "../classes/Player";
import playerImage from '../assets/images/player/move_sprite_1.png'

export class MapScene extends Phaser.Scene {
  constructor() {
    super("MapScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", mapJson);
    this.load.image("tiles", Sprites);
    this.load.image('player', playerImage)
  }

  create() {
    // this.createNewGame();
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("main_lev_build_1", "tiles", 16, 16);

    const layers = this.createLayers(map)
    layers.platformsColliders.setCollisionByExclusion([-1], true)

    this.player = this.createPlayer()
    this.physics.add.collider(this.player, layers.platformsColliders);
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  createLayers(map: Phaser.Tilemaps.Tilemap) {
    const tileset = map.getTileset('main_lev_build_1');
    const platformsColliders = map.createLayer('platforms_colliders', tileset!)!;
    const environment = map.createLayer('environment', tileset!)
    const platforms = map.createLayer('platforms', tileset!);
    platformsColliders.setCollisionByProperty({collides: true});
    return { environment, platforms, platformsColliders };
  }

  createPlayer() {
    const player = new Player(this, 100, 250);
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);
    return player;
  
  }
  

  update() {}
}
