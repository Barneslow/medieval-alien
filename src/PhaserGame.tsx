import Phaser, { Scene, Scenes } from "phaser";
import { MapScene } from "./scenes/MapScene";
import { useEffect, useRef } from "react";

const MAP_WIDTH = 960;

const WIDTH = 960
const HEIGHT = 640;
const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: 1.5
}


const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  const Scenes = [MapScene]

  const createScene = Scene => new Scene(SHARED_CONFIG)
  const initScenes = () =>  Scenes.map(createScene)


  useEffect(() => {
    if (gameContainerRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        ...SHARED_CONFIG,
        parent: gameContainerRef.current,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
          },
        },
        scene: initScenes(),
      };

      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div ref={gameContainerRef} />;
};

export default PhaserGame;
