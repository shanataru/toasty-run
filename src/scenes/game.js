import k from "../kaplayContext";
import { makeCharacter } from "../entities/character";
import { makeEnemy } from "../entities/enemy";
import {createWorld, moveWorld} from "../entities/world";
import { makeCollectible } from "../entities/collectible";


export default function game(){
    k.setGravity(3100);
    let gameSpeed = 300;
    let maxGameSpeed = 1500;

    createWorld();
    const playerCharacter = makeCharacter(k.vec2(200, 554));
    playerCharacter.setControls();
    playerCharacter.setEvents();

    playerCharacter.onCollide("enemy", (collidedObject) => {
        if(playerCharacter.isGrounded){
            k.play("sndHurt", {volume: 0.5});
            k.destroy(collidedObject);
            playerCharacter.opacity = 0.5;
            gameSpeed = 300;
            return;
        }
    });
    
    playerCharacter.onCollide("butter", (collidedObject) => {
            k.play("sndCollect", {volume: 0.5});
            k.destroy(collidedObject);
    });

    playerCharacter.onCollide("jam", (collidedObject) => {
            k.play("sndHealthUp", {volume: 1.0});
            k.destroy(collidedObject);
    });


    playerCharacter.onCollide("egg", (collidedObject) => {
            k.play("sndPowerUp", {volume: 0.5});
            k.destroy(collidedObject);
    });

    k.loop(1, () =>  {
        if(gameSpeed < maxGameSpeed){
            gameSpeed += Math.log1p(gameSpeed / 100) * 10;

            if(gameSpeed > maxGameSpeed){
                gameSpeed = maxGameSpeed;
            }
        }
    });

    const spawnEnemy = () => { //arrow function, doesn't create own scope (this), inherits this from parent
        const enemy = makeEnemy(k.vec2(1700, 575), 300, gameSpeed);
        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnEnemy); //recursive call for infinite enemies
    };
    spawnEnemy();

    const spawnCollectible = (type) => {
        const waitTime = makeCollectible(type, gameSpeed, 1700);
        k.wait(waitTime, () => spawnCollectible(type)); //recursive call for infinite spawn
    };
    spawnCollectible("butter");
    spawnCollectible("jam");
    spawnCollectible("egg");


    k.add([
        k.rect(1280, 100),
        k.pos(0, 600),
        k.area(),
        k.opacity(0),
        k.body({isStatic: true}),
    ]);

    
    k.onUpdate( () => {
        moveWorld(-100, -gameSpeed, playerCharacter.pos.y);
        k.drawLine({
            p1: k.vec2(0, 200),
            p2: k.vec2(500, 200),
            width: 4,
            color: k.rgb(0, 0, 255),
        })
    });
}