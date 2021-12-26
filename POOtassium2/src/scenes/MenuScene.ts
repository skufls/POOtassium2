import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    
    create(){
    

    
    this.add.image(400, 155, "logo")
    .setScale(15);

    let playButton = this.add.image(400, 300, 'play');


    let optionsButton = this.add.image(400, 400, 'options');


    this.input.on('pointerdown',  (pointer: { x: number; y: number; }) => {
        this.add.sprite(pointer.x + 30, pointer.y + 240, 'poop_select')
        .setScale(8)
        .play('poop_select');
        this.sound.play("splet");
            
    }, this);

    playButton.setInteractive();

    playButton.on("pointerup", ()=>{
        console.log("weeeee")
        setTimeout(() => this.scene.start(CST.SCENES.PLAY), 1500)
    },
   

    optionsButton.setInteractive())

    optionsButton.on("pointerup", ()=>{
        console.log("woooo")
    });
    }

}