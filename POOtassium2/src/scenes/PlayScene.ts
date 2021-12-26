import { group } from "console";
import { ALL } from "dns";
import { World } from "matter";
import { Game, Scene } from "phaser";
import { start } from "repl";
import { isBooleanObject } from "util/types";
import { CST } from "../CST";
import { GameOverScene } from "./GameOverScene";

var bancount;
var count = 0;
var enemy: any;
var enmGo: any;
var hitcount = 0;
var hitcount2 = 0;

export class PlayScene extends Phaser.Scene{

   constructor(){
        super({
            key: CST.SCENES.PLAY
        });
        this.poopgroup,
        this.poop
        this.Epoop
        this.Epoopgroup
        this.enemy
    }

    [x: string]: object;
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private monkeyhead!: Phaser.GameObjects.Sprite
    player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    poop!: Phaser.Types.Physics.Arcade.PhysicsGroupConfig;
    blockslayer!: Phaser.Tilemaps.TilemapLayer
    enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    enemy2!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    scan!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    moveEvent!: Phaser.Time.TimerEvent;
    dropbanana!: Phaser.Time.TimerEvent;
    playerthrow!: Phaser.Time.TimerEvent;
    bancount!: Phaser.GameObjects.Image;
    jimmy!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    exit!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;



  

    preload(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }


