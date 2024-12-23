import k from "../kaplayContext";
import { makeCharacter, changeCharacterStatus } from "../entities/character";
import { makeEnemy } from "../entities/enemy";
import {createWorld, moveWorld} from "../entities/world";
import { makeCollectible } from "../entities/collectible";

const MAX_HEALTH = 5;
const BUFF_DURATION = 7.0;
const IFRAME_DURATION = 2.0;

export default function game(){
    const bgm = k.play("BgMusic", {volume: 0.05, loop: true});

    k.onButtonPress("end", () => k.go("gameover", bgm));


    k.setGravity(3100);
    let gameSpeed = 300;
    let maxGameSpeed = 1500;

    createWorld();

    let score = 0;
    let scoreMultiplier = 1;

    let playerHealth = MAX_HEALTH;
    let healthTextContent = "";

    const scoreText = k.add([
        k.text("POINTS: 0", {font: "game-font", size: 45},), 
        k.pos(20, 20),
        k.opacity(1.0),
    ]);

    const updateScore = (value, multipler) => {
        score += value * multipler;
        scoreText.text = `POINTS: ${score}`;
    }

    const healthText = k.add([
        k.text(healthTextContent, {font: "game-font", size: 45},), 
        k.pos(15, 75),
        k.color(220, 10, 50),
        k.opacity(1.0),
    ]);

    const updateHealthText = (value) =>{
        playerHealth += value;
        if (playerHealth > MAX_HEALTH){
            playerHealth = MAX_HEALTH;
        }
        if (playerHealth <= 0){
            k.play("sndGameOver", {volume: 0.1});
            k.setData("current-score", score);
            k.go("gameover", bgm);
        }
        healthTextContent = "";
        for(let i = 0; i < playerHealth; i++){
            healthTextContent += "♥"
        }
        healthText.text = healthTextContent;
    };
    updateHealthText(0);

    const playerCharacter = makeCharacter(k.vec2(200, 554));
    playerCharacter.setControls();
    playerCharacter.setEvents();

    let UITimer = null;
    const updateCollectUIText = (text, color) =>{
        playerCharacter.collectUI.text = text;
        playerCharacter.collectUI.color = color;
        if(UITimer !== null){
            UITimer.cancel();
        }
        UITimer = k.wait(1, () => (playerCharacter.collectUI.text = ""));
    };

    playerCharacter.onCollide("enemy", (collidedObject) => {
        if( playerCharacter.status === "normal" ){
            k.destroy(collidedObject);
            k.play("sndHurt", {volume: 0.5});
            changeCharacterStatus("iframe", IFRAME_DURATION);
            scoreMultiplier = 1;
            gameSpeed = 300;
            updateHealthText(-1);
            updateCollectUIText("!!", k.rgb(220, 10, 50));
            return;
        } else if ( playerCharacter.status === "buff"){
            k.destroy(collidedObject);
            k.play("sndPowerUp", {volume: 0.3});
            updateScore(10, scoreMultiplier);
            updateCollectUIText(`x${scoreMultiplier}`, playerCharacter.color);
            scoreMultiplier++;
            return;
        }
        else if ( playerCharacter.status === "iframe"){
            return;
        }
    });
    
    playerCharacter.onCollide("butter", (collidedObject) => {
            k.play("sndCollect", {volume: 0.1});
            k.destroy(collidedObject);
            updateScore(1, scoreMultiplier);
            if(scoreMultiplier > 1){
                updateCollectUIText(`+${1 * scoreMultiplier}`, playerCharacter.color);
            }
            else{
                updateCollectUIText("+1", k.rgb(255, 255, 0));
            }
    });

    playerCharacter.onCollide("jam", (collidedObject) => {
            k.play("sndHealthUp", {volume: 0.5});
            k.destroy(collidedObject);
            updateHealthText(1);
            updateCollectUIText("+♥", k.rgb(220, 10, 50));
    });

    let buffStatusEndTimer = null;
    playerCharacter.onCollide("rainbow_salt", (collidedObject) => {
        let currentGameSpeed = gameSpeed;
        k.destroy(collidedObject);
        k.play("sndPowerUp", {volume: 0.3});
        updateScore(15, 1);
        updateCollectUIText("+buff!", k.rgb(255, 180, 0));
        changeCharacterStatus("buff", BUFF_DURATION); //update status everytime a rainbow-salt is picked
        gameSpeed *= 3;
        if (buffStatusEndTimer !== null){
            buffStatusEndTimer.cancel();
        }
        buffStatusEndTimer = k.wait(BUFF_DURATION, () => {
            scoreMultiplier = 1; 
            gameSpeed = currentGameSpeed;
        })
    });

    //increase game speed every second, check on players health
    let isJamSpawning = false;
    k.loop(1, () =>  {
        if(gameSpeed < maxGameSpeed){
            gameSpeed += Math.log1p(gameSpeed / 100) * 10;

            if(gameSpeed > maxGameSpeed){
                gameSpeed = maxGameSpeed;
            }
        }

        const spawnJam = () => {
            if (playerHealth < MAX_HEALTH){
                const waitTime = makeCollectible("jam", gameSpeed, 1700);
                k.wait(waitTime, () => {
                    if(playerHealth < MAX_HEALTH){
                        spawnJam(); // keep spawning jam in interval
                    }
                    else{
                        isJamSpawning = false; //stop spawning
                    }
                });
            }
        }

        // Start spawning jams 10 seconds after first hit
        if (playerHealth < MAX_HEALTH && !isJamSpawning) {
            isJamSpawning = true;
            k.wait(10, () => spawnJam()); 
        }
    });

    const spawnEnemy = () => { //arrow function, doesn't create own scope (this), inherits this from parent
        const enemy = makeEnemy(k.vec2(1700, 575), 150, gameSpeed, playerCharacter);
        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnEnemy); //recursive call for infinite enemies
    };
    spawnEnemy();

    const spawnCollectible = (type) => {
        const waitTime = makeCollectible(type, gameSpeed, 1700);
        k.wait(waitTime, () => spawnCollectible(type)); //recursive call for infinite spawn
    };
    spawnCollectible("butter");

    k.wait(20, () => (spawnCollectible("rainbow_salt")));

    //table rectangle
    k.add([
        k.rect(1280, 100),
        k.pos(0, 600),
        k.area(),
        k.opacity(0),
        k.body({isStatic: true}),
    ]);
    
    k.onUpdate( () => {
        moveWorld(-100, -gameSpeed, playerCharacter.pos.y);
    });
}