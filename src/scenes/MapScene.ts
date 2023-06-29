import mapJson from "../assets/json/2DTowerDefense.json";
import Sprites from "../assets/images/2DSprites.png";

export class MapScene extends Phaser.Scene {
  constructor() {
    super("MapScene");
  }

  init() {}

  preload() {
    this.load.tilemapTiledJSON("map", mapJson);
    this.load.image("tiles", Sprites);
  }

  create() {
    // this.createNewGame();
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("2Dsprites", "tiles", 32, 32);
    const layer1 = map.createLayer(0, tileset);
    layer1.setInteractive();
  }

  update() {}

  private createNewGame() {
    // this launches the game scene
    this.scene.launch("game");
  }
}