    create(){

       //tilemap
       const map = this.make.tilemap({ key: 'lvl1'});
       const tileset = map.addTilesetImage('poop_sheet', 'tiles');

       map.createLayer('background', tileset);
       this.blockslayer = map.createLayer('blocked', tileset);
       this.blockslayer.setCollisionBetween(1, 7, true);
       this.physics.world.bounds.width = 800
       this.physics.world.bounds.height = 800

       //player
       this.player = this.physics.add.sprite(400, 300,'monkey_head')
       .setCircle(10)
       .setOffset(6);
       this.player.setDepth(2);  
       this.physics.add.existing(this.player, false);
       this.player.setCollideWorldBounds(true);
       this.physics.add.collider(this.player, this.blockslayer);
       this.cameras.main.startFollow(this.player, false);
       this.cameras.main.zoom = 2;
       this.cameras.main.setBounds(0, 0, 800, 800);
       
       this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
       this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);}, this);

       //enemys
        enemy = this.physics.add.group({ classType: enemys, createCallback: (go)=> {
           enmGo = go as enemys
           enmGo.body.onCollide = true
       }})



       this.enemy = enemy.get(350, 50, 'enemy')
       .setCircle(10)
       .setOffset(6)
       .setCollideWorldBounds(true);
  

       this.scan = this.physics.add.sprite(this.enemy.x -110, this.enemy.y -110, 'enemy')
       .setVisible(false)
       .setCircle(120)
       .setOffset(6);

       this.enemy2 = enemy.get(100, 300, 'enemy')
       .setCircle(10)
       .setOffset(6)
       .setCollideWorldBounds(true);

       this.scan2 = this.physics.add.sprite(this.enemy2.x -110, this.enemy2.y -110, 'enemy')
       .setVisible(false)
       .setCircle(120)
       .setOffset(6);
       
     

       this.physics.add.collider(enemy, this.blockslayer);
       this.physics.add.collider(enemy, this.player, this.handlePlayerEnemyCollision, undefined, this);
       this.enemy.setCollideWorldBounds(true);


       //projectile
       this.poopgroup = new poopgroup(this);
       this.Epoopgroup = new Epoopgroup(this);

       this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
       this.playerthrow.paused = false
       
       
        });
        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            this.playerthrow.paused = true;
        });



        this.playerthrow = this.time.addEvent({
            delay: 500,
            startAt: 500,
            callback: ()=>{
                this.poopgroup.poopthrow(this.player.x, this.player.y, this.player.rotation, this.blockslayer),
                this.player.play("monkey_head");
            },
            loop: true,
            paused: true,

        })

       
       //keybinds
       this.cursors=this.input.keyboard.createCursorKeys()
       this.inputKeys = this.input.keyboard.addKeys({
           up: Phaser.Input.Keyboard.KeyCodes.W,
           down:  Phaser.Input.Keyboard.KeyCodes.S,
           left: Phaser.Input.Keyboard.KeyCodes.A,
           right: Phaser.Input.Keyboard.KeyCodes.D,
       })     

       const B = this.physics.add.group({ classType: banana});

       this.dropbanana= this.time.addEvent({
        callback: ()=>{
            B.get(this.enemy.x, this.enemy.y, "banana")
            .setCircle(6)
            .setOffset(10)

           
        },
        loop: false,
        paused: true,
       });

       this.dropbanana2= this.time.addEvent({
        callback: ()=>{
            B.get(this.enemy2.x, this.enemy2.y, "banana")
            .setCircle(6)
            .setOffset(10)

           
        },
        loop: false,
        paused: true,
       });

       this.dropbanana3= this.time.addEvent({
        callback: ()=>{
            B.get(this.enemy.x, this.enemy.y, "banana")
            .setCircle(6)
            .setOffset(10)
        },
        loop: false,
        paused: true,
       });

       this.dropbanana4= this.time.addEvent({
        callback: ()=>{
            B.get(this.enemy2.x, this.enemy2.y, "banana")
            .setCircle(6)
            .setOffset(10)
        },
        loop: false,
        paused: true,
       });


       this.Jmove= this.time.addEvent({
        callback: ()=>{
            hitcount2 = 0,
            hitcount = 0,
            count = 0,
            this.physics.moveTo(this.jimmy,  395,10,5),
            this.jimmy.rotation = Phaser.Math.Angle.Between(this.jimmy.x, this.jimmy.y, this.player.x, this.player.y),
            setTimeout(() => this.text1 =  this.add.text(this.jimmy.x, this.jimmy.y+20, "Are they gone?"), 5000);
            setTimeout(() => this.text1.destroy(), 8000);
            setTimeout(() => this.text2 =  this.add.text(this.jimmy.x, this.jimmy.y+20, "Yes?"), 10000);
            setTimeout(() => this.text2.destroy(), 11000);
            setTimeout(() => this.text3 =  this.add.text(this.jimmy.x, this.jimmy.y+30, "OH! Thank you so much"), 12000);
            setTimeout(() => this.text4 =  this.add.text(this.jimmy.x, this.jimmy.y+45, "for dealing with these"), 12000);
            setTimeout(() => this.text5 =  this.add.text(this.jimmy.x, this.jimmy.y+60, "annoying ruffians!"), 12000);
            setTimeout(() => this.text3.destroy(), 16000);
            setTimeout(() => this.text4.destroy(), 16000);
            setTimeout(() => this.text5.destroy(), 16000);
            setTimeout(() => this.text6 =  this.add.text(this.jimmy.x, this.jimmy.y+20, "Follow me!"), 17000);
            setTimeout(() => this.text6.destroy(), 19000);
            setTimeout(()=> this.Jmove.paused = true,19000);
            setTimeout(()=> this.Jmoveback.paused = false,19000);
            setTimeout(()=> this.exit = this.physics.add.image(390,-15, "jimmy")
            .setVisible(false),19000);

           
        },
        loop: false,
        paused: true,
       });

       this.Jmoveback= this.time.addEvent({
        callback: ()=>{
            this.physics.moveTo(this.jimmy,  395,-10,25)
            this.jimmy.rotation = Phaser.Math.Angle.Between(this.jimmy.x, this.jimmy.y, this.player.x, this.player.y); 
                    
           
        },
        loop: false,
        paused: true,
       });

       this.physics.add.collider(this.player, this.exit)  
       
 
             
    };


    //banana
    drop(){
        if (hitcount == 1){this.dropbanana.paused = false}
        if (hitcount == 2){this.dropbanana3.paused = false}


    }
    drop2(){
        if (hitcount2 == 1){this.dropbanana2.paused = false}
        if (hitcount2 == 2){this.dropbanana4.paused = false}
    
    }
    addbanana(){

        
        bancount = this.add.sprite(225,175, "banana")
        .setScale(3)
        .setScrollFactor(0);
        count++;
        console.log(count)        
        if (count == 2){
            console.log(count)
            this.add.sprite(250,175, "banana")
        .setScale(3)
        .setScrollFactor(0);

        this.enemy = enemy.get(300, 50, 'enemy')
        .setCircle(10)
        .setOffset(6)
        .setCollideWorldBounds(true);
   
 
        this.scan = this.physics.add.sprite(this.enemy.x -110, this.enemy.y -110, 'enemy')
        .setVisible(false)
        .setCircle(120)
        .setOffset(6);

        this.enemy2 = enemy.get(100, 300, 'enemy')
        .setCircle(10)
        .setOffset(6)
        .setCollideWorldBounds(true);
 
        this.scan2 = this.physics.add.sprite(this.enemy2.x -110, this.enemy2.y -110, 'enemy')
        .setVisible(false)
        .setCircle(120)
        .setOffset(6);
      


        }
        if (count == 3){
            console.log(count)
            this.add.sprite(275,175, "banana")
            .setScale(3)
            .setScrollFactor(0)
            
        }
        if (count == 4){
            console.log(count)
            this.add.sprite(300,175, "banana")
            .setScale(3)
            .setScrollFactor(0)
            this.jimmy = this.physics.add.image(395, -20, "jimmy")
            .setBodySize(100,100)
    
            this.add.sprite(400,220, "arrow")
            .setScale(2)
            .setScrollFactor(0)
            .play("arrow")
        }





    }

    
    
    private handlePlayerEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {

  

    }

    update(){       

        if(hitcount == 1){
            this.drop()
        }
        if(hitcount2 == 1){
            this.drop2()
        }
        if(hitcount == 2){
            this.drop()
        }
        if(hitcount2 == 2){
            this.drop2()
        }


        

        if (this.physics.collide(this.player, this.exit)){
            this.scene.start(CST.SCENES.GAMEOVER)
        }

        if (this.physics.overlap(this.player, this.jimmy)){
            this.Jmove.paused = false
        }




        //move
        const speed = 150
        
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        } 

        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        } 
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x,playerVelocity.y)
        
        
    

    }
}

