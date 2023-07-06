import Phaser from "phaser";
import { MapScene } from "./scenes/MapScene";
import { useEffect, useRef } from "react";

const MAP_WIDTH = 960
const MAP_HEIGHT = 640

const PhaserGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameContainerRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: MAP_WIDTH,
        height: MAP_HEIGHT,
        parent: gameContainerRef.current,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
          },
        },
        scene: [MapScene],
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
