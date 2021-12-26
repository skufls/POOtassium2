/** @type {import("../typings/phaser")} */
import { GameOverScene } from "./scenes/GameOverScene";
import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";


let game = new Phaser.Game({
    width: 800,
    height: 600,
    backgroundColor: '#73AA58',
    scene: [
        LoadScene, MenuScene, PlayScene, GameOverScene
    ],
    physics:{
        default: "arcade",
        arcade:{
            debug:true,
            fixedStep: false
        }
        
    },
    render:{
        pixelArt: true  
    },
    scale: {
        zoom: 1.5,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    }
 
});