//classes
class banana extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: PlayScene, x:number,y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        super(scene, x, y, 'banana');    
    }
    preUpdate(time: number, delta: number){
        if (this.scene.physics.overlap(this, this.scene.player)){
            setTimeout(() => this.scene.addbanana(), 1);
            setTimeout(() =>   this.destroy(), 2);
        }
  

    }
    
    create(){      
        
       
    }
}



class Epoop extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene: PlayScene, x:number,y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        super(scene, x, y, 'poopE_projectile');    
    }
    preUpdate(time: number, delta: number){

        if (this.scene.physics.collide(this, this.scene.player)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2"),
            hitcount2 = 0,
            hitcount = 0,
            count = 0,
            this.scene.scene.start(CST.SCENES.GAMEOVER);

        }


        if (this.scene.physics.collide(this, this.scene.blockslayer)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2");
        }
        

    }
    Ethrow(x: number, y: number, rotation: number, pointer:Phaser.Input.Pointer){
        this.play('poopE_projectile');
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
        this.rotation = Phaser.Math.Angle.Between(this.scene.enemy.x, this.scene.enemy.y, this.scene.player.x, this.scene.player.y,);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.play('poopE_projectile');

    }

    Ethrow2(x: number, y: number, rotation: number, pointer:Phaser.Input.Pointer){
        this.play('poopE_projectile');
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
        this.rotation = Phaser.Math.Angle.Between(this.scene.enemy2.x, this.scene.enemy2.y, this.scene.player.x, this.scene.player.y,);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.play('poopE_projectile');

    }

}

class poop extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: PlayScene, x: number,y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        super(scene, x, y, 'poop_projectile');    
    }
    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);    

        if (this.scene.physics.collide(this, this.scene.enemy)){
            this.setVisible(false),
            this.active = false,
            this.scene.sound.play("splet2"),
            this.scene.enemy.destroy(),
            this.scene.enemy2.pause(),
            hitcount++,
            console.log("hitcount",hitcount);
        }

        if (this.scene.physics.collide(this, this.scene.enemy2)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2"),
            this.scene.enemy2.destroy();
            this.scene.enemy.pause2();
            hitcount2++,
            console.log("hitcount2",hitcount2);
            
        }
        
        if (this.scene.physics.collide(this, this.scene.blockslayer)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2");
        }
    }
    fling(x: number, y: number, rotation: number, pointer:Phaser.Input.Pointer){
    
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.play('poop_projectile');
        this.scene.physics.moveTo(this, this.scene.input.mousePointer.worldX, this.scene.input.mousePointer.worldY, 250);
        this.setRotation(rotation);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.setCollideWorldBounds(true);

    }

}

class poopgroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: PlayScene){
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 50,
            classType: poop,
            active: false,
            visible: false,
            key: "poop_projectile"
            

        })
        
    }

    poopthrow(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let poop = this.getFirstDead(false);
        if (poop) {
            poop.fling(x, y, rotation, blockslayer)
            poop.preUpdate(x, y, rotation)
        }
    }
}

class Epoopgroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: PlayScene){
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 50,
            classType: Epoop,
            active: false,
            visible: false,
            key: "poopE_projectile"
            

        })
        
    }

    poopEthrow(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let Epoop = this.getFirstDead(false);
        if (Epoop) {
            Epoop.Ethrow(x, y, rotation, blockslayer),
            Epoop.preUpdate(x, y, rotation)

        }
    }

    poopEthrow2(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let Epoop = this.getFirstDead(false);
        if (Epoop) {
            Epoop.Ethrow2(x, y, rotation, blockslayer),
            Epoop.preUpdate(x, y, rotation)

        }
    }

}

enum Direction {
    UP,
    DOWN,
    LEFT,
    LEFTDOWN,
    LEFTUP,
    RIGHT,
    RIGHTDOWN,
    RIGHTUP,
    FOLLOW
}

const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 7)
   
    while (newDirection === exclude){
        newDirection = Phaser.Math.Between(0, 7)
    }

    return newDirection
}

class enemys extends Phaser.Physics.Arcade.Sprite{

    private direction = Direction.RIGHT
    moveEvent: Phaser.Time.TimerEvent;
    enemythrow: Phaser.Time.TimerEvent;
    enemythrow2: Phaser.Time.TimerEvent;
    scan: Phaser.Time.TimerEvent;
    scan2: Phaser.Time.TimerEvent;

    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture)


        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE,this.handleTileCollision, this)




        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.direction = randomDirection(this.direction)
            },
            loop: true,
        })


        this.enemythrow = scene.time.addEvent({
            delay: 500,
            callback: ()=>{
                this.scene.Epoopgroup.poopEthrow(this.scene.enemy.x, this.scene.enemy.y, this.scene.enemy.rotation, this.scene.blockslayer),
                this.enemythrow.paused = true;
        
            },
            loop: true,
            paused: true,

        })

        this.enemythrow2 = scene.time.addEvent({
            delay: 500,
            callback: ()=>{
                this.scene.Epoopgroup.poopEthrow2(this.scene.enemy2.x, this.scene.enemy2.y, this.scene.enemy2.rotation, this.scene.blockslayer);
                this.enemythrow2.paused = true
            },
            loop: true,
            paused: true,

        })

        this.scan= scene.time.addEvent({
            callback: ()=>{
                if (this.scene.physics.overlap(this.scene.scan, this.scene.player)) {
                    this.enemythrow.paused = false,
                    this.direction = 8;
                }  
            },
            loop: true,
            paused: false,

        })

        this.scan2= scene.time.addEvent({
            callback: ()=>{
                if (this.scene.physics.overlap(this.scene.scan2, this.scene.player)) {
                    this.enemythrow2.paused = false,
                    this.direction = 8;
                }  
            },
            loop: true,
            paused: false,

        })


    }

    destroy(fromScene?:boolean){
        this.scan.paused = true,
        this.scan2.paused = true,
        this.moveEvent.destroy(),
        this.enemythrow.destroy(),
        this.enemythrow.paused = true,
        this.enemythrow2.destroy(),
        this.enemythrow2.paused = true,
        super.destroy(fromScene);
    }

    pause(){
        this.scan.paused = true;
    }

    pause2(){
        this.scan2.paused = true;
    }

    


    private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile){
        
        if (go !== this){
            return
        }

        this.direction = randomDirection(this.direction)

    }

    preUpdate(t: number, dt: number){

        super.preUpdate(t, dt)
        

        this.scene.physics.moveTo(this.scene.scan, this.scene.enemy.x - 110, this.scene.enemy.y - 110,200)
        this.scene.physics.moveTo(this.scene.scan2, this.scene.enemy2.x - 110, this.scene.enemy2.y - 110,200)

        let speed = 100        

        switch (this.direction){
            case Direction.UP:
                this.setVelocity(0, -speed)
                this.setAngle(-90)
                break
            
            case Direction.DOWN:
                this.setVelocity(0, speed)
                this.setAngle(90)
                break
            
            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                this.setAngle(180)
                break

            case Direction.LEFTDOWN:
                this.setVelocity(-speed, speed)
                this.setAngle(135)
                break
                
            case Direction.LEFTUP:
                this.setVelocity(-speed, -speed)
                this.setAngle(-135)
                break
            
            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                this.setAngle(0)
                break
            
            case Direction.RIGHTDOWN:
                this.setVelocity(speed, speed)
                this.setAngle(45)
                break
            
            case Direction.RIGHTUP:
                this.setVelocity(speed, -speed)
                this.setAngle(-45)
                break
            
            case Direction.FOLLOW:
                this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 100);
                this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y,)
                break
        }

    }


}

